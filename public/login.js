



document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();

    const body = {
        name: document.getElementById("name").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
        document.getElementById("loginError").textContent =
            data.error || "Login fehlgeschlagen";
        return;
    }

    // 🔀 Rollenabhängiger Redirect
    if (data.role === "admin") {
        window.location.href = "/admin";
    } else {
        window.location.href = "/tippen.html";
    }
});

