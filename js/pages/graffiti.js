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
				<div class="modal fade" id="${escapeHtml(item.modalId)}" tabindex="-1" aria-labelledby="${escapeHtml(item.modalLabelId)}" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="${escapeHtml(item.modalLabelId)}">${escapeHtml(item.modalTitle)}</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
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
		<h2>
			<div class="historia-img-row">
				${buttons}
			</div>
		</h2>
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
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
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

    const indicators = tecnicas
        .map(
            (item, index) => `
				<button type="button" data-bs-target="#graffitiTechniquesCarousel" data-bs-slide-to="${index}"${index === 0 ? ' class="active" aria-current="true"' : ""} aria-label="Ver técnica ${escapeHtml(item.title)}"></button>
			`
        )
        .join("");

    const items = tecnicas
        .map(
            (item, index) => `
				<div class="carousel-item${index === 0 ? " active" : ""}">
					<article class="graffiti-technique-panel">
						<div class="row g-0 align-items-stretch">
							<div class="col-12 col-lg-5">
								<img src="${escapeHtml(item.imageSrc)}" class="graffiti-technique-image" alt="${escapeHtml(item.imageAlt)}">
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
			<div class="carousel-indicators graffiti-carousel-indicators">
				${indicators}
			</div>

			<div class="carousel-inner">
				${items}
			</div>

			<button class="carousel-control-prev graffiti-carousel-control" type="button" data-bs-target="#graffitiTechniquesCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Anterior</span>
			</button>
			<button class="carousel-control-next graffiti-carousel-control" type="button" data-bs-target="#graffitiTechniquesCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Siguiente</span>
			</button>
		</div>
	`;
}

function renderArtistas(artistas) {
    const container = document.getElementById("artistas-dynamic");
    if (!container) return;

    const items = artistas
        .map(
            (artist) => `
				<div class="col">
					<details class="graffiti-artist-card">
						<summary class="graffiti-artist-trigger" aria-label="${escapeHtml(artist.ariaLabel)}">
							<div class="graffiti-artist-visual">
								<img src="${escapeHtml(artist.portraitSrc)}" class="graffiti-artist-portrait" alt="${escapeHtml(artist.portraitAlt)}">
								<img src="${escapeHtml(artist.signatureSrc)}" class="graffiti-artist-signature" alt="${escapeHtml(artist.signatureAlt)}">
							</div>
						</summary>
						<div class="graffiti-artist-copy">
							<h3>${escapeHtml(artist.name)}</h3>
							<p>${escapeHtml(artist.description)}</p>
						</div>
					</details>
				</div>
			`
        )
        .join("");

    container.innerHTML = `
		<div class="container-fluid px-0 graffiti-artists-gallery">
			<div class="row g-4 row-cols-2 row-cols-lg-3">
				${items}
			</div>
		</div>
	`;
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
				<div class="modal fade" id="${escapeHtml(item.modalId)}" tabindex="-1" aria-labelledby="${escapeHtml(item.modalLabelId)}" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="${escapeHtml(item.modalLabelId)}">${escapeHtml(item.modalTitle)}</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
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
    } catch (error) {
        console.error("Error al cargar contenido dinamico de graffiti:", error);
    }
}

document.addEventListener("DOMContentLoaded", initGraffitiPage);
