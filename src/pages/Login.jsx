import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin()
    {
        setError("")
        try
        {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in!");
        }
        catch(err)
        {
            setError(err.message);
        }
    }

    return LoginPage(email, setEmail, password, setPassword, error, handleLogin);
}

function LoginPage(email, setEmail, password, setPassword, error, handleLogin)
{
    return (
        <div className="auth-container">
            <h2>Log in</h2>
            {error && <p className="error">{error}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Log in</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;