const findProfile = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return Swal.fire({
                icon: "error",
                title: "Token no encontrado",
                text: "Debes iniciar sesión primero.",
            });
        }

        const opts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const url = "/api/auth/me";
        let response = await fetch(url, opts);
        response = await response.json();

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.error,
            });
        } else {
            document.querySelector("#imgProfile").src = response.response.avatar;
            document.querySelector("#nicknameProfile").innerHTML = response.response.nickname;
            document.querySelector("#emailProfile").innerHTML = response.response.email;
        }

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error inesperado",
            text: "Hubo un problema al obtener los datos del usuario.",
        });
    }
};

findProfile();