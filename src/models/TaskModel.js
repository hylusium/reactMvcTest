/**
 * Modèle - TaskModel.js
 * Gère la structure des tâches et la logique métier
 * Utilise les patterns: Singleton, Héritage, Abstraction
 */

import { TaskRendererFactory } from "./TaskRenderer";

/**
 * Classe de base Task
 */
class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.createdAt = new Date();
  }
}

/**
 * Classe AdvancedTask héritant de Task
 * Ajoute la propriété de catégorie
 */
class AdvancedTask extends Task {
  constructor(id, title, category = "divers") {
    super(id, title);
    this.category = category;
    this.renderer = TaskRendererFactory.createRenderer(category);
  }

  /**
   * Change la catégorie de la tâche
   * @param {string} newCategory - Nouvelle catégorie
   */
  setCategory(newCategory) {
    this.category = newCategory;
    this.renderer = TaskRendererFactory.createRenderer(newCategory);
  }

  /**
   * Obtient les propriétés de rendu de la tâche
   * @returns {Object} - Objet avec couleur, icône, etc.
   */
  getRenderProperties() {
    return this.renderer.render(this);
  }
}

/**
 * Singleton TaskList
 * Garantit qu'il n'y a qu'une seule instance du modèle de tâches
 */
class TaskList {
  static instance = null;

  constructor() {
    if (TaskList.instance) {
      return TaskList.instance;
    }
    this.tasks = [];
    this.nextId = 1;
    this.loadFromStorage();
    TaskList.instance = this;
  }

  /**
   * Obtient l'instance unique du singleton
   * @returns {TaskList} - L'instance unique
   */
  static getInstance() {
    if (!TaskList.instance) {
      TaskList.instance = new TaskList();
    }
    return TaskList.instance;
  }

  /**
   * Ajoute une nouvelle tâche à la liste
   * @param {string} title - Le titre de la tâche
   * @param {string} category - La catégorie de la tâche
   * @returns {AdvancedTask} - La tâche créée
   */
  addTask(title, category = "divers") {
    if (!title || title.trim().length === 0) {
      throw new Error("Le titre de la tâche ne peut pas être vide");
    }

    const task = new AdvancedTask(this.nextId++, title.trim(), category);
    this.tasks.push(task);
    this.saveToStorage();
    return task;
  }

  /**
   * Supprime une tâche par son ID
   * @param {number} id - L'ID de la tâche à supprimer
   */
  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToStorage();
  }

  /**
   * Bascule l'état complété d'une tâche
   * @param {number} id - L'ID de la tâche
   */
  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage();
    }
  }

  /**
   * Change la catégorie d'une tâche
   * @param {number} id - L'ID de la tâche
   * @param {string} newCategory - Nouvelle catégorie
   */
  setTaskCategory(id, newCategory) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.setCategory(newCategory);
      this.saveToStorage();
    }
  }

  /**
   * Récupère toutes les tâches
   * @returns {AdvancedTask[]} - Tableau des tâches
   */
  getAllTasks() {
    return [...this.tasks];
  }

  /**
   * Récupère les tâches par catégorie
   * @param {string} category - La catégorie à filtrer
   * @returns {AdvancedTask[]} - Tâches de la catégorie
   */
  getTasksByCategory(category) {
    return this.tasks.filter((task) => task.category === category);
  }

  /**
   * Sauvegarde les tâches dans le localStorage
   */
  saveToStorage() {
    const tasksData = this.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      category: task.category,
      createdAt: task.createdAt,
    }));
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    localStorage.setItem("nextId", this.nextId.toString());
  }

  /**
   * Charge les tâches depuis le localStorage
   */
  loadFromStorage() {
    const savedTasks = localStorage.getItem("tasks");
    const savedNextId = localStorage.getItem("nextId");

    if (savedTasks) {
      try {
        const tasksData = JSON.parse(savedTasks);
        this.tasks = tasksData.map(
          (data) => new AdvancedTask(data.id, data.title, data.category),
        );
        // Restaurer les propriétés
        this.tasks.forEach((task, index) => {
          task.completed = tasksData[index].completed;
          if (tasksData[index].createdAt) {
            task.createdAt = new Date(tasksData[index].createdAt);
          }
        });
      } catch (e) {
        console.error("Erreur lors du chargement des tâches", e);
        this.tasks = [];
      }
    }

    if (savedNextId) {
      this.nextId = parseInt(savedNextId, 10);
    }
  }
}

// Exporter avec Singleton
const taskListInstance = TaskList.getInstance();

export { Task, AdvancedTask, TaskList, taskListInstance };
