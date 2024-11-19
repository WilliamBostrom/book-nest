<style>
  .book-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 360px;
    width: 360px;
    height: 300px;
    max-width: 450px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: white;
    text-decoration: none;
    text-align: left;
  }

  .book-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .book-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .book-info {
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
    padding: 60px 16px 0 16px;
    border-radius: 12px;
  }

  .book-info h4 {
    font-family: "EB Garamond", serif;
  }

  .book-info p {
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
  }

  .book-status {
    position: absolute;
    top: 16px;
    right: 0;
    padding: 4px 8px;
    width: auto;
    background-color: rgba(4, 59, 92, 0.7);
  }
</style>
