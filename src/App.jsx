import { useState } from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
import Pantry from "./pages/Pantry";
import MealDetail from "./pages/MealDetail";

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
        <Route path="/pantry" element={
            <ProtectedRoute>
                <Pantry />
            </ProtectedRoute>
        }/>
        <Route path="/meal/:id" element={
          <ProtectedRoute>
            <MealDetail/>
          </ProtectedRoute>
        }/>
        <Route path="/" element={
          <ProtectedRoute> 
            <Home /> 
          </ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;