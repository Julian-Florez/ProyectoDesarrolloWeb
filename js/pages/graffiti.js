import { renderMap } from '../utils/maps.js';
import { fetchWikipediaSummary } from '../utils/wikipedia.js';

const GRAFFITI_DATA_URL = "../data/graffiti.json";

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderHistoria(historia) {
    const container = document.getElementById("historia-dynamic");
    if (!container) return;

    const buttons = historia
        .map(
            (item) => `
				<button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#${escapeHtml(item.modalId)}" style="border:none;background:none;">
					<img src="${escapeHtml(item.imageSrc)}" alt="${escapeHtml(item.imageAlt || "")}" class="historia-img">
				</button>
			`
        )
        .join("");

		const modals = historia
			.map(
				(item) => `
					<div class="modal fade graffiti-modal" id="${escapeHtml(item.modalId)}" tabindex="-1" aria-labelledby="${escapeHtml(item.modalLabelId)}" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="${escapeHtml(item.modalLabelId)}">${escapeHtml(item.modalTitle)}</h5>
									<button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Cerrar">
										<img src="../../assets/img/graffiti/modal/close.png" alt="Cerrar" width="50" height="50">
									</button>
								</div>
								<div class="modal-body">
									${escapeHtml(item.modalBody)}
								</div>
							</div>
						</div>
					</div>
				`
			)
			.join("");

    container.innerHTML = `
		<div class="historia-img-row">
			${buttons}
		</div>
		${modals}
	`;
}

function renderCaracteristicas(caracteristicas) {
    const cardsContainer = document.getElementById("caracteristicas-dynamic");
    const modalsContainer = document.getElementById("graffiti-modals-dynamic");
    if (!cardsContainer || !modalsContainer) return;

    const cards = caracteristicas
        .map(
            (item) => `
				<div class="col-12 col-md-6 col-xl-4">
					<article class="card h-100 graffiti-card">
						<img src="${escapeHtml(item.imageSrc)}" class="card-img-top graffiti-card-image" alt="${escapeHtml(item.imageAlt)}">
						<div class="card-body d-flex flex-column">
							<h3 class="card-title">${escapeHtml(item.title)}</h3>
							<button type="button" class="btn graffiti-card-button mt-auto align-self-start" data-bs-toggle="modal" data-bs-target="#${escapeHtml(item.modalId)}" aria-label="${escapeHtml(item.buttonAriaLabel)}" title="Más información">
								+
							</button>
						</div>
					</article>
				</div>
			`
        )
        .join("");

	const modals = caracteristicas
		.map(
			(item) => `
				<div class="modal fade graffiti-modal" id="${escapeHtml(item.modalId)}" tabindex="-1" aria-labelledby="${escapeHtml(item.modalLabelId)}" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h2 class="modal-title fs-4" id="${escapeHtml(item.modalLabelId)}">${escapeHtml(item.title)}</h2>
								<button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Cerrar">
									<img src="../../assets/img/graffiti/modal/close.png" alt="Cerrar" width="50" height="50">
								</button>
							</div>
							<div class="modal-body">
								<p>${escapeHtml(item.modalBody)}</p>
							</div>
						</div>
					</div>
				</div>
			`
		)
		.join("");

    cardsContainer.innerHTML = `
		<div class="container-fluid px-0 graffiti-cards">
			<div class="row g-4">
				${cards}
			</div>
		</div>
	`;

    modalsContainer.innerHTML = modals;
}

function renderTecnicas(tecnicas) {
    const container = document.getElementById("tecnicas-dynamic");
    if (!container) return;

	const items = tecnicas
		.map(
			(item, index) => `
				<div class="carousel-item${index === 0 ? " active" : ""}">
					<article class="graffiti-technique-panel">
						<div class="row g-0 align-items-stretch">
							<div class="col-12 col-lg-5">
								<img src="${escapeHtml(item.imageSrc)}" class="graffiti-technique-image technique-image-large" alt="${escapeHtml(item.imageAlt)}">
							</div>
							<div class="col-12 col-lg-7">
								<div class="graffiti-technique-content">
									<span class="graffiti-technique-kicker">${escapeHtml(item.kicker)}</span>
									<h3>${escapeHtml(item.title)}</h3>
									<p>${escapeHtml(item.description)}</p>
								</div>
							</div>
						</div>
					</article>
				</div>
			`
		)
		.join("");

	container.innerHTML = `
		<div id="graffitiTechniquesCarousel" class="carousel slide graffiti-techniques-carousel" data-bs-ride="false">
			<div class="carousel-inner">
				${items}
			</div>
			<button class="carousel-control-prev graffiti-carousel-control" type="button" data-bs-target="#graffitiTechniquesCarousel" data-bs-slide="prev">
				<img src="../../assets/img/graffiti/galeria/move.png" alt="Anterior" style="width:50px;height:50px;transform:none;">
				<span class="visually-hidden">Anterior</span>
			</button>
			<button class="carousel-control-next graffiti-carousel-control" type="button" data-bs-target="#graffitiTechniquesCarousel" data-bs-slide="next">
				<img src="../../assets/img/graffiti/galeria/move.png" alt="Siguiente" style="width:50px;height:50px;transform:rotate(180deg);">
				<span class="visually-hidden">Siguiente</span>
			</button>
		</div>
	`;
}

