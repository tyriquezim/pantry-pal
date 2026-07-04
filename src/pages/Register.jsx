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

    return <RegisterPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} handleRegister={handleRegister} />
}

function RegisterPage(props)
{
    return (
    <div className="auth-container">
        <h2>Create an account</h2>
        {props.error && <p className="error">{props.error}</p>}
        <input type="email" placeholder="Email" value={props.email} onChange={(e) => props.setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={props.password} onChange={(e) => props.setPassword(e.target.value)}/>
        <button onClick={props.handleRegister}>Register</button>
        <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
    );
}

export default Register;