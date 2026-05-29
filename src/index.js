import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { TaskList } from './components/TaskList.js';
import { Modal } from './components/Modal.js';

const container = document.getElementById('task-container');
const taskList = new TaskList(container);

const modal = new Modal((taskData) => taskList.add(taskData));
document.body.appendChild(modal.element);

document.getElementById('add-task-btn').addEventListener('click', () => modal.open());