function renderArtistas(artistas) {
	const container = document.getElementById("artistas-dynamic");
	if (!container) return;

	// Genera los modales y las tarjetas
	const items = artistas
		.map((artist, idx) => {
			const modalId = `modalArtista${idx}`;
			const modalLabelId = `modalArtista${idx}Label`;
			const wikipediaPage = artist.wikipediaPage || artist.name;
			return `
			<div class="col">
				<button type="button" class="btn p-0 graffiti-artist-card" data-bs-toggle="modal" data-bs-target="#${modalId}" aria-label="${escapeHtml(artist.ariaLabel)}" style="background:none;border:none;width:100%;" data-wikipage="${escapeHtml(wikipediaPage)}" data-artistdesc="${escapeHtml(artist.description)}">
					<div class="graffiti-artist-visual">
						<img src="${escapeHtml(artist.portraitSrc)}" class="graffiti-artist-portrait" alt="${escapeHtml(artist.portraitAlt)}">
						<img src="${escapeHtml(artist.signatureSrc)}" class="graffiti-artist-signature" alt="${escapeHtml(artist.signatureAlt)}">
					</div>
				</button>
				<div class="modal fade graffiti-modal" id="${modalId}" tabindex="-1" aria-labelledby="${modalLabelId}" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h2 class="modal-title fs-4" id="${modalLabelId}">${escapeHtml(artist.name)}</h2>
								<button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Cerrar">
									<img src="../../assets/img/graffiti/modal/close.png" alt="Cerrar" width="50" height="50">
								</button>
							</div>
							<div class="modal-body" id="modalBody-${modalId}">
								<p>${escapeHtml(artist.description)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
		})
		.join("");

	container.innerHTML = `
		<div class="container-fluid px-0 graffiti-artists-gallery">
			<div class="row g-4 row-cols-2 row-cols-lg-3">
				${items}
			</div>
		</div>
	`;

	// Añade listeners para cargar Wikipedia al abrir el modal usando el módulo genérico
	setTimeout(() => {
		const buttons = container.querySelectorAll(".graffiti-artist-card");
		buttons.forEach((btn, idx) => {
			btn.addEventListener("click", async () => {
				const wikipediaPage = btn.getAttribute("data-wikipage");
				const artistDesc = btn.getAttribute("data-artistdesc");
				const modalId = `modalArtista${idx}`;
				const modalBody = document.getElementById(`modalBody-${modalId}`);
				if (!modalBody) return;
				modalBody.innerHTML = '<div style="text-align:center"><span class="spinner-border"></span><br>Cargando información de Wikipedia...</div>';
				try {
					// Importa dinámicamente la función genérica
					const { fetchWikipediaSummary } = await import('../utils/wikipedia.js');
					const data = await fetchWikipediaSummary(wikipediaPage, { lang: 'es' });
					if (!data) throw new Error('No encontrado');
					let imgHtml = "";
					if (data.image) {
						imgHtml = `<div class="artist-modal-img mb-2"><img class="artist-modal-img-element" src="${escapeHtml(data.image)}" alt="Imagen de Wikipedia"></div>`;
					}
					modalBody.innerHTML = `
						${imgHtml}
						<p>${escapeHtml(data.extract)}</p>
						<div style=\"font-size:0.9em;text-align:right;\">
							<a href="${escapeHtml(data.url)}" target="_blank" rel="noopener">Ver en Wikipedia</a>
						</div>
					`;
				} catch (e) {
					modalBody.innerHTML = `<p>${escapeHtml(artistDesc)}</p><div style='color:#888;font-size:0.9em;'>No se pudo cargar información de Wikipedia.</div>`;
				}
			});
		});
	}, 0);
}

function renderObrasGallery(obras) {
	const container = document.getElementById('obras-gallery');
	if (!container) return;
	const chunkSize = 3;
	const slides = [];
	for (let i = 0; i < obras.length; i += chunkSize) {
		slides.push(obras.slice(i, i + chunkSize));
	}

	const carouselItems = slides.map((slide, slideIdx) => `
		<div class="carousel-item${slideIdx === 0 ? ' active' : ''}">
			<div class="row g-4 justify-content-center">
				${slide.map((obra, idx) => {
					const globalIdx = slideIdx * chunkSize + idx;
					return `
					<div class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch obra-carousel-col">
						<button type="button" class="btn p-0 obra-card w-100" data-bs-toggle="modal" data-bs-target="#modalObra${globalIdx}" data-idx="${globalIdx}" style="background:none;border:none;width:100%;">
							<div class="obra-img-thumb" id="obraThumb${globalIdx}" style="height:180px;display:flex;align-items:center;justify-content:center;overflow:hidden">
								<span class="spinner-border"></span>
							</div>
							<div class="obra-title">${escapeHtml(obra.name)}</div>
						</button>
						<div class="modal fade graffiti-modal" id="modalObra${globalIdx}" tabindex="-1" aria-labelledby="modalObra${globalIdx}Label" aria-hidden="true">
							<div class="modal-dialog modal-lg modal-dialog-centered">
								<div class="modal-content">
									<div class="modal-header">
										<h2 class="modal-title fs-4" id="modalObra${globalIdx}Label">${escapeHtml(obra.name)}</h2>
										<button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Cerrar">
											<img src="../../assets/img/graffiti/modal/close.png" alt="Cerrar" width="50" height="50">
										</button>
									</div>
									<div class="modal-body">
										<div class="row g-0">
											<div class="col-12 col-md-6 p-3 d-flex flex-column justify-content-center">
												<div id="obraDesc${globalIdx}"><span class="spinner-border"></span> Cargando...</div>
											</div>
											<div class="col-12 col-md-6 p-3">
												<div class="obra-modal-img mb-2" id="obraImg${globalIdx}"><span class="spinner-border"></span></div>
												<div id="obraMap${globalIdx}" style="width:100%;height:200px;border-radius:8px;overflow:hidden;"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				`;
				}).join('')}
			</div>
		</div>
	`).join('');

	container.innerHTML = `
		<div id="obrasCarousel" class="carousel slide graffiti-techniques-carousel" data-bs-ride="false">
			<div class="carousel-inner">
				${carouselItems}
			</div>
			<button class="carousel-control-prev graffiti-carousel-control" type="button" data-bs-target="#obrasCarousel" data-bs-slide="prev">
				<img src="../../assets/img/graffiti/galeria/move.png" alt="Anterior" style="width:50px;height:50px;transform:none;">
				<span class="visually-hidden">Anterior</span>
			</button>
			<button class="carousel-control-next graffiti-carousel-control" type="button" data-bs-target="#obrasCarousel" data-bs-slide="next">
				<img src="../../assets/img/graffiti/galeria/move.png" alt="Siguiente" style="width:50px;height:50px;transform:rotate(180deg);">
				<span class="visually-hidden">Siguiente</span>
			</button>
		</div>
	`;

	// Cargar imágenes de Wikipedia para thumbnails, con fallback a placeholder
	obras.forEach(async (obra, idx) => {
		const thumb = document.getElementById(`obraThumb${idx}`);
		if (!thumb) return;
		try {
			const wiki = await fetchWikipediaSummary(obra.wikipediaPage, { lang: 'es' });
			if (wiki && wiki.image) {
				thumb.innerHTML = `<img src="${escapeHtml(wiki.image)}" alt="${escapeHtml(obra.name)}" style="width:100%;height:100%;object-fit:cover;">`;
			} else if (obra.placeholderImg) {
				thumb.innerHTML = `<img src="${escapeHtml(obra.placeholderImg)}" alt="${escapeHtml(obra.name)}" style="width:100%;height:100%;object-fit:cover;opacity:0.7;">`;
			} else {
				thumb.innerHTML = `<span style='color:#888;'>Sin imagen</span>`;
			}
		} catch (e) {
			if (obra.placeholderImg) {
				thumb.innerHTML = `<img src="${escapeHtml(obra.placeholderImg)}" alt="${escapeHtml(obra.name)}" style="width:100%;height:100%;object-fit:cover;opacity:0.7;">`;
			} else {
				thumb.innerHTML = `<span style='color:#888;'>Sin imagen</span>`;
			}
		}
	});

	// Listeners para cargar contenido del modal al abrir
	container.querySelectorAll('.obra-card').forEach(btn => {
		btn.addEventListener('click', async e => {
			const idx = btn.getAttribute('data-idx');
			const obra = obras[idx];
			const descDiv = document.getElementById(`obraDesc${idx}`);
			const imgDiv = document.getElementById(`obraImg${idx}`);
			if (descDiv) descDiv.innerHTML = '<span class="spinner-border"></span> Cargando...';
			if (imgDiv) imgDiv.innerHTML = '<span class="spinner-border"></span>';
			// Info Wikipedia
			let wiki = null;
			try {
				wiki = await fetchWikipediaSummary(obra.wikipediaPage, { lang: 'es' });
			} catch (e) {
				wiki = null;
			}
			if (descDiv) {
				descDiv.innerHTML = wiki ? `<div><strong>${escapeHtml(wiki.title)}</strong></div><div>${escapeHtml(wiki.extract)}</div><div style='font-size:0.9em;text-align:right;'><a href="${escapeHtml(wiki.url)}" target="_blank">Ver en Wikipedia</a></div>` : '<span style="color:#888;">No se pudo cargar información.</span>';
			}
			if (imgDiv) {
				if (wiki && wiki.image) {
					imgDiv.innerHTML = `<img class="obra-modal-img-element" src="${escapeHtml(wiki.image)}" alt="${escapeHtml(obra.name)}">`;
				} else if (obra.placeholderImg) {
					imgDiv.innerHTML = `<img class="obra-modal-img-element" src="${escapeHtml(obra.placeholderImg)}" alt="${escapeHtml(obra.name)}" style="opacity:0.7;">`;
				} else {
					imgDiv.innerHTML = `<span style='color:#888;'>Sin imagen</span>`;
				}
			}
			// Mapa
			setTimeout(() => {
				renderMap(`obraMap${idx}`, obra.lat, obra.lng, { markerTitle: obra.name });
			}, 300);
		});
	});
}

function renderImpacto(impactos) {
    const container = document.getElementById("impacto-dynamic");
    if (!container) return;

    const buttons = impactos
        .map(
            (item) => `
				<button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#${escapeHtml(item.modalId)}" style="border:none;background:none;">
					<img src="${escapeHtml(item.imageSrc)}" alt="${escapeHtml(item.imageAlt)}" class="impacto-img">
				</button>
			`
        )
        .join("");

		const modals = impactos
			.map(
				(item) => `
					<div class="modal fade graffiti-modal" id="${escapeHtml(item.modalId)}" tabindex="-1" aria-labelledby="${escapeHtml(item.modalLabelId)}" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="${escapeHtml(item.modalLabelId)}">${escapeHtml(item.modalTitle)}</h5>
									<button type="button" class="btn-close custom-close" data-bs-dismiss="modal" aria-label="Cerrar">
										<img src="../../assets/img/graffiti/modal/close.png" alt="Cerrar" width="50" height="50">
									</button>
								</div>
								<div class="modal-body">
									${escapeHtml(item.modalBody)}
									<hr>
									<div class="graffiti-modal-ref">
										Referencia: <a href="${escapeHtml(item.reference.url)}" target="_blank">${escapeHtml(item.reference.label)}</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				`
			)
			.join("");

    container.innerHTML = `
		<div class="impacto-img-grid">
			${buttons}
		</div>
		${modals}
	`;
}

async function initGraffitiPage() {
    try {
        const response = await fetch(GRAFFITI_DATA_URL);
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${GRAFFITI_DATA_URL}`);
        }

        const data = await response.json();

        renderHistoria(data.historia || []);
        renderCaracteristicas(data.caracteristicas || []);
        renderTecnicas(data.tecnicas || []);
        renderArtistas(data.artistas || []);
        renderImpacto(data.impacto || []);

		// Galería de obras
		if (data.obras) {
			renderObrasGallery(data.obras);
		}
    } catch (error) {
        console.error("Error al cargar contenido dinamico de graffiti:", error);
    }
}

document.addEventListener("DOMContentLoaded", initGraffitiPage);
