// Phones get the native share sheet; elsewhere, the network buttons show.
for (const bar of document.querySelectorAll<HTMLElement>(".share")) {
    const url = bar.dataset.url ?? "";
    const text = bar.dataset.text ?? "";

    const nativeBtn = bar.querySelector<HTMLButtonElement>(".share-native");
    const phone = !!navigator.share && matchMedia("(pointer: coarse)").matches;
    if (phone && nativeBtn) {
        nativeBtn.hidden = false;
        nativeBtn.addEventListener("click", () => {
            navigator.share({ title: document.title, text, url }).catch(() => {});
        });
    }

    const wa = bar.querySelector<HTMLAnchorElement>(".share-wa");
    if (wa) {
        wa.href = "https://wa.me/?text=" + encodeURIComponent(`${text} ${url}`);
        wa.hidden = phone;
    }

    const li = bar.querySelector<HTMLAnchorElement>(".share-li");
    if (li) {
        li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
        li.hidden = phone;
    }

    const copy = bar.querySelector<HTMLButtonElement>(".share-copy");
    if (copy) {
        const label = copy.textContent ?? "";
        copy.addEventListener("click", () => {
            navigator.clipboard.writeText(url).then(() => {
                copy.textContent = copy.dataset.copied ?? label;
                setTimeout(() => { copy.textContent = label; }, 2000);
            });
        });
    }
}
