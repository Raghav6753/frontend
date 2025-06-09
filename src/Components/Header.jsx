<nav>
  <a href="#" className="desktop-only">Home</a>
  <a href="#features" className="desktop-only">Features</a>
  <a href="#about" className="desktop-only">About</a>
  <Link to={name ? "/" : "/login"} className="login-only">
    {name ? name : "Login"}
  </Link>
</nav>
