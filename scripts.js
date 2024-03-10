let draggedElement = null;

function allowDrop(event) {
event.preventDefault();
}

function drag(event) {
draggedElement = event.target;
}

function drop(event) {
event.preventDefault();
if (draggedElement) {
const status = event.target.parentElement.id;
const cardsContainer = document.getElementById(status).querySelector('.cardsContainer');
cardsContainer.appendChild(draggedElement);
}
}

document.querySelectorAll('.newButton').forEach(button => {
button.addEventListener('click', function() {
const status = button.parentElement.id;
openNewTaskModal(status);
});
});

function openNewTaskModal(status) {
const modal = document.getElementById('taskDetailsModal');
modal.style.display = 'block';
const form = document.getElementById('taskDetailsForm');
form.reset();
form.elements['status'].value = status;
}

document.getElementById('taskDetailsForm').addEventListener('submit', function(event) {
event.preventDefault();
const form = event.target;
const taskId = Date.now().toString(); // Generate a unique task ID
const title = form.elements['title'].value;
const status = form.elements['status'].value;
const description = form.elements['description'].value;

const card = document.createElement('div');
card.classList.add('card');
card.draggable = true;
card.setAttribute('data-id', taskId);
card.innerHTML = `
<h3>${title}</h3>
<p>Status: ${status}</p>
<p>Description: ${description}</p>
`;

card.addEventListener('click', function() {
openTaskDetails(taskId);
});

const cardsContainer = document.getElementById(status).querySelector('.cardsContainer');
cardsContainer.appendChild(card);

updateCardCount(status);
});

document.getElementById('deleteTask').addEventListener('click', function() {
const taskId = document.getElementById('taskDetailsForm').elements['title'].value;
const card = document.querySelector(`[data-id="${taskId}"]`);
if (card) {
card.remove();
const status = card.parentElement.parentElement.id;
updateCardCount(status);
}
});

document.querySelectorAll('.card').forEach(card => {
card.addEventListener('click', function() {
openTaskDetails(card.getAttribute('data-id'));
});
});

function openTaskDetails(taskId) {
const modal = document.getElementById('taskDetailsModal');
modal.style.display = 'block';

const form = document.getElementById('taskDetailsForm');
form.reset();

// Populate the form with task details for the given taskId
const card = document.querySelector(`[data-id="${taskId}"]`);
if (card) {
form.elements['title'].value = card.querySelector('h3').textContent;
form.elements['status'].value = card.querySelector('p:nth-child(2)').textContent.replace('Status: ', '');
form.elements['description'].value = card.querySelector('p:nth-child(3)').textContent.replace('Description: ', '');
}
}

document.querySelector('.close').addEventListener('click', function() {
document.getElementById('taskDetailsModal').style.display = 'none';
});

function updateCardCount(status) {
const cardsContainer = document.getElementById(status).querySelector('.cardsContainer');
const countElement = document.getElementById(status).querySelector('.cardCount');
const count = cardsContainer.children.length;
countElement.textContent = `${count} ${count === 1 ? 'card' : 'cards'}`;
}