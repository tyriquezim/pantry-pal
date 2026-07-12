import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MealDetail() 
{
  const {id} = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeal() 
    {
        try 
        {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
            console.log(response);
            const data = await response.json();

            if(data.meals) 
            {
                setMeal(data.meals[0]);
            } 
            else 
            {
                setError("Meal not found.");
            }
        } 
        catch (err) 
        {
            setError("Something went wrong. Please try again.");
        } 
        finally 
        {
            setLoading(false);
        }
    }
    fetchMeal();}, [id]);

  function getIngredients(meal) 
  {
    const ingredients = [];
    for (let i = 1; i <= 20; ++i) 
    {
        const ingredient = meal["strIngredient" + i].trim();
        let measure = meal["strMeasure" + i];

        if(!measure)
        {
            measure = "";
        }
        else 
        {
            measure = measure.trim();
        }
      
        if(ingredient && ingredient.trim() !== "") 
        {
            ingredients.push(measure + " "  + ingredient);
        }
    }
    return ingredients;
  }

  return <MealPage error={error} setError={setError} meal={meal} navigate={navigate} getIngredients={getIngredients} loading={loading}/>
}

function MealPage(props)
{
    return (
        <div className="detail-page-container">
            {props.loading && <p className="status">Loading meal...</p>}
            {props.error && <p className="error">{props.error}</p>}
            {props.meal && //Display the meal detail meal is not null
            (
                <div className="detail-container">
                    <button className="back-button" onClick={() => props.navigate(-1)}>Back</button>
                    <div className="detail-header">
                        <img src={props.meal.strMealThumb} alt={props.meal.strMeal} />
                        <div className="detail-header-info">
                            <h1>{props.meal.strMeal}</h1>
                            <p className="detail-meta">{props.meal.strCategory + " " + props.meal.strArea}</p>
                        </div>
                    </div>
                    <div className="detail-body">
                        <section>
                            <h2>Ingredients</h2>
                            <ul className="ingredient-list">{props.getIngredients(props.meal).map((item, index) => (<li key={index}>{item}</li>))}</ul>
                        </section>
                        <section>
                            <h2>Instructions</h2>
                            <div className="instructions">
                                {props.meal.strInstructions.split("\n").filter(line => line.trim() !== "").map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MealDetail;