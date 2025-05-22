const nombreInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const avatarInput = document.querySelector("#avatar");
const passInput = document.querySelector("#contraseña");
const repeatPassInput = document.querySelector("#repetirContraseña");
const btnRegister = document.querySelector("#btnRegistrarse");
const botonesOjo = document.querySelectorAll(".btnContra");

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

function validarInput(input, esValido) {
    input.classList.remove("borderWhite", "dangerInput", "successInput");
    input.classList.add(esValido ? "successInput" : "dangerInput");
}

function validarNombre() {
    const value = nombreInput.value.trim();
    const valido = value.length >= 3 && regexNombre.test(value);
    validarInput(nombreInput, valido);
    return valido;
}

function validarEmail() {
    const value = emailInput.value.trim();
    const valido = regexEmail.test(value);
    validarInput(emailInput, valido);
    return valido;
}

function validarAvatar() {
    const value = avatarInput.value.trim();
    const valido = value.length >= 3;
    validarInput(avatarInput, valido);
    return valido;
}

function validarPassword() {
    const value = passInput.value.trim();
    const valido = regexPassword.test(value);
    validarInput(passInput, valido);
    return valido;
}

function validarRepeatPassword() {
    const value = repeatPassInput.value.trim();
    const valido = value === passInput.value.trim();
    validarInput(repeatPassInput, valido);
    return valido;
}

nombreInput.addEventListener("input", validarNombre);
emailInput.addEventListener("input", validarEmail);
avatarInput.addEventListener("input", validarAvatar);
passInput.addEventListener("input", validarPassword);
repeatPassInput.addEventListener("input", validarRepeatPassword);

botonesOjo.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const container = btn.closest(".cInputRegister");
        const input = container.querySelector("input");

        if (input.type === "password") {
            input.type = "text";
            btn.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
        } else {
            input.type = "password";
            btn.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        }
    });
});


btnRegister.addEventListener("click", async (e) => {
    e.preventDefault();

    const esNombreValido = validarNombre();
    const esEmailValido = validarEmail();
    const esAvatarValido = validarAvatar();
    const esPassValido = validarPassword();
    const esRepeatPassValido = validarRepeatPassword();

    if (esNombreValido && esEmailValido && esPassValido && esRepeatPassValido) {
        try {
            const data = {
                nickname: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                avatar: avatarInput.value.trim(),
                password: passInput.value.trim()
            };

            const response = await fetch("/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Registro con éxito",
                    text: "¡Bienvenido a la veterinaria!",
                }).then(() => {
                    document.querySelector(".formRegister").reset();
                    [nombreInput, emailInput, avatarInput, passInput, repeatPassInput].forEach(input => {
                        input.classList.remove("successInput", "dangerInput");
                        input.classList.add("borderWhite");
                    });

                    window.location.href = "/";
                });
            } else {
                throw new Error(result.message || "Error en el registro");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error en el registro",
                text: error.message,
            });
        }
    } else {
        Swal.fire({
            icon: "warning",
            title: "Campos inválidos",
            text: "Por favor completa correctamente todos los campos requeridos.",
        });
    }
});