export function generateCategoryFilters(events, checkboxContainer) {
    const categories = [...new Set(events.map(event => event.category))];
    checkboxContainer.innerHTML = '';

    categories.forEach(category => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label" for="${category}">${category}</label> 

        `;
        checkboxContainer.appendChild(checkbox);
    });
}

export function applyEventFilters(events, contenedor) {
    const searchTerm = document.querySelector('input[type="search"]').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked')).map(checkbox => checkbox.value);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        return matchesSearch && matchesCategory;
    });

    showEventCards(filteredEvents, contenedor);
}

export function showEventCards(events, contenedor) {
    contenedor.innerHTML = '';
    
    if(events.length === 0) {
        contenedor.innerHTML = '<p class="text-center min-h">No se encontraron Eventos que coincidan con tu búsqueda.</p>'
        return;
    }

    events.forEach(event => {
        const card1 = document.createElement("article");
        card1.className = "card-width card col-2";
        card1.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body d-flex flex-column justify-content-between text-primary-emphasis border border-primary-subtle">
        <h3 class="text">${event.name}</h3>
        <p class="card-text">${event.description}</p>
        <div class"d-flex justify-content-between align-items-center">
            <p class="card-title fs-5">Price: ${event.price}</p>
            <a href="../pages/details.html?id=${event._id}" class="btn btn-outline-primary btn-primary-emphasis">Details</a>
        </div>
    </div>
    `;
    contenedor.appendChild(card1);
    })
}

export function eventDetailsDisplay(event){
    const detailContainer = document.getElementById("eventDetails");

    const assistanceInfo = event.assistance ? `<li class="list-group-item text-primary-emphasis"><strong>Assistance: </strong>${event.assistance}</li>` : '';
    const estimateInfo = event.estimate ? `<li class="list-group-item text-primary-emphasis"><strong>Estimate: </strong>${event.estimate}</li>` : '';


    detailContainer.innerHTML = `
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12">
        <div class="card border border-primary">
          <div class="row g-0 h-100">
            <div class="col-md-6 d-flex align-items-stretch">
              <div class="w-100">
                <img src="${event.image}" class="img-fluid rounded-start h-100 w-100 object-fit-cover" alt="Event Image">
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-stretch gap-5">
              <div class="card-body d-flex flex-column justify-content-between bg-p">
                <h2 class="card-title text-center text-primary-emphasis">${event.name}</h2>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item text-primary-emphasis"><strong>Date:</strong> ${event.date}</li>
                  <li class="list-group-item text-primary-emphasis"><strong>Description: </strong>${event.description}</li>
                  <li class="list-group-item text-primary-emphasis"><strong>Category: </strong>${event.category}</li>
                  <li class="list-group-item text-primary-emphasis"><strong>Place: </strong>${event.place}</li>
                  <li class="list-group-item text-primary-emphasis"><strong>Capacity: </strong>${event.capacity}</li>
                  ${assistanceInfo}
                  ${estimateInfo}
                  <li class="list-group-item text-primary-emphasis"><strong>Price: </strong>${event.price}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

 export function errorMessageDisplay(message) {
    const detailsContainer = document.getElementById("eventDetails");
    detailsContainer.innerHTML = `<p class="text-center text-danger">${message}</p>`;
}


