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

    return <LoginPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleLogin={handleLogin} />
}

function LoginPage(props)
{
    return (
        <div className="auth-container">
            <h2>Log in</h2>
            {props.error && <p className="error">{props.error}</p>}
            <input type="email" placeholder="Email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
            <button onClick={props.handleLogin}>Log in</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;