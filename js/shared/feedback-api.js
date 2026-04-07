const FEEDBACK_API_URL = "https://retoolapi.dev/mqTH6t/data";

async function fetchSuggestions() {
    const response = await fetch(FEEDBACK_API_URL, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Error al cargar sugerencias: ${response.status}`);
    }

    return response.json();
}

async function createSuggestion({ nombre, email, sugerencia }) {
    const payload = {
        Nombre: nombre,
        Email: email,
        Sugerencia: sugerencia
    };

    const response = await fetch(FEEDBACK_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Error al enviar sugerencia: ${response.status}`);
    }

    return response.json();
}

function initFeedbackForm() {
    const form = document.getElementById("feedback-form");
    const status = document.getElementById("feedback-status");
    const submitButton = form?.querySelector("button[type='submit']");

    if (!form || !status || !submitButton) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombreInput = document.getElementById("feedback-name");
        const emailInput = document.getElementById("feedback-email");
        const sugerenciaInput = document.getElementById("feedback-message");

        const nombre = nombreInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const sugerencia = sugerenciaInput?.value.trim() || "";

        if (!nombre || !email || !sugerencia) {
            status.textContent = "Completa todos los campos antes de enviar.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
        status.textContent = "";

        try {
            await createSuggestion({ nombre, email, sugerencia });
            status.textContent = "Sugerencia enviada. Gracias por tu aporte.";
            form.reset();
        } catch (error) {
            status.textContent = "No se pudo enviar la sugerencia. Intenta de nuevo.";
            console.error(error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
        }
    });
}

window.feedbackApi = {
    fetchSuggestions,
    createSuggestion
};

document.addEventListener("DOMContentLoaded", initFeedbackForm);
