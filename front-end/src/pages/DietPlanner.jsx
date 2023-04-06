import { useState,useEffect } from 'react';
import '../pages/DietPlanner.css'
import Navbar from '../components/auth-reg/Navbar';
import axios from "axios"
import MealDisplay from '../components/MealDisplay';
const DietPlanner = () => {
    let dataf=null;
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedActivityLevels, setSelectedActivityLevels] = useState([]);
  const [goal, setGoal] = useState('lose weight');
  const [mealPlan, setMealPlan] = useState({});
  const [gender, setGender] = useState('');
  const [diet, setDiet] = useState('');
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
 
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    if (selectedGender === gender) {
      setGender('');
    } else {
      setGender(selectedGender);
    }
  };

  const handleDietChange = (event) => {
    const selectedDiet = event.target.value;
    if (selectedDiet === diet) {
      setDiet('');
    } else {
      setDiet(selectedDiet);
    }
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleButtonToggle = (event) => {
    const { value } = event.target;
    setSelectedActivityLevels([value]);

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const bmr = calculateBMR(age, height, weight, selectedActivityLevels, goal);
    setMealPlan("Hello");
    console.log(age, height, weight, selectedActivityLevels, goal)
    let d;
    if(goal==='lose weight'){
        d=bmr-500;
    }
    if(goal==='gain weight'){
        d=bmr+500;
    }
    if(goal==='maintain weight'){
        d=bmr;
    }
    const datatoSend = { targetCalories:bmr,diet:diet };
   await axios.post('http://localhost:9012/api/diet-planner',datatoSend) .then(response => {
        dataf = JSON.parse(JSON.stringify(response.data));
        if(dataf&&dataf.data){
            console.log(dataf)
        setMealPlan(dataf.data)
        }
      })
      .catch(error => console.log(error));

  };

  const calculateBMR = (age, height, weight, activityLevels, gender) => {
    let BMR;
  
    if (gender === 'male' || gender === 'others') {
      BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    let activityFactor;
    if (activityLevels.includes('sedentary')) {
      activityFactor = 1.2;
    } else if (activityLevels.includes('lightly active')) {
      activityFactor = 1.375;
    } else if (activityLevels.includes('moderately active')) {
      activityFactor = 1.55;
    } else if (activityLevels.includes('very active')) {
      activityFactor = 1.725;
    } else {
      activityFactor = 1.2;
    }
    return BMR * activityFactor;
  };
  


  return (
    <div className='diet-planner-root'>
        <Navbar textColor="#FFFFE0" />
    <div className="diet-planner">
  
      <form  className="form-section" onSubmit={handleFormSubmit}>
      <p className="heading">Please provide the following info....</p>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={handleAgeChange} required />

        <label htmlFor="height">Height (cm):</label>
        <input type="number" id="height" value={height} onChange={handleHeightChange} required />

        <label htmlFor="weight">Weight (kg):</label>
        <input type="number" id="weight" value={weight} onChange={handleWeightChange} required />
        <div className="gender-buttons form-section">
        <label htmlFor="gender">Gender:</label>
        <div className="gender">
          <button
            className={gender === 'male' ? 'active' : ''}
            onClick={handleGenderChange}
            value="male"
            type="button"
          >
            Male
          </button>
          <button
            className={gender === 'female' ? 'active' : ''}
            onClick={handleGenderChange}
            value="female"
            type="button"
          >
            Female
          </button>
          <button
            className={gender === 'others' ? 'active' : ''}
            onClick={handleGenderChange}
            value="others"
            type="button"
          >
            Others
          </button>
        </div>
        <div className="diet-buttons form-section">
        <label htmlFor="diet">Diet:</label>
        <div className="diet">
          <button
            className={diet === 'Vegetarian' ? 'active' : ''}
            onClick={handleDietChange}
            value="Vegetarian"
            type="button"
          >
            Veg
          </button>
          <button
            className={diet === 'Whole30' ? 'active' : ''}
            onClick={handleDietChange}
            value="Whole30"
            type="button"
          >
            Non-Veg
          </button>
        </div>
        </div>
      </div>
        <div className="activity-level-buttons form-section">
          <label htmlFor="activity-level">Activity Level:</label>
          <div id="activity-level">
            <button
              className={selectedActivityLevels.includes('sedentary') ? 'active' : ''}
              onClick={handleButtonToggle}
              value="sedentary"
              type="button"
            >
              Sedentary
            </button>
            <button
              className={selectedActivityLevels.includes('lightly active') ? 'active' : ''}
              onClick={handleButtonToggle}
              value="lightly active"
              type="button"
            >
              Lightly Active
            </button>
            <button
              className={selectedActivityLevels.includes('moderately active') ? 'active' : ''}
              onClick={handleButtonToggle}
              value="moderately active"
              type="button"
            >
              Moderately Active
            </button>
            <button
              className={
                selectedActivityLevels.includes('very active') ? 'active' : ''}
                onClick={handleButtonToggle}
                value="very active"
                type='button'
                >
                Very Active
                </button>
                </div>
                </div>
                
              
                    <div className="goal-buttons form-section">
                      <label htmlFor="goal">Goal:</label>
                      <div id="goal">
                        <button
                          className={goal === 'lose weight' ? 'active' : ''}
                          onClick={handleGoalChange}
                          value="lose weight"
                          type="button"
                        >
                          Lose Weight
                        </button>
                        <button
                          className={goal === 'gain weight' ? 'active' : ''}
                          onClick={handleGoalChange}
                          value="gain weight"
                          type="button"
                        >
                          Gain Weight
                        </button>
                        <button
                          className={goal === 'maintain weight' ? 'active' : ''}
                          onClick={handleGoalChange}
                          value="maintain weight"
                          type="button"
                        >
                          Maintain Weight
                        </button>
                      </div>
                    </div>
                
                    <button  className="generate-meal-plan-button" type="submit">Generate Meal Plan</button>
                  </form>
                
                  <div className="meal-plan-section">
                    {mealPlan && (
                      <MealDisplay mealData={mealPlan} />
                    )}
                  </div>
                </div>
                </div>
                
                );
                };
                
                export default DietPlanner;
                
                
                
                
                