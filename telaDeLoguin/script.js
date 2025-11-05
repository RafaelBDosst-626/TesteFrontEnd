const logo = document.getElementById("logo");
const mascote = document.getElementById("mascote");
const mascoteImg = document.getElementById("mascoteImg");
const chatBox = document.getElementById("chatBox");
const loginForm = document.getElementById("loginForm");
const btnLogin = document.getElementById("btnLogin");
const mainSite = document.getElementById("mainSite");
const toggleSenha = document.getElementById("toggleSenha");

function falar(msg) {
  chatBox.innerHTML = `<div class="chat">${msg}</div>`;
}

let logado = false;
let mascoteVisivel = false;

logo.addEventListener("click", () => {
  if (!logado) {
    // fluxo normal de login
    mascote.style.display = "block";
    mascote.classList.remove("andando");
    void mascote.offsetWidth;
    mascote.classList.add("andando");

    chatBox.innerHTML = "";
    loginForm.style.display = "none";

    setTimeout(() => {
      falar("Olá! Eu sou seu assistente 🐿️. Vamos fazer login?");
      loginForm.style.display = "block";
    }, 3200);
  } else {
    // já logado: toggle
    if (!mascoteVisivel) {
      mascote.style.display = "block";
      mascote.classList.remove("andando");
      void mascote.offsetWidth;
      mascote.classList.add("andando");

      chatBox.innerHTML = "";
      setTimeout(() => {
        falar("Oi de novo! Estou aqui caso precise de mim 🐿️");
      }, 3200);

      mascoteVisivel = true;
    } else {
      // despedida com animação de volta
      falar("Até mais! Vou voltar para a logo 👋");
      mascote.classList.remove("andando");
      void mascote.offsetWidth;
      mascote.classList.add("voltando");

      setTimeout(() => {
        mascote.style.display = "none";
        mascote.classList.remove("voltando");
        chatBox.innerHTML = "";
        mascoteVisivel = false;
      }, 2000);
    }
  }
});

btnLogin.addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  if (!nome || !senha) {
    falar("Você precisa preencher todos os campos!");
  } else {
    falar("Login realizado com sucesso! 🎉");
    setTimeout(() => {
      mascote.style.display = "none";
      loginForm.style.display = "none";
      mainSite.style.display = "block";
      logado = true;
      mascoteVisivel = false;
    }, 1500);
  }
});


toggleSenha.addEventListener("change", () => {
  if (toggleSenha.checked) {
    mascoteImg.style.filter = "grayscale(100%)";
    falar("Ops, coloquei uma venda! Não consigo ver sua senha agora 😅");
  } else {
    mascoteImg.style.filter = "none";
    falar("Agora consigo ver de novo 👀 (brincadeira!)");
  }
});
