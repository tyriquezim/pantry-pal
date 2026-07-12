import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import MealCard from "../components/MealCard"

function Home()
{
    const {user} = useAuth();
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    setMeals(data.meals);
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
            </div>
            {props.loading && <p className="status">Searching...</p>}
            {props.error && <p className="error">{props.error}</p>}
            <div className="meal-grid">
                {props.meals.map((meal) => (<MealCard key={meal.idMeal} meal={meal}/>))}
            </div>
        </div>
    );
}

export default Home;