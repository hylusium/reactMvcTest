/**
 * Contrôleur - useTaskController.js (Hook personnalisé)
 * Gère les interactions entre le modèle et la vue
 * Utilise le pattern Singleton
 */

import { useState, useEffect } from "react";
import { TaskList } from "../models/TaskModel";

// Obtenir l'instance unique du singleton
const taskListModel = TaskList.getInstance();

export function useTaskController() {
  const [tasks, setTasks] = useState([]);

  // Charger les tâches au montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Charge les tâches depuis le modèle
   */
  const loadTasks = () => {
    const allTasks = taskListModel.getAllTasks();
    setTasks([...allTasks]);
  };

  /**
   * Ajoute une nouvelle tâche
   * @param {string} title - Le titre de la tâche
   * @param {string} category - La catégorie de la tâche
   */
  const addTask = (title, category = "divers") => {
    try {
      taskListModel.addTask(title, category);
      loadTasks();
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
      return false;
    }
  };

  /**
   * Supprime une tâche
   * @param {number} id - L'ID de la tâche
   */
  const deleteTask = (id) => {
    taskListModel.removeTask(id);
    loadTasks();
  };

  /**
   * Bascule l'état complété d'une tâche
   * @param {number} id - L'ID de la tâche
   */
  const toggleTaskCompletion = (id) => {
    taskListModel.toggleTask(id);
    loadTasks();
  };

  /**
   * Change la catégorie d'une tâche
   * @param {number} id - L'ID de la tâche
   * @param {string} newCategory - Nouvelle catégorie
   */
  const changeTaskCategory = (id, newCategory) => {
    taskListModel.setTaskCategory(id, newCategory);
    loadTasks();
  };

  /**
   * Récupère les tâches filtrées par catégorie
   * @param {string} category - La catégorie à filtrer
   */
  const getTasksByCategory = (category) => {
    return taskListModel.getTasksByCategory(category);
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    changeTaskCategory,
    getTasksByCategory,
  };
}
