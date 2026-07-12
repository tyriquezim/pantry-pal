import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useAuth} from "../context/AuthContext";

function NavBar()
{
    const {user} = useAuth();

    async function handleLogout()
    {
        try 
        {
            await signOut(auth);
        }
        catch(err)
        {
            console.error("Failed to Log out:", err);
        }
    }

    return (
        <nav className="navbar">
            <span className="navbar-brand">PantryPal</span>
            {user && (
                <div className="navbar-right">
                    <a href="/" className="navbar-link">Search</a>
                    <a href="/pantry" className="navbar-link">My Pantry</a>
                    <span className="navbar-email">{user.email}</span>
                    <button onClick={handleLogout}>Log Out</button>
                </div>)}
        </nav>
    );
}

export default NavBar;