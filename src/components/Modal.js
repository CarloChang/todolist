export class Modal {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.checklist = [];
    this.element = this.#build();
  }

  #build() {
    const template = document.getElementById('modal-template');
    const element = template.content.cloneNode(true).firstElementChild;

    element.classList.add('hidden');

    const form = element.querySelector('.task-form');
    const checklistInput = element.querySelector('.checklist-input');
    const checklistAdd = element.querySelector('.checklist-add');
    const checklistItems = element.querySelector('.checklist-items');

    element.querySelector('.close-btn').addEventListener('click', () => this.close());
    element.addEventListener('click', (e) => { if (e.target === element) this.close(); });

    const renderChecklist = () => {
      checklistItems.innerHTML = this.checklist.map((item, i) => `
        <li class="flex justify-between items-center bg-gray-50 rounded px-2 py-1">
          <span>${item.text}</span>
          <button type="button" data-index="${i}" class="remove-item text-gray-400 hover:text-red-500 text-xs">
            <i class="fas fa-xmark"></i>
          </button>
        </li>
      `).join('');
      checklistItems.querySelectorAll('.remove-item').forEach(btn =>
        btn.addEventListener('click', () => {
          this.checklist.splice(Number(btn.dataset.index), 1);
          renderChecklist();
        })
      );
    };

    checklistAdd.addEventListener('click', () => {
      const text = checklistInput.value.trim();
      if (!text) return;
      this.checklist.push({ text, done: false });
      renderChecklist();
      checklistInput.value = '';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      this.onSubmit({ ...data, checklist: this.checklist });
      form.reset();
      this.checklist = [];
      checklistItems.innerHTML = '';
      this.close();
    });

    return element;
  }

  open() { this.element.classList.remove('hidden'); }
  close() { this.element.classList.add('hidden'); }
}
