import {useState, useEffect} from "react";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {database} from "../firebase";
import {useAuth} from "../context/AuthContext";