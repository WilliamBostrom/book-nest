<script lang="ts">
  import { covertFileToBase64 } from '$lib/types/openai-helpers';
  import Icon from '@iconify/svelte';
  import Dropzone from 'svelte-file-dropzone';

  let isLoading = $state(false)

  interface OpenAiBook {
    author: string;
    bookTitle: string;
  }

  async function handleDrop(e: CustomEvent<any>){
    const {acceptedFiles} = e.detail;
    if(acceptedFiles.length) {
      isLoading = true;
      const fileToSendToOpenAi = acceptedFiles[0];
      const base64string = await covertFileToBase64(fileToSendToOpenAi);
      try {
      const response = await fetch("/api/scan-shelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: base64string,
        }),
      });
      const result = (await response.json()) as {bookArray: OpenAiBook[]}; 
      console.log(result);
      
   }
      catch (error) {
        console.error(error);
      }
      finally {
        isLoading = false;
      }
    }

  }
</script>

<h2 class="mt-m mb-l">Take a picture to add books</h2>
<div class="upload-area">
  <div class="upload-container">
    <Dropzone on:drop={handleDrop}
     multiple={false}
     accept="image/*"
     maxSize={10 * 1024 * 1024}
     containerClasses={"dropzone-books"}
     >    
     <Icon icon="bi:camera-fill" width={"40px"}/>
     <p>Drag and drop a picture here to select a file</p></Dropzone>
    
  
  </div>
</div>

<style>
  .book-list {
    width: 800px;
    background-color: white;
    border-radius: 8px;
    border-collapse: collapse;
  }

  .book-list th {
    font-size: 22px;
    text-align: left;
    padding: 8px 16px;
    border-bottom: 3px solid black;
  }

  .book-list td {
    padding: 12px 16px;
    border-bottom: 1px solid rgb(205, 205, 205);
    font-size: 22px;
  }

  .book-list tr:last-child td {
    border-bottom: none;
  }
  :global(.remove-book svg) {
    color: red;
  }

  .upload-error {
    color: rgb(131, 0, 0);
  }

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .upload-container {
    width: 600px;
  }

  .spinner-container {
    display: flex;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: black;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-block;
    margin-right: 8px;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :global(.dropzone-books) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 600px !important;
    min-height: 400px !important;
    flex: 0 !important;
    cursor: pointer;
  }
</style>
