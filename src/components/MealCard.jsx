function MealCard({meal})
{
    return (
        <div className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="meal-card-info">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
            </div>
        </div>
    );
}

export default MealCard;