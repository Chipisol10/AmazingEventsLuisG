import { generateCategoryFilters, applyEventFilters, showEventCards } from '../module/functions.js';

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("checkboxContainer");
const searchInput = document.querySelector('input[type="search"]');
const currentDate = new Date("2023-03-10");
  
 
fetch('https://aulamindhub.github.io/amazing-api/events.json')
.then(response => response.json())
.then(data => {
  const pastEvents = data.events.filter(event => new Date(event.date) <= currentDate);
  
  generateCategoryFilters(pastEvents, checkboxContainer);
  showEventCards(pastEvents, contenedor);
  
  searchInput.addEventListener('input', () => applyEventFilters(pastEvents, contenedor));
  checkboxContainer.addEventListener('change', () => applyEventFilters(pastEvents, contenedor));
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
  contenedor.innerHTML = '<p class="text-center min-h">Error al cargar los eventos</p>';
});

 
