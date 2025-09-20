import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling_global.css';
import "./SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [error, setError] = useState("");

  const updateIngredient = (i, value) => {
    const newIngredients = [...ingredients];
    newIngredients[i] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = ingredients.filter(Boolean).join(",");
    if (!query) {
      setError("Please enter at least one ingredient.");
      return;
    }
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  const handleSurprise = () => {
    navigate("/detail?surprise=true");
  };

  return (
    <main className="search-page" aria-labelledby="searchHeading">
      {/* dim overlay is done in CSS */}
      <section className="search-card" role="region" aria-label="Search by ingredients">
        <h1 id="searchHeading" className="visually-hidden">Home / search by ingredients</h1>

        <form className="search-form" onSubmit={handleSubmit} noValidate>
          <label className="visually-hidden" htmlFor="ing1">Ingredient 1</label>
          <input
            id="ing1"
            name="ingredient1"
            type="text"
            placeholder="Ingredient 1"
            value={ingredients[0]}
            onChange={(e) => updateIngredient(0, e.target.value)}
            autoComplete="off"
          />

          <label className="visually-hidden" htmlFor="ing2">Ingredient 2</label>
          <input
            id="ing2"
            name="ingredient2"
            type="text"
            placeholder="Ingredient 2"
            value={ingredients[1]}
            onChange={(e) => updateIngredient(1, e.target.value)}
            autoComplete="off"
          />

          <label className="visually-hidden" htmlFor="ing3">Ingredient 3</label>
          <input
            id="ing3"
            name="ingredient3"
            type="text"
            placeholder="Ingredient 3"
            value={ingredients[2]}
            onChange={(e) => updateIngredient(2, e.target.value)}
            autoComplete="off"
          />

          {error && (
            <p className="form-error" role="alert" aria-live="polite">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary">Search Recipes</button>
          <button type="button" className="btn btn-secondary" onClick={handleSurprise}>
            Surprise me!
          </button>

          <button type="button" className="btn-back" onClick={() => navigate(-1)}>
            &lt; Back
          </button>
        </form>
      </section>
    </main>
  );
}
