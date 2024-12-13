<script lang="ts">
  import BookCard from './BookCard.svelte';
  import type {Book} from '$lib/state/user-state.svelte';

interface BookCategoryProps {
  categoryName: string;
  booksToDisplay: Book[];
}

  let {categoryName, booksToDisplay}: BookCategoryProps = $props();
</script>


<div class="books-category mb-5">
<h3 class="mb-5">{categoryName}</h3>
<div class="books-container">
  {#each booksToDisplay as book}
    <BookCard {book}/>
  {/each}
</div>
</div>

<style>
  .books-container {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding-bottom: 8px;
    scrollbar-width: thin;
  }

  .books-container::webkit-scrollbar {
    height: 6px;
  }

  .books-container::webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
</style>
