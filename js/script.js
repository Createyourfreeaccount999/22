new Vue({
  el: '#app',
  data: {
    columns: [
      { id: 'planned', name: 'Planned' },
      { id: 'inProgress', name: 'In Progress' },
      { id: 'testing', name: 'Testing' },
      { id: 'done', name: 'Done' }
    ],
    cards: []
  },
  methods: {
    createCard(columnId = 'planned') {
      const title = prompt("Введите заголовок задачи:");
      if (!title) return;
      const description = prompt("Введите описание задачи:");
      const deadline = prompt("Введите дэдлайн (например, 2025-09-20):");
      const now = new Date().toLocaleString();
      this.cards.push({
        id: Date.now(),
        title,
        description,
        deadline,
        createdAt: now,
        updatedAt: now,
        columnId,
        returnReason: ''
      });
    },
    editCard(card) {
      const newTitle = prompt("Введите новый заголовок:", card.title);
      if (newTitle) card.title = newTitle;
      const newDesc = prompt("Введите новое описание:", card.description);
      if (newDesc) card.description = newDesc;
      const newDeadline = prompt("Введите новый дэдлайн:", card.deadline);
      if (newDeadline) card.deadline = newDeadline;
      card.updatedAt = new Date().toLocaleString();
    },
    deleteCard(cardId) {
      this.cards = this.cards.filter(c => c.id !== cardId);
    },
    moveCard(card) {
      if (card.columnId === 'planned') card.columnId = 'inProgress';
      else if (card.columnId === 'inProgress') card.columnId = 'testing';
      else if (card.columnId === 'testing') card.columnId = 'done';
      if (card.columnId !== 'inProgress') card.returnReason = '';
    },
    returnCard(card) {
      const reason = prompt("Укажите причину возврата:");
      if (!reason) return;
      card.returnReason = reason;
      card.columnId = 'inProgress';
    },
    getCardsByColumn(columnId) {
      return this.cards.filter(c => c.columnId === columnId);
    },
    getStatusText(card) {
      if (card.columnId !== 'done') return '';
      const now = new Date();
      const d = new Date(card.deadline);
      if (isNaN(d)) return '❌ Некорректная дата';
      return d < now ? '❌ Просрочено' : '✅ Выполнено в срок';
    },
    getStatusColor(card) {
      if (card.columnId !== 'done') return '';
      const now = new Date();
      const d = new Date(card.deadline);
      if (isNaN(d)) return 'orange';
      return d < now ? 'red' : 'green';
    }
  }
});
