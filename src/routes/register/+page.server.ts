import { createClient } from "@supabase/supabase-js";
import type { Action } from "./$types";
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { fail, redirect } from "@sveltejs/kit";

interface ReturnObject {
  success: boolean;
  errors: string[];
}

export const actions = {
  default: async ({ request }) => {
    // Going to do someting with given event
    // logga in på formen (gör den till method="POST") console.log(event);
    // ta sedan ut requst ur parametern
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("name") as string;

    const returnObject: ReturnObject = {
      success: true,
      errors: [],
    };

    if (name.length < 3) {
      returnObject.errors.push(
        "The name has to be at least of length 3 characters."
      );
    }

    if (!email.length) {
      returnObject.errors.push("Email is required.");
    }

    if (!password.length) {
      returnObject.errors.push("Password is required.");
    }

    if (password === passwordConfirmation) {
      returnObject.errors.push("Password do not match.");
    }

    if (returnObject.errors.length) {
      returnObject.success = false;
      return returnObject;
    }
    //registrera användare
    const supabase = createClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      console.log("det blev ett error", error);
      returnObject.success = true;
      return fail(400, returnObject as any);
    }
    redirect(303, "/private/dashboard");
  },
};
