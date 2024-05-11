import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="dark-background">
      <nav className={"navigation"}>
        <Link to="/">Public Page</Link>
        <Link to="login">Login</Link>
        <Link to="protected">Protected</Link>
      </nav>
      <div className="container">
        <div>
          <h1>Auth Example using RouterProvider</h1>

          <p>
            This example demonstrates a simple login flow with three pages: a
            public page, a protected page, and a login page. In order to see the
            protected page, you must first login. Pretty standard stuff.
          </p>

          <p>
            First, visit the public page. Then, visit the protected page. You're
            not yet logged in, so you are redirected to the login page. After
            you login, you are redirected back to the protected page.
          </p>

          <p>
            Notice the URL change each time. If you click the back button at
            this point, would you expect to go back to the login page? No!
            You're already logged in. Try it out, and you'll see you go back to
            the page you visited just *before* logging in, the public page.
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
