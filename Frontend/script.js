const API_URL = "https://localhost:7191/api/auth";

document.addEventListener("DOMContentLoaded", () => {
    // Carregar Tema
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    atualizarIconeTema(savedTheme);

    // Carregar Login
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");
    if (token && nome) exibirHome(nome);
});

function mostrarTela(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function atualizarIconeTema(tema) {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = tema === "dark" ? "fas fa-sun" : "fas fa-moon";
}

document.getElementById('theme-toggle').onclick = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const target = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("theme", target);
    atualizarIconeTema(target);
};

// Funções de API
async function fluxoLogin() {
    const btn = document.getElementById('btn-login');
    const email = document.getElementById('l-email').value;
    const senha = document.getElementById('l-senha').value;

    setLoading(btn, true);
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, nome: "" })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("nome", data.nome);
            exibirHome(data.nome);
        } else {
            alert("E-mail ou senha inválidos.");
        }
    } catch (err) {
        alert("Erro ao conectar no servidor.");
    } finally {
        setLoading(btn, false);
    }
}

async function fluxoRegistrar() {
    const btn = document.getElementById('btn-register');
    const nome = document.getElementById('r-nome').value;
    const email = document.getElementById('r-email').value;
    const senha = document.getElementById('r-senha').value;

    setLoading(btn, true);
    try {
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        if (response.ok) {
            alert("Sucesso! Faça seu login.");
            mostrarTela('view-login');
        } else {
            const msg = await response.text();
            alert(msg);
        }
    } catch (err) {
        alert("Erro no servidor.");
    } finally {
        setLoading(btn, false);
    }
}

async function fluxoRecuperar() {
    const btn = document.getElementById('btn-forgot');
    const email = document.getElementById('f-email').value;
    const senha = document.getElementById('f-senha').value;

    setLoading(btn, true);
    try {
        const response = await fetch(`${API_URL}/recuperar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha, nome: "" })
        });

        if (response.ok) {
            alert("Senha atualizada!");
            mostrarTela('view-login');
        } else {
            alert("E-mail não encontrado.");
        }
    } catch (err) {
        alert("Erro na conexão.");
    } finally {
        setLoading(btn, false);
    }
}

function setLoading(btn, state) {
    state ? btn.classList.add('loading') : btn.classList.remove('loading');
    btn.disabled = state;
}

function exibirHome(nome) {
    mostrarTela('view-home');
    document.getElementById('welcome-text').innerText = `Bem-vindo, ${nome}!`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    location.reload();
}