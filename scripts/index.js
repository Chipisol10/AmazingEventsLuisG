import { generateCategoryFilters, applyEventFilters, showEventCards} from '../module/functions.js';

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("checkboxContainer");
const searchInput = document.querySelector('input[type="search"]');

fetch('https://aulamindhub.github.io/amazing-api/events.json')
.then(response => response.json())
.then(data => {
  generateCategoryFilters(data.events, checkboxContainer);
  showEventCards(data.events, contenedor);
  
  searchInput.addEventListener('input', () => applyEventFilters(data.events, contenedor));
  checkboxContainer.addEventListener('change', () => applyEventFilters(data.events, contenedor));
})
.catch(error => {
  console.error('Error al obtener los datos:', error);
  contenedor.innerHTML = '<p class="text-center min-h">Error al cargar los eventos</p>';
})



