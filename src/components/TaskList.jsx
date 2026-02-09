/**
 * Vue - TaskList.jsx
 * Composant affichant la liste des tâches groupées par catégories
 * Chaque catégorie a sa propre section avec couleur correspondante
 */

import PropTypes from "prop-types";
import { TaskRendererFactory } from "../models/TaskRenderer";
import "./TaskList.css";

const CATEGORIES = ["travail", "maison", "divers"];

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  const getCategoryInfo = (category) => {
    const renderer = TaskRendererFactory.createRenderer(category);
    const renderProps = renderer.render();
    return {
      icon: renderer.getIcon(),
      color: renderer.getColor(),
      label: renderProps.label,
      cssClass: renderer.getCSSClass(),
    };
  };

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  const renderTaskItem = (task, categoryInfo) => {
    return (
      <li
        key={task.id}
        className={`task-item ${task.completed ? "completed" : ""} ${categoryInfo.cssClass}`}
        style={{
          borderLeftColor: categoryInfo.color,
        }}>
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="task-checkbox"
          />
          <span className="task-title">{task.title}</span>
        </div>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="btn-delete"
          title="Supprimer la tâche">
          ✕
        </button>
      </li>
    );
  };

  const renderCategorySection = (category) => {
    const categoryTasks = getTasksByCategory(category);
    const categoryInfo = getCategoryInfo(category);

    return (
      <div key={category} className="category-section">
        <div
          className="category-header"
          style={{
            backgroundColor: categoryInfo.color,
          }}>
          <span className="category-icon">{categoryInfo.icon}</span>
          <h3 className="category-title">{categoryInfo.label}</h3>
          <span className="task-count">({categoryTasks.length})</span>
        </div>

        {categoryTasks.length === 0 ? (
          <p className="category-empty">Aucune tâche dans cette catégorie</p>
        ) : (
          <ul className="category-task-list">
            {categoryTasks.map((task) => renderTaskItem(task, categoryInfo))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="tasks-section">
      <h2>Tâches par catégorie</h2>
      {tasks.length === 0 ? (
        <p className="empty-message">Aucune tâche. Ajoutez-en une!</p>
      ) : (
        <div className="categories-container">
          {CATEGORIES.map((category) => renderCategorySection(category))}
        </div>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
};

export default TaskList;
