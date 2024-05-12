import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";

export const Navigation: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className={"navigation"}>
      <Link to="/">Home</Link>
      {user && (
        <>
          <Link to="/logout">Logout</Link>
        </>
      )}
    </nav>
  );
};
