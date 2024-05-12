import { Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  return (
    <nav className={"navigation"}>
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
      <Link to="logout">Logout</Link>
    </nav>
  );
};
