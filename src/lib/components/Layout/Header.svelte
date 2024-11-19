<script lang="ts">
  import Logo from "$assets/app-logo.svg"
  import {Button} from '$components';
</script>

<header>
  <a href="/">
    <img src={Logo} alt="Go to home" class="logo">
  </a>
  <nav>
    <ul>
      <li>
        <Button href="/register" isMenu={true}>Create account</Button>
      </li>
      <li>
        <Button href="/login" isSecondary={true} isMenu={true}>Login</Button>
      </li>
    </ul>
  </nav>
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
