import { format, isPast, isToday } from 'date-fns';

const priorityStyles = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

export class Card {
  constructor(task, { onComplete, onPriorityChange, onDelete }) {
    this.task = task;
    this.onComplete = onComplete;
    this.onPriorityChange = onPriorityChange;
    this.onDelete = onDelete;
  }

  #formatDate() {
    if (!this.task.dueDate) return '';
    const date = new Date(`${this.task.dueDate}T00:00:00`);
    if (isToday(date)) return '<span class="text-orange-500 text-xs">Due today</span>';
    if (isPast(date)) return `<span class="text-red-500 text-xs">Overdue · ${format(date, 'MMM d')}</span>`;
    return `<span class="text-gray-400 text-xs">${format(date, 'MMM d')}</span>`;
  }

  render() {
    const card = document.createElement('div');
    card.className = `bg-white rounded-xl shadow p-4 flex flex-col gap-2 transition-opacity ${this.task.completed ? 'opacity-50' : ''}`;

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2">
          <button class="complete-btn text-xl transition-colors ${this.task.completed ? 'text-green-500' : 'text-gray-300 hover:text-green-400'}">
            <i class="fa-${this.task.completed ? 'solid' : 'regular'} fa-circle-check"></i>
          </button>
          <span class="font-medium text-gray-800 ${this.task.completed ? 'line-through text-gray-400' : ''}">
            ${this.task.title}
          </span>
        </div>
        <button class="delete-btn text-gray-300 hover:text-red-400 text-sm">
          <i class="fas fa-trash"></i>
        </button>
      </div>

      ${this.task.description
        ? `<p class="text-sm text-gray-500 ml-8">${this.task.description}</p>`
        : ''}

      <div class="flex items-center gap-2 ml-8">
        <select class="priority-select text-xs rounded-full px-2 py-0.5 font-medium border-0 cursor-pointer ${priorityStyles[this.task.priority]}">
          <option value="low"  ${this.task.priority === 'low'    ? 'selected' : ''}>Low</option>
          <option value="medium" ${this.task.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="high" ${this.task.priority === 'high'   ? 'selected' : ''}>High</option>
        </select>
        ${this.#formatDate()}
      </div>

      ${this.task.notes
        ? `<p class="text-xs text-gray-400 ml-8 italic">${this.task.notes}</p>`
        : ''}

      ${this.task.checklist.length ? `
        <ul class="ml-8 flex flex-col gap-1">
          ${this.task.checklist.map(item => `
            <li class="flex items-center gap-2 text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-600'}">
              <i class="fa-regular ${item.done ? 'fa-square-check text-green-400' : 'fa-square text-gray-300'}"></i>
              ${item.text}
            </li>
          `).join('')}
        </ul>
      ` : ''}
    `;

    card.querySelector('.complete-btn').addEventListener('click', () => this.onComplete());
    card.querySelector('.delete-btn').addEventListener('click', () => this.onDelete());
    card.querySelector('.priority-select').addEventListener('change', (e) => this.onPriorityChange(e.target.value));

    return card;
  }
}
