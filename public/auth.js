async function checkSession(requiredRole = null) {
    const res = await fetch("/api/me", {
        credentials: "include"
    });

    if (!res.ok) {
        window.location.href = "/";
        throw new Error("Nicht eingeloggt");
    }

    const user = await res.json();

    if (requiredRole && user.role !== requiredRole) {
        window.location.href = "/";
        throw new Error("Keine Berechtigung");
    }

    return user;
}
