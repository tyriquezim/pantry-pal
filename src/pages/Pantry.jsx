import {useState, useEffect} from "react";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {database} from "../firebase";
import {useAuth} from "../context/AuthContext";

function Pantry()
{
    const {user} = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPantry()
        {
            const ref = doc(database, "pantries", user.uid);
            const snap = await getDoc(ref);

            if(snap.exists()) //if they have a pantry already
            {
                setIngredients(snap.data().ingredients);
            }
            setLoading(false);
        }
        fetchPantry();
    }, [user]);

    async function savePantry(updated) //Updates the doc with the new pantry
    {
        const ref = doc(database, "pantries", user.uid); //retrieve user's pantry
        await setDoc(ref, {ingredients: updated});
    }

    function handleAdd()
    {
        const trimmed = input.trim().toLowerCase(); //the user's entered ingredient

        if(trimmed && !ingredients.includes(trimmed)) //if the input is not empty and is not in the pantry
        {
            const updated = [...ingredients, trimmed];
            setIngredients(updated);
            savePantry(updated);
            setInput("");
        }
    }

    function handleRemove(ingredient)
    {
        const updated = ingredients.filter((i) => i !== ingredient); //return a list of items that are not equal to the passed ingredient
        setIngredients(updated);
        savePantry(updated);
    }

    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            handleAdd();
        }
    }

    return <PantryPage input={input} setInput={setInput} ingredients={ingredients} loading={loading} handleAdd={handleAdd} handleRemove={handleRemove} handleKeyDown={handleKeyDown}/>
}

function PantryPage(props)
{
    return (
        <div className="home-container">
            {props.loading && <p className="status">Loading pantry...</p>}
            <h1>My Pantry</h1>
            <p className="pantry-subtitle">Add ingredients you have available. Meal searches will only show meals you can make.</p>
            <div className="search-bar">
                <input type="text" placeholder="Add an ingredient..." value={props.input} onChange={(e) => props.setInput(e.target.value)} onKeyDown={props.handleKeyDown}/>
                <button onClick={props.handleAdd}>Add</button>
            </div>
            {props.ingredients.length === 0 ? (<p className="status">No ingredients yet. Add some above.</p>) : (
            <div className="pantry-list">
                {props.ingredients.map((ingredient) => (
                <div key={ingredient} className="pantry-item">
                    <span>{ingredient}</span>
                    <button onClick={() => props.handleRemove(ingredient)}>x</button>
                </div>))}
            </div>)}
        </div>
  );
}

export default Pantry;