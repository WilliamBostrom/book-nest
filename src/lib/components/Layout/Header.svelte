<script lang="ts">
  import Logo from "$assets/app-logo.svg"
</script>

<header>
  <a href="/">
    <img src={Logo} alt="" class="logo">
  </a>

</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 4vw;
  }
  ul {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }

  .logo {
    height: 72px;
  }
</style>
