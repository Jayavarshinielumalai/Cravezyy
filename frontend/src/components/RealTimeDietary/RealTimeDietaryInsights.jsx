import React, { useContext, useEffect, useState } from 'react';
import './RealTimeDietaryInsights.css';
import { StoreContext } from '../../context/StoreContext';
import { FaFireAlt, FaDrumstickBite, FaBreadSlice, FaBacon } from 'react-icons/fa';

const RealTimeDietaryInsights = () => {
  const { food_list, cartItems } = useContext(StoreContext);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  // Recommended daily intake values
  const recommendedCalories = 2000;
  const recommendedProtein = 50;
  const recommendedCarbs = 275;
  const recommendedFats = 70;

  useEffect(() => {
    const calculateNutrition = () => {
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      // Ensure cartItems is an object and food_list is an array
      Object.keys(cartItems).forEach((itemId) => {
        const foodItem = food_list.find((food) => food._id === itemId);
        if (foodItem) {
          totalCalories += foodItem.calories * cartItems[itemId];
          totalProtein += foodItem.protein * cartItems[itemId];
          totalCarbs += foodItem.carbs * cartItems[itemId];
          totalFats += foodItem.fats * cartItems[itemId];
        }
      });

      // Update state with calculated values
      setCalories(totalCalories || 0);
      setProtein(totalProtein || 0);
      setCarbs(totalCarbs || 0);
      setFats(totalFats || 0);
    };

    // Recalculate whenever cartItems or food_list changes
    calculateNutrition();
  }, [cartItems, food_list]);

  // Function to calculate progress percentage (with max limit of 100%)
  const getProgress = (consumed, recommended) => {
    return Math.min((consumed / recommended) * 100, 100);
  };

  // Calculating remaining amounts needed to meet goals
  const remainingCalories = Math.max(recommendedCalories - calories, 0);
  const remainingProtein = Math.max(recommendedProtein - protein, 0);
  const remainingCarbs = Math.max(recommendedCarbs - carbs, 0);
  const remainingFats = Math.max(recommendedFats - fats, 0);

  return (
    <div className="dietary-insights">
      <h2>Real-Time Dietary Insights</h2>
      <div className="insights">
        {/* Calories */}
        <div className="insight-item">
          <FaFireAlt className="icon" />
          <h3>Calories</h3>
          <p>{calories} kcal</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${getProgress(calories, recommendedCalories)}%` }}></div>
          </div>
          <p className="goal">Goal: {recommendedCalories} kcal</p>
          <p className="remaining">Remaining: {remainingCalories} kcal</p>
        </div>

        {/* Protein */}
        <div className="insight-item">
          <FaDrumstickBite className="icon" />
          <h3>Protein</h3>
          <p>{protein} g</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${getProgress(protein, recommendedProtein)}%` }}></div>
          </div>
          <p className="goal">Goal: {recommendedProtein} g</p>
          <p className="remaining">Remaining: {remainingProtein} g</p>
        </div>

        {/* Carbohydrates */}
        <div className="insight-item">
          <FaBreadSlice className="icon" />
          <h3>Carbohydrates</h3>
          <p>{carbs} g</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${getProgress(carbs, recommendedCarbs)}%` }}></div>
          </div>
          <p className="goal">Goal: {recommendedCarbs} g</p>
          <p className="remaining">Remaining: {remainingCarbs} g</p>
        </div>

        {/* Fats */}
        <div className="insight-item">
          <FaBacon className="icon" />
          <h3>Fats</h3>
          <p>{fats} g</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${getProgress(fats, recommendedFats)}%` }}></div>
          </div>
          <p className="goal">Goal: {recommendedFats} g</p>
          <p className="remaining">Remaining: {remainingFats} g</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDietaryInsights;
