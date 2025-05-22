document.querySelector("#login").addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#contraseña").value.trim();

    if (!email || !password) {
        return Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completá todos los campos.',
        });
    }

    try {
        const data = { email, password };

        const opts = {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        const url = "/api/auth/login";
        const response = await fetch(url, opts);
        const result = await response.json();

        if (!response.ok || !result.response) {
            return Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: result.message || "Credenciales inválidas.",
            });
        }

        localStorage.setItem("token", result.response);

        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            window.location.href = "/";
        });

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: error.message || "Ocurrió un error, intentá nuevamente.",
        });
    }
});

document.querySelector("#togglePassword").addEventListener("click", (e) => {
    const input = document.querySelector("#contraseña");
    const icon = e.currentTarget.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});
