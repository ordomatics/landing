// A form with an endpoint posts there; if that fails, or there is none, the message goes through the visitor's mail app.
for (const form of document.querySelectorAll<HTMLFormElement>("form[data-mailto]")) {
    const status = form.querySelector<HTMLElement>(".status");
    const button = form.querySelector<HTMLButtonElement>("button[type=submit]");

    const mailto = () => {
        const lines: string[] = [];
        for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[name]")) {
            if ((el instanceof HTMLInputElement && el.type === "radio" && !el.checked) || el.name === "website") {
                continue;
            }
            if (el.value.trim()) {
                lines.push(`${el.dataset.label}: ${el.value.trim()}`);
            }
        }
        const subject = encodeURIComponent(form.dataset.subject ?? "");
        window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${encodeURIComponent(lines.join("\n\n"))}`;
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const endpoint = form.dataset.endpoint;
        if (!endpoint) {
            mailto();
            return;
        }
        if (button) {
            button.disabled = true;
        }
        try {
            const response = await fetch(endpoint, { method: "POST", body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>) });
            if (!response.ok || !(await response.json()).ok) {
                throw new Error(String(response.status));
            }
            if (status) {
                status.textContent = form.dataset.sent ?? "";
            }
            form.reset();
        } catch {
            if (status) {
                status.textContent = form.dataset.failed ?? "";
            }
            if (button) {
                button.disabled = false;
            }
            mailto();
        }
    });
}
