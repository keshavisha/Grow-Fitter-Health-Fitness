import React from 'react';
import './MealDisplay.css'; 

const MealDisplay = ({mealData}) => {
  const { meals, nutrients } = mealData;
  if (!meals) return null;
  return (
    <div className="card">
      <div className="meals">
        {meals.map((meal, index) => (
             <div key={meal.id} className="left-section">
          <div  className="meal-item">
            {(index===0&&<h3>Breakfast:</h3>)}
            {(index===1&&<h3>Lunch:</h3>)}
            {(index===2&&<h3>Dinner:</h3>)}

            <h4>Title:{meal.title}</h4>
            
            <p>readyIn:{meal.readyInMinutes}</p>
            <p>servings:{meal.servings}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="nutrients">
        <h4>Nutrients</h4>
        <p>Calories: {nutrients.calories}</p>
        <p>Protein: {nutrients.protein}</p>
        <p>Carbs: {nutrients.carbohydrates}</p>
        <p>Fat: {nutrients.fat}</p>
      </div>
    </div>
  );
};

export default MealDisplay;
