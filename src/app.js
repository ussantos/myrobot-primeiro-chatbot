const modeButtons = document.querySelectorAll(".mode-button");
const messages = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const promptTitle = document.querySelector("#promptTitle");
const promptText = document.querySelector("#promptText");
const clearButton = document.querySelector("#clearButton");

const prompts = {
  chat: {
    title: "Chatbot educacional",
    text: "Responda como um colega de estudos: explique em linguagem simples e sugira um proximo teste.",
  },
  joke: {
    title: "Gerador de piadas",
    text: "Crie uma piada curta, leve e apropriada para sala de aula usando o tema enviado pelo aluno.",
  },
  story: {
    title: "Criador de historias",
    text: "Transforme a ideia do aluno em uma micro-historia com personagem, problema, virada e final.",
  },
};

let currentMode = "chat";

const starters = [
  "Ola! Escolha um modo e mande uma ideia. Eu vou mostrar uma resposta gerada por regras simples.",
];

function addMessage(role, text) {
  const item = document.createElement("article");
  item.className = `message ${role}`;
  item.innerHTML = `<small>${role === "user" ? "Aluno" : "Bot"}</small><div>${text}</div>`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

function normalize(text) {
  return text.trim().replace(/\s+/g, " ");
}

function keywords(text) {
  return normalize(text)
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 4);
}

function answerChat(text) {
  const terms = keywords(text);
  const focus = terms.length ? terms.join(", ") : "sua pergunta";
  return `Eu entendi que o foco e <strong>${focus}</strong>. Uma boa forma de estudar isso e dividir em tres partes: o que entra, o que o codigo faz e qual resposta aparece. Proximo teste: mude uma palavra da pergunta e compare se a resposta continua fazendo sentido.`;
}

function answerJoke(text) {
  const theme = normalize(text) || "programacao";
  const punchlines = [
    `Por que ${theme} gosta de aula de robotica? Porque sempre encontra um jeito de ligar as ideias.`,
    `O que ${theme} disse para o computador? Calma, eu so preciso de um bom prompt.`,
    `Por que ${theme} virou projeto de IA? Porque tinha muitas perguntas e nenhuma queria ficar sem resposta.`,
  ];
  return punchlines[Math.floor(Math.random() * punchlines.length)];
}

function answerStory(text) {
  const idea = normalize(text) || "um robo curioso";
  return `Em uma tarde de laboratorio, <strong>${idea}</strong> recebeu uma missao: resolver um problema antes do sinal tocar. Primeiro tentou adivinhar, depois fez perguntas melhores e organizou as pistas. Quando percebeu que cada erro mostrava um caminho, encontrou a solucao e apresentou para a turma como um verdadeiro projeto de IA.`;
}

function generateAnswer(text) {
  if (currentMode === "joke") return answerJoke(text);
  if (currentMode === "story") return answerStory(text);
  return answerChat(text);
}

function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  promptTitle.textContent = prompts[mode].title;
  promptText.textContent = prompts[mode].text;
  input.placeholder =
    mode === "joke"
      ? "Digite um tema para a piada"
      : mode === "story"
        ? "Digite uma ideia de historia"
        : "Digite uma pergunta para o chatbot";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = normalize(input.value);
  if (!text) return;
  addMessage("user", text);
  addMessage("bot", generateAnswer(text));
  input.value = "";
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelectorAll("[data-example]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.example;
    input.focus();
  });
});

clearButton.addEventListener("click", () => {
  messages.innerHTML = "";
  starters.forEach((text) => addMessage("bot", text));
});

starters.forEach((text) => addMessage("bot", text));
