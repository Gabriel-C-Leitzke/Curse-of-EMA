function Voltarlogin() {
    window.location = "./login.html"
}

function validarEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]+))$/;
    return regex.test(email);
}

function criarconta() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;
    const email = document.getElementById("email").value; // Obter valor do input de email
    if (username.length >= 4) {

        if (validarEmail(email)) {
            // Se o email for válido, prossiga com a validação de senha e outras ações
            if (password === confirm_password) {
                if (password.length >= 6) {
                    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
                        window.location = "../index.html";
                    } else {
                        alert("Senha deve conter letras maiúsculas, minúsculas e números");
                    }
                } else {
                    alert("Senha deve ter mais que 6 caracteres");
                }
            } else {
                alert("Senhas não coincidem!");
            }
        } else {
            alert("Email inválido!");
        }
    } else {
        alert("Usuário deve conter mais que 4 caracteres")
    }
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    const Nome = document.getElementById("Nome").value;
    const População = document.getElementById("População").value;
    const Estado = document.getElementById("Estado").value;
    const País = document.getElementById("País").value;

    try {
        const successMessage = await addCidade(Nome, População, Estado, País);
        console.log(successMessage); // Optional: Log success message
    } catch (error) {
        console.error("Erro ao cadastrar cidade:", error.message);
        // Display a user-friendly error message based on the error object
    }
}

// Function to add a new cidade
async function addCidade(Nome, População, Estado, País) {
    try {
        const response = await fetch("http://localhost:3000/nova-cidade", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Nome,
                População,
                Estado,
                País,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error("Erro na API: " + errorMessage);
        } else {
            const data = await response.json();
            console.log(data);
            alert(`Parabéns! Você cadastrou a cidade: ${Nome}`);
            limparCampos();
            return "Cidade cadastrada com sucesso!";
        }
    } catch (error) {
        console.error("Erro:", error.message);
        return Promise.reject(error);
    }
}

// Event listener for form submission
const formCriarCidade = document.querySelector(".form-criar-cidade");
formCriarCidade.addEventListener("submit", handleFormSubmit);
