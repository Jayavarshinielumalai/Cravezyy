import React, { useContext, useState } from 'react';
import './MealPlanner.css';
import { StoreContext } from '../../context/StoreContext';
import { mealImages } from '../../assets/assets';

const MealPlanner = () => {
    const { food_list, addToCart } = useContext(StoreContext);
    const [plannedMeals, setPlannedMeals] = useState({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    });
  
    const MAX_MEALS_PER_DAY = 3;
  
    const addMeal = (day, mealId) => {
      if (mealId && plannedMeals[day].length < MAX_MEALS_PER_DAY) {
        setPlannedMeals((prev) => ({
          ...prev,
          [day]: [...prev[day], mealId]
        }));
      }
    };
  
    const removeMeal = (day, mealId) => {
      setPlannedMeals((prev) => ({
        ...prev,
        [day]: prev[day].filter((id) => id !== mealId)
      }));
    };
  
    const clearAllMeals = () => {
      setPlannedMeals({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      });
    };
  
    return (
      <div className='meal-planner'>
        <h2>Meal Planner</h2>
        <button className='clear-button' onClick={clearAllMeals}>Clear All Meals</button>
        <div className='days-container'>
          {Object.keys(plannedMeals).map((day) => (
            <div key={day} className='day-section'>
              <h3>{day}</h3>
              <div className='meal-list'>
                {plannedMeals[day].map((mealId, idx) => {
                  const meal = food_list.find((item) => item._id === mealId);
                  const mealImage = meal ? mealImages[meal.name] : null; // Get image based on meal name
  
                  return (
                    <div key={idx} className='meal-item'>
                      {mealImage && <img src={mealImage} alt={meal.name} className='meal-image' />}
                      <p>{meal?.name}</p>
                      <button className='remove-button' onClick={() => removeMeal(day, mealId)}>Remove</button>
                    </div>
                  );
                })}
              </div>
              <select onChange={(e) => addMeal(day, e.target.value)}>
                <option value="">Select a meal</option>
                {food_list.map((meal) => (
                  <option key={meal._id} value={meal._id}>
                    {meal.name}
                  </option>
                ))}
              </select>
              <button onClick={() => plannedMeals[day].forEach((mealId) => addToCart(mealId))}>
                Add Meals to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MealPlanner;
  