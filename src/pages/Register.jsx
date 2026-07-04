import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Register()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister()
    {
        setError("");

        try
        {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account Created!");
        }
        catch(err)
        {
            setError(err.message);
        }
    }

    return RegisterPage(email, setEmail, password, setPassword, error, handleRegister);
}

function RegisterPage(email, setEmail, password, setPassword, error, handleRegister)
{
    return (
    <div className="auth-container">
        <h2>Create an account</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleRegister}>Register</button>
        <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
    );
}

export default Register;