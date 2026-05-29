import { Task } from '../models/Task.js';
import { Card } from './Card.js';

export class TaskList {
  constructor(container) {
    this.tasks = [];
    this.container = container;
  }

  add(taskData) {
    this.tasks.push(new Task(taskData));
    this.render();
  }

  complete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.render();
  }

  setPriority(id, priority) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.priority = priority;
    this.render();
  }

  delete(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.tasks.forEach(task => {
      const card = new Card(task, {
        onComplete: () => this.complete(task.id),
        onPriorityChange: (priority) => this.setPriority(task.id, priority),
        onDelete: () => this.delete(task.id),
      });
      this.container.appendChild(card.render());
    });
  }
}
