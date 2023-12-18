"use client";
import React, { useState } from "react";

const RecipeApp = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const APP_ID = "cc77163b";
  const APP_KEY = "b019302342bc8377fc6f32c36ef5c491";

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const getRecipes = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }

      const data = await response.json();
      setRecipes(data.hits);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      setRecipes([]);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <form onSubmit={getRecipes}>
        <input
          type="text"
          placeholder="Enter a food item..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.recipe.label}</h2>
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              className="recipe-image"
            />
            <ul>
              {recipe.recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeApp;
