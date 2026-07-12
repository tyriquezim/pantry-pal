import { useState } from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";

function App() 
{
  const {user} = useAuth();
  return <AppRoutes user={user}/>
}

function AppRoutes(props)
{
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={props.user ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={props.user ? <Navigate to="/"/> : <Register />} />
        <Route path="/" element={
          <ProtectedRoute> 
            <Home /> 
          </ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;