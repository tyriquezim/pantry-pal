import { useNavigate } from "react-router";

function MealCard({meal})
{
    const navigate = useNavigate();

    return (
        <div className="meal-card" onClick={() => navigate("/meal/" + meal.idMeal)}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="meal-card-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
            </div>
        </div>
    );
}

export default MealCard;