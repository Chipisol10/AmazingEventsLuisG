import { generateCategoryFilters, applyEventFilters, showEventCards } from '../module/functions.js';

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("checkboxContainer");
const searchInput = document.querySelector('input[type="search"]');
const currentDate = new Date("2023-03-10");
  
 
fetch('https://aulamindhub.github.io/amazing-api/events.json')
.then(response => response.json())
.then(data => {
  const futureEvents = data.events.filter(event => new Date(event.date) >= currentDate);
  
  generateCategoryFilters(futureEvents, checkboxContainer);
  showEventCards(futureEvents, contenedor);
  
  searchInput.addEventListener('input', () => applyEventFilters(futureEvents, contenedor));
  checkboxContainer.addEventListener('change', () => applyEventFilters(futureEvents, contenedor));
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
  contenedor.innerHTML = '<p class="text-center min-h">Error al cargar los eventos</p>';
});






