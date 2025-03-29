const API_URL = "https://backend-guildmaster.onrender.com";

async function carregarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (!response.ok) throw new Error("Erro ao buscar usuários");

        const usuarios = await response.json();
        console.log("Usuários recebidos:", usuarios);  // Verifique o conteúdo dos dados

        const lista = document.getElementById("usuarios-lista");
        lista.innerHTML = "";  // Limpa a lista antes de adicionar os novos usuários

        usuarios.forEach(user => {
            const item = document.createElement("li");
            item.textContent = `ID: ${user.id} - Login: ${user.login}`;
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar usuários.");
    }
}


async function cadastrarUsuario() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (!login || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            alert("Usuário cadastrado!");
            document.getElementById("login").value = "";
            document.getElementById("password").value = "";
            carregarUsuarios();
        } else {
            throw new Error("Erro ao cadastrar usuário");
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar usuário.");
    }
}

// Carrega os usuários ao abrir a página
carregarUsuarios();
