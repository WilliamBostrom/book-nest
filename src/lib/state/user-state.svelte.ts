import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

export interface Book {
  author: string | null;
  cover_image: string | null;
  created_at: string;
  description: string | null;
  finished_reading_on: string | null;
  genre: string | null;
  id: number;
  rating: number | null;
  started_reading_on: string | null;
  title: string;
  user_id: string;
}

export interface OpenAiBook {
  author: string;
  bookTitle: string;
}

type updatableBookFields = Omit<Book, "id" | "user_id" | "created_at">;

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);
  allBooks = $state<Book[]>([]);
  userName = $state<string | null>(null);

  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
    this.fetchUserData();
  }

  async fetchUserData() {
    if (!this.user || !this.supabase) {
      return;
    }

    const userId = this.user.id;

    const [booksResponse, userNamesResponse] = await Promise.all([
      this.supabase.from("books").select("*").eq("user_id", userId),
      this.supabase
        .from("user_names")
        .select("name")
        .eq("user_id", userId)
        .single(),
    ]);

    if (
      booksResponse.error ||
      !booksResponse.data ||
      userNamesResponse.error ||
      !userNamesResponse.data
    ) {
      console.log("Error fetching data for user");
      console.log({
        booksError: booksResponse.error,
        userNamesError: userNamesResponse.error,
      });
      return;
    }

    this.allBooks = booksResponse.data;
    this.userName = userNamesResponse.data.name;
  }

  getHighestRatedBooks() {
    if (this.allBooks.length === 0) {
      return [];
    }
    return this.allBooks
      .filter((book) => book.rating !== null)
      .toSorted((a, z) => z.rating! - a.rating!)
      .slice(0, 9);
  }

  getUnreadBooks() {
    return this.allBooks
      .filter((book) => !book.started_reading_on && !book.finished_reading_on)
      .toSorted(
        (a, z) =>
          new Date(a.created_at).getTime() - new Date(z.created_at).getTime()
      )
      .slice(0, 9);
  }

  getFavoriteGenreBooks() {
    if (this.allBooks.length === 0) {
      return [];
    }
    return this.allBooks.filter((book) => book.genre === "Fantasy").slice(0, 9);
  }

  getFavoriteGenre() {
    if (this.allBooks.length === 0) {
      return "";
    }
    const genreCounts: { [key: string]: number } = {};

    this.allBooks.forEach((book) => {
      const genres = book.genre ? book.genre.split(",") : [];
      genres.forEach((genre) => {
        const trimmedGenre = genre.trim();
        if (trimmedGenre) {
          if (!genreCounts[trimmedGenre]) {
            genreCounts[trimmedGenre] = 1;
          } else {
            genreCounts[trimmedGenre]++;
          }
        }
      });
    });
    const mostCommonGenre = Object.keys(genreCounts).reduce((a, z) => {
      return genreCounts[a] > genreCounts[z] ? a : z;
    });
    return mostCommonGenre || null;
  }

  getBookById(bookId: number) {
    return this.allBooks.find((book) => book.id === bookId);
  }

  async updateBook(bookId: number, updateObject: Partial<updatableBookFields>) {
    if (!this.supabase) {
      return;
    }
    const { status, error } = await this.supabase
      .from("books")
      .update(updateObject)
      .eq("id", bookId);

    if (status === 204 && !error) {
      this.allBooks = this.allBooks.map((book) => {
        if (book.id === bookId) {
          return { ...book, ...updateObject };
        } else {
          return book;
        }
      });
    }
  }

  async uploadBookCover(bookId: number, file: File) {
    if (!this.user || !this.supabase) {
      return;
    }

    const filePath = `${this.user.id}/${new Date().getTime()}_${bookId}`;
    const { error } = await this.supabase.storage
      .from("book-covers")
      .upload(filePath, file);

    if (error) {
      console.log("Error uploading book cover", error);
      return;
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from("book-covers").getPublicUrl(filePath);

    await this.updateBook(bookId, { cover_image: publicUrl });
  }

  async deleteBookFromLibrary(bookId: number) {
    if (!this.supabase) {
      return;
    }

    const { error, status } = await this.supabase
      .from("books")
      .delete()
      .eq("id", bookId);

    if (status === 204 && !error) {
      this.allBooks = this.allBooks.filter((book) => book.id !== bookId);
    }

    goto("/private/dashboard");
  }

  async addBookToLibrary(bookToAdd: OpenAiBook[]) {
    if (!this.user || !this.supabase) {
      return;
    }

    const userId = this.user.id;

    const proccessedBooks = bookToAdd.map((book) => ({
      title: book.bookTitle,
      author: book.author,
      user_id: userId,
    }));

    const { error } = await this.supabase.from("books").insert(proccessedBooks);
    if (error) {
      throw new Error("Error adding book to library");
    } else {
      await this.fetchUserData();
      // const { data } = await this.supabase
      //   .from("books")
      //   .select("*")
      //   .eq("user_id", userId);

      // if (!data) {
      //   throw new Error("Error fetching books after adding book");
      // }

      // this.allBooks = data;
    }
  }

  async logout() {
    await this.supabase?.auth.signOut();
    goto("/login");
  }
}

const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
  return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
  return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
