// js/utils/wikipedia.js
// Función genérica para obtener extracto e imagen de Wikipedia (API REST)
// Uso: import { fetchWikipediaSummary } from '../utils/wikipedia.js';

/**
 * Busca información en Wikipedia (extracto e imagen principal) para una página dada.
 * @param {string} pageName - Nombre de la página de Wikipedia (sin prefijo de idioma, espacios permitidos).
 * @param {Object} [opts] - Opciones adicionales.
 * @param {string} [opts.lang='es'] - Idioma (por defecto 'es').
 * @returns {Promise<{extract: string, image: string|null, url: string, title: string}|null>} - Objeto con extracto, imagen, url y título, o null si no se encuentra.
 */
/**
 * Busca información en Wikipedia (extracto e imagen principal) para una página dada.
 * Si no encuentra en español, busca en inglés y traduce el extracto al español.
 * @param {string} pageName - Nombre de la página de Wikipedia (sin prefijo de idioma, espacios permitidos).
 * @param {Object} [opts] - Opciones adicionales.
 * @param {string} [opts.lang='es'] - Idioma preferido (por defecto 'es').
 * @returns {Promise<{extract: string, image: string|null, url: string, title: string, lang: string}|null>} - Objeto con extracto, imagen, url, título y lang, o null si no se encuentra.
 */
export async function fetchWikipediaSummary(pageName, opts = {}) {
    const preferLang = opts.lang || 'es';
    const langs = [preferLang, 'en'];
    let lastData = null;
    let usedLang = preferLang;
    for (const lang of langs) {
        const apiUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`;
        try {
            const resp = await fetch(apiUrl);
            if (!resp.ok) continue;
            const data = await resp.json();
            if (data.extract) {
                lastData = {
                    extract: data.extract,
                    image: data.thumbnail && data.thumbnail.source ? data.thumbnail.source : null,
                    url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(pageName)}`,
                    title: data.title || pageName,
                    lang
                };
                usedLang = lang;
                break;
            }
        } catch (e) {
            continue;
        }
    }
    if (!lastData) return null;
    return lastData;
}
