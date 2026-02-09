/**
 * TaskRenderer.js
 * Classes abstraites et concrètes pour le rendu des tâches par catégorie
 */

/**
 * Classe abstraite TaskRenderer
 * Définit l'interface pour le rendu des tâches
 */
class TaskRenderer {
  /**
   * Méthode abstraite pour rendre une tâche
   * @param {AdvancedTask} task - La tâche à rendre
   * @returns {Object} - Objet contenant les propriétés de rendu (couleur, icône, etc.)
   */
  render(task) {
    throw new Error("render() must be implemented in subclass");
  }

  /**
   * Obtient la classe CSS pour la catégorie
   * @returns {string} - Classe CSS
   */
  getCSSClass() {
    throw new Error("getCSSClass() must be implemented in subclass");
  }

  /**
   * Obtient la couleur hexadécimale pour la catégorie
   * @returns {string} - Couleur hexadécimale
   */
  getColor() {
    throw new Error("getColor() must be implemented in subclass");
  }

  /**
   * Obtient l'icône pour la catégorie
   * @returns {string} - Icône Unicode
   */
  getIcon() {
    throw new Error("getIcon() must be implemented in subclass");
  }
}

/**
 * Renderer pour les tâches de travail
 */
class WorkTaskRenderer extends TaskRenderer {
  render(task) {
    return {
      color: this.getColor(),
      cssClass: this.getCSSClass(),
      icon: this.getIcon(),
      label: "Travail",
    };
  }

  getCSSClass() {
    return "task-work";
  }

  getColor() {
    return "#ff6b6b"; // Rouge
  }

  getIcon() {
    return "💼";
  }
}

/**
 * Renderer pour les tâches de maison
 */
class HomeTaskRenderer extends TaskRenderer {
  render(task) {
    return {
      color: this.getColor(),
      cssClass: this.getCSSClass(),
      icon: this.getIcon(),
      label: "Maison",
    };
  }

  getCSSClass() {
    return "task-home";
  }

  getColor() {
    return "#4ecdc4"; // Bleu
  }

  getIcon() {
    return "🏠";
  }
}

/**
 * Renderer pour les tâches diverses
 */
class MiscTaskRenderer extends TaskRenderer {
  render(task) {
    return {
      color: this.getColor(),
      cssClass: this.getCSSClass(),
      icon: this.getIcon(),
      label: "Divers",
    };
  }

  getCSSClass() {
    return "task-misc";
  }

  getColor() {
    return "#95e377"; // Vert
  }

  getIcon() {
    return "⭐";
  }
}

/**
 * Factory pour créer les renderers appropriés
 */
class TaskRendererFactory {
  static createRenderer(category) {
    switch (category) {
      case "travail":
        return new WorkTaskRenderer();
      case "maison":
        return new HomeTaskRenderer();
      case "divers":
        return new MiscTaskRenderer();
      default:
        return new MiscTaskRenderer();
    }
  }

  static getAllRenderers() {
    return {
      travail: new WorkTaskRenderer(),
      maison: new HomeTaskRenderer(),
      divers: new MiscTaskRenderer(),
    };
  }
}

export {
  TaskRenderer,
  WorkTaskRenderer,
  HomeTaskRenderer,
  MiscTaskRenderer,
  TaskRendererFactory,
};
