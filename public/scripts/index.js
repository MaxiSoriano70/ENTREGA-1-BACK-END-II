const cargarHeaderUsuario = async () => {
    try {
        const loginBtn = document.getElementById("boton-iniciar-sesion");
        const opcionesUsuario = document.getElementById("opciones-usuario");
        const nombreUsuario = document.getElementById("nombre-usuario");

        const registerBtn = document.getElementById("boton-registrarse");
        const misMascotasBtn = document.getElementById("boton-mis-mascotas");

        const opts = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("/api/auth/me", opts);
        const data = await response.json();
        console.log(data);

        if (response.ok && data.response && data.response.nickname) {
            if (loginBtn) loginBtn.style.display = "none";
            if (registerBtn) registerBtn.style.display = "none";
            if (misMascotasBtn) misMascotasBtn.style.visibility = "visible";
            if (opcionesUsuario) opcionesUsuario.style.visibility = "visible";
            if (nombreUsuario) nombreUsuario.textContent = data.response.nickname;
        } else {
            if (opcionesUsuario) opcionesUsuario.style.visibility = "hidden";
            if (loginBtn) loginBtn.style.display = "inline-block";
            if (registerBtn) registerBtn.style.display = "inline-block";
            if (misMascotasBtn) misMascotasBtn.style.visibility = "hidden";
        }
    } catch (error) {
        console.error("Error al cargar datos del header:", error);
    }
};

document.addEventListener("DOMContentLoaded", cargarHeaderUsuario);
