/**
 * App.jsx
 * Composant principal intégrant le modèle, la vue et le contrôleur
 */

import { useTaskController } from "./hooks/useTaskController";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  // Utiliser le contrôleur personnalisé
  const { tasks, addTask, deleteTask, toggleTaskCompletion } =
    useTaskController();

  return (
    <div className="container">
      <h1>Ma Liste de Tâches</h1>

      {/* Formulaire d'ajout de tâche (Vue) */}
      <TaskForm onAddTask={addTask} />

      {/* Liste de tâches (Vue) */}
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTaskCompletion}
      />
    </div>
  );
}

export default App;
