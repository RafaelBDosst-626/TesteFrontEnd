// ===============================
// ETAPA 0 – Estado inicial
// ===============================
const logo = document.getElementById("logo");
const mascote = document.getElementById("mascote");
const mascoteImg = document.getElementById("mascoteImg");
const chatContainer = document.getElementById("chatContainer");
const loginForm = document.getElementById("loginForm");
const btnLogin = document.getElementById("btnLogin");
const mainSite = document.getElementById("mainSite");
const toggleSenha = document.getElementById("toggleSenha");

// Estado inicial ao carregar a página
mainSite.style.display = "none";
loginForm.style.display = "none";
mascote.style.display = "none";

let logado = false;
let mascoteVisivel = false;

// ===============================
// Função para criar balões de fala (com limite)
// ===============================
function falar(texto) {
  const div = document.createElement("div");
  div.className = "chatBox";
  div.innerText = texto;
  chatContainer.appendChild(div);

  const maxBaloes = 4;
  if (chatContainer.children.length > maxBaloes) {
    const primeiro = chatContainer.firstElementChild;
    primeiro.classList.add("fadeOut");
    primeiro.addEventListener("animationend", () => {
      if (primeiro.parentNode === chatContainer) {
        chatContainer.removeChild(primeiro);
      }
    }, { once: true });
  }
}

// ===============================
// ETAPA 1 – Logo + Balão inicial
// ===============================
const logoHint = document.getElementById("logoHint");
logoHint.innerText = "Clique na logo para iniciar!";

let shakeInterval;
let hintTimeout = setTimeout(() => {
  function startShakeLoop() {
    logoHint.classList.add("shake");
    setTimeout(() => {
      logoHint.classList.remove("shake");
    }, 1500);
  }
  startShakeLoop();
  shakeInterval = setInterval(startShakeLoop, 3500);
}, 10000);

// ===============================
// ETAPA 2 – Mascote ativo
// ===============================
const frasesInatividade = [
  "Ei, estou aqui esperando… clique em mim quando puder, sem pressa… mas lembre-se: tempo é dinheiro!",
  "Você sabia que o mercado de nozes nunca dorme? E eu também não… vamos agilizar isso?",
  "Olha, eu sou um esquilo de negócios. Cada segundo que você demora, uma avelã deixa de ser negociada.",
  "Você acha que avelãs nascem em árvores? Bem… elas nascem. Mas não se colhem sozinhas, sabia?",
  "Estou começando a perder a paciência… minha agenda está cheia, e você me deixa aqui parado.",
  "Chega! Se você não vai clicar, eu mesmo vou me entreter. Já que você tem tempo, vou te contar curiosidades sobre esquilos até você clicar em mim."
];

const curiosidades = [
  "Você sabia que esquilos conseguem encontrar até 80% das nozes que enterram? O resto vira floresta.",
  "Esquilos têm dentes que nunca param de crescer. Por isso estamos sempre roendo algo.",
  "Um esquilo pode saltar até 3 metros de distância.",
  "Esquilos são responsáveis por plantar milhares de árvores sem querer.",
  "Nos Estados Unidos, já houve esquilos que causaram apagões inteiros ao roer cabos de energia.",
  "Existem mais de 200 espécies de esquilos no mundo.",
  "Esquilos comunicam perigo com movimentos da cauda e sons curtos.",
  "Alguns esquilos enganam predadores fingindo enterrar nozes em lugares falsos."
];

let mascoteFrasesTimer;
let tempoInatividade = 0;
let curiosidadeIndex = 0;
let repeticoes = {};

function iniciarEtapa2() {
  logo.style.pointerEvents = "none";
  mascote.style.display = "flex";
  mascote.classList.remove("andando", "fixo");
  void mascote.offsetWidth;
  mascote.classList.add("andando");

  chatContainer.innerHTML = "";
  loginForm.style.display = "none";

  setTimeout(() => {
    mascote.classList.add("fixo");
    falar("Olá! Eu sou seu assistente 🐿️. Clique em mim para iniciar o login.");
    iniciarMonitorInatividade();
  }, 2000);
}

function iniciarMonitorInatividade() {
  tempoInatividade = 0;
  let etapa = 0;

  mascoteFrasesTimer = setInterval(() => {
    tempoInatividade += 10;

    if (tempoInatividade <= 60) {
      falar(frasesInatividade[etapa] || frasesInatividade[frasesInatividade.length - 1]);
      etapa++;
    } else {
      clearInterval(mascoteFrasesTimer);
      iniciarCuriosidades();
    }
  }, 10000);
}

function iniciarCuriosidades() {
  mascoteFrasesTimer = setInterval(() => {
    const frase = curiosidades[curiosidadeIndex];
    repeticoes[frase] = (repeticoes[frase] || 0) + 1;

    if (repeticoes[frase] === 2) {
      falar(frase + " Já te contei isso antes, não contei?");
    } else {
      falar(frase);
    }

    curiosidadeIndex = (curiosidadeIndex + 1) % curiosidades.length;
  }, 10000);
}

mascote.addEventListener("click", () => {
  clearInterval(mascoteFrasesTimer);
  tempoInatividade = 0;

  falar("Beleza! Vou abrir a tela de login...");
  setTimeout(() => {
    chatContainer.innerHTML = "";
    loginForm.style.display = "block";
  }, 1000);
});

// ===============================
// ETAPA 3 – Login e site principal
// ===============================
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

// Toggle de senha
toggleSenha.addEventListener("change", () => {
  if (toggleSenha.checked) {
    mascoteImg.style.filter = "grayscale(100%)";
    falar("Ops, coloquei uma venda! Não consigo ver sua senha agora 😅");
  } else {
    mascoteImg.style.filter = "none";
    falar("Agora consigo ver de novo 👀 (brincadeira!)");
  }
});

// ===============================
// EVENTO PRINCIPAL DA LOGO
// ===============================
logo.addEventListener("click", () => {
  clearTimeout(hintTimeout);
  clearInterval(shakeInterval);
  logoHint.style.display = "none";
  logoHint.classList.remove("shake");

  if (!logado) {
    iniciarEtapa2();
  } else {
    if (!mascoteVisivel) {
      mascote.style.display = "block";
      mascote.classList.remove("andando");
      void mascote.offsetWidth;
      mascote.classList.add("andando");

      chatContainer.innerHTML = "";
      setTimeout(() => {
        falar("Oi de novo! Estou aqui caso precise de mim 🐿️");
      }, 3200);

      mascoteVisivel = true;
    } else {
      falar("Até mais! Vou voltar para a logo 👋");
      mascote.classList.remove("andando", "fixo");
      void mascote.offsetWidth;
      mascote.classList.add("voltando");

      setTimeout(() => {
        mascote.style.display = "none";
        mascote.classList.remove("voltando");
        chatContainer.innerHTML = "";
        mascoteVisivel = false;
      }, 2000);
    }
  }
});
