async function api(url, options = {}) {
    const res = await fetch(url, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
    }

    return res.status === 204 ? null : res.json();
}

function $(id) {
    return document.getElementById(id);
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await checkSession("tipper");
        ladeSpiele();
    } catch (err) {
        console.error("Tippen Fehler:", err);
        location.href = "/";
    }
});

async function ladeSpiele() {
    const spiele = await api("/api/spiele");
    $("spieleSelect").innerHTML = "";

    spiele.forEach(s => {
        const text = `${new Date(s.anstoss).toLocaleString("de-DE")}
        ${s.heimverein} : ${s.gastverein}
        ${s.heimtore}:${s.gasttore} (${s.statuswort})`;

        $("spieleSelect").appendChild(new Option(text, s.id));
    });
}

/*
document.addEventListener("DOMContentLoaded", async () => {
    await checkSession(); // nur Login nötig

    const res = await fetch("/api/spiele", {
        credentials: "include"
    });

    const spiele = await res.json();

    const geplant = spiele.filter(
        s => s.statuswort === "geplant"
    );

    const container = document.getElementById("spiele");

    geplant.forEach(s => {
        const div = document.createElement("div");
        div.innerHTML = `
            <b>${s.heimverein} – ${s.gastverein}</b><br>
            Anstoß: ${new Date(s.anstoss).toLocaleString()}
        `;
        container.appendChild(div);
    });
});

*/