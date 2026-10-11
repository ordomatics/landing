// Turns a form into an email: the site is static, so the message goes through the visitor's mail app.
for (const form of document.querySelectorAll<HTMLFormElement>("form[data-mailto]")) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const lines: string[] = [];
        for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[name]")) {
            if (el instanceof HTMLInputElement && el.type === "radio" && !el.checked) {
                continue;
            }
            if (el.value.trim()) {
                lines.push(`${el.dataset.label}: ${el.value.trim()}`);
            }
        }
        const subject = encodeURIComponent(form.dataset.subject ?? "");
        window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${encodeURIComponent(lines.join("\n\n"))}`;
    });
}
