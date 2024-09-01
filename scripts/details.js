import { eventDetailsDisplay, errorMessageDisplay } from '../module/functions.js';

const params = new URLSearchParams(window.location.search);
const eventid = params.get('id');

if(eventid) {
    fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        const event = data.events.find(e => e._id === parseInt(eventid));
        if(event) {
            eventDetailsDisplay(event);
        } else {
            errorMessageDisplay("El evento no fue encontrado");
        }
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
        errorMessageDisplay("Hubo un error al cargar los datos");
    });
} else {
    errorMessageDisplay("El evento que seleccionaste no está disponible");
}

