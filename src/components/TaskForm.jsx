/**
 * Vue - TaskForm.jsx
 * Composant affichant le formulaire d'ajout de tâche
 * Support des catégories (Travail, Maison, Divers)
 */

import { useState } from "react";
import PropTypes from "prop-types";

const CATEGORIES = [
  { value: "travail", label: "Travail", icon: "💼", color: "#ff6b6b" },
  { value: "maison", label: "Maison", icon: "🏠", color: "#4ecdc4" },
  { value: "divers", label: "Divers", icon: "⭐", color: "#95e377" },
];

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("divers");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!inputValue.trim()) {
      setError("Veuillez entrer une tâche");
      return;
    }

    const success = onAddTask(inputValue, selectedCategory);
    if (success) {
      setInputValue("");
      setSelectedCategory("divers");
    } else {
      setError("Erreur lors de l'ajout de la tâche");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="taskInput"
            placeholder="Ajouter une nouvelle tâche..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select">
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-add">
            Ajouter
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

TaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
