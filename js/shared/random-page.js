const RANDOM_PAGE_FILES = [
    "aero.html",
    "comic.html",
    "cyberpunk.html",
    "eighty.html",
    "graffiti.html",
    "grecia.html",
    "impresionism.html",
    "pixel.html",
    "retroFuture.html",
    "ukiyoe.html"
];

function getPagesBasePath() {
    const fromMenu = document.querySelector('.menu a[href*="content/pages/"]');
    if (fromMenu) {
        const href = fromMenu.getAttribute("href") || "";
        return href.replace(/[^/]*$/, "");
    }

    return "../pages/";
}

function getRandomPagePath() {
    if (!RANDOM_PAGE_FILES.length) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * RANDOM_PAGE_FILES.length);
    const basePath = getPagesBasePath();
    return `${basePath}${RANDOM_PAGE_FILES[randomIndex]}`;
}

function navigateToRandomPage(event) {
    event.preventDefault();

    const randomPath = getRandomPagePath();
    if (!randomPath) {
        return;
    }

    window.location.href = randomPath;
}

function initRandomButtons() {
    const randomLink = document.getElementById("random-page-link");
    if (!randomLink) {
        return;
    }

    randomLink.addEventListener("click", navigateToRandomPage);
}

document.addEventListener("DOMContentLoaded", initRandomButtons);