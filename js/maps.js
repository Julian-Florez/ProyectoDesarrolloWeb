// js/maps.js
// Inicialización y utilidades para Google Maps en modales de obras de graffiti
// Requiere que Google Maps JS API esté cargada en la página

/**
 * Crea un mapa de Google Maps en el elemento dado.
 * @param {string|HTMLElement} container - ID o elemento donde se renderiza el mapa.
 * @param {number} lat - Latitud.
 * @param {number} lng - Longitud.
 * @param {object} [opts] - Opciones adicionales (zoom, marker, etc).
 */
export function renderMap(container, lat, lng, opts = {}) {
    if (typeof container === 'string') {
        container = document.getElementById(container);
    }
    if (!container || typeof google === 'undefined' || !google.maps) return;
    const map = new google.maps.Map(container, {
        center: { lat, lng },
        zoom: opts.zoom || 15,
        mapTypeId: opts.mapTypeId || 'roadmap',
        disableDefaultUI: true,
        ...opts
    });
    if (opts.marker !== false) {
        new google.maps.Marker({
            position: { lat, lng },
            map,
            title: opts.markerTitle || ''
        });
    }
    return map;
}
