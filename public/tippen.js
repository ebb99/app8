document.addEventListener("DOMContentLoaded", async () => {
    try {
        await checkSession(); // nur Login nötig

        const res = await fetch("/api/spiele", {
            credentials: "include"
        });

        if (!res.ok) throw new Error("Spiele konnten nicht geladen werden");

        const spiele = await res.json();

        const geplant = spiele.filter(s => s.statuswort === "geplant");
        const container = document.getElementById("spiele");
        container.innerHTML = "";

        geplant.forEach(s => {
            const div = document.createElement("div");
            div.innerHTML = `
                <b>${s.heimverein} – ${s.gastverein}</b><br>
                Anstoß: ${new Date(s.anstoss).toLocaleString()}
            `;
            container.appendChild(div);
        });

    } catch (err) {
        console.error("Tippen Fehler:", err);
    }
});
