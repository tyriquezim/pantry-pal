import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import MealCard from "../components/MealCard"
import { database } from "../firebase";

function Home()
{
    const {user} = useAuth();
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pantry, setPantry] = useState([]);
    const [filterByPantry, setFilterByPantry] = useState(false);

    useEffect(() => {
        async function fetchPantry()
        {
            const ref = doc(database, "pantries", user.uid);
            const snap = await getDoc(ref);

            if(snap.exists())
            {
                setPantry(snap.data().ingredients);
            }
            fetchPantry();
        }
    }, [user]);

    function canBePrepared(meal) //checks if a meal has ingredients that are in the pantry
    {
        let canBePrepared = true;

        for(let i = 1; i <= 20; ++i)
        {
            const ingredient = meal["strIngredient" + i];

            if(!pantry.includes(ingredient.toLowerCase()))
            {
                canBePrepared = false;
            }
        }

        return canBePrepared;
    }

    async function handleSearch()
    {
        
        if(query.trim() !== "")
        {
            setLoading(true);
            setError("");
            setMeals([]);

            try
            {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + query);
                const data = await response.json();

                if(data.meals)
                {
                    const searchResults = filterByPantry ? data.meals.filter(canBePrepared) : data.meals;
                    
                    if(searchResults.length === 0 && filterByPantry)
                    {
                        setError("No meals found that match your pantry ingredients. Try a different search.")
                    }
                    else 
                    {
                        setMeals(searchResults)
                    }
                }
                else
                {
                    setError("No meals found. Try a different search.")
                }
            }
            catch(err)
            {
                setError("Something went wrong. Try again.");
            }
            finally
            {
                setLoading(false);
            }
        }
    }

    function handleKeyDown(e)
    {
        if(e.key === "Enter")
        {
            handleSearch();
        }
    }

    return <HomePage user={user} query={query} setQuery={setQuery} meals={meals} setMeals={setMeals} loading={loading} setLoading={setLoading} error={error} setError={setError} handleKeyDown={handleKeyDown} />
}

function HomePage(props)
{
    return (
        <div className="home-container">
            <h1>Welcome, {props.user.email}</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search for a meal..." value={props.query} onChange={(e) => props.setQuery(e.target.value)} onKeyDown={props.handleKeyDown}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            <label className="pantry-toggle">
                <input type="checkbox" checked={filterByPantry} onChange={(e) => setFilterByPantry(e.target.checked)}/>
                Only show meals I can make with my pantry
            </label>
            {pantry.length > 0 && (
        <p className="pantry-summary">
          Pantry: {pantry.join(", ")}
        </p>
      )}
            {props.loading && <p className="status">Searching...</p>}
            {props.error && <p className="error">{props.error}</p>}
            <div className="meal-grid">
                {props.meals.map((meal) => (<MealCard key={meal.idMeal} meal={meal}/>))}
            </div>
        </div>
    );
}

export default Home;