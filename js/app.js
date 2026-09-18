const linksMenu = document.querySelectorAll("nav a[data-view]");
const telas = document.querySelectorAll(".tela");

function alterarTela(nomeDaTela) {
  telas.forEach((tela) => {
    if (tela.id === nomeDaTela) {
      tela.classList.add("ativa");
    } else {
      tela.classList.remove("ativa");
    }
  });
}

linksMenu.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const viewAlvo = this.dataset.view;
    alterarTela(viewAlvo);
  });
});

alterarTela("dashboard");

const eventos = [
  {
    id: 1,
    titulo: "Workshop de Git e GitHub",
    tipo: "Workshop",
    data: "2026-09-25",
    local: "Laboratório 2",
    descricao: "Atividade prática sobre versionamento.",
    status: "Agendado",
  },
  {
    id: 2,
    titulo: "Workshop de HTML, CSS e JS",
    tipo: "Workshop",
    data: "2026-10-25",
    local: "Laboratório 1",
    descricao: "Palestra sobre o uso de HTML, CSS e JS",
    status: "Agendado",
  },
  {
    id: 3,
    titulo: "Curso de PowerBI",
    tipo: "Minicurso",
    data: "2026-12-25",
    local: "Laboratório 3",
    descricao: "Aula teórica sobre PowerBI",
    status: "Agendado",
  },
];

const formulario = document.getElementById("cadastroEventos");

function renderizarEventos() {
  const container = document.getElementById("containerEventos");
  if (!container) return;

  container.innerHTML = "";

  eventos.forEach((evento) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${evento.titulo}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${evento.tipo}</h6>
        <p class="card-text">${evento.descricao}</p>
        <p class="card-text"><small class="text-muted">Local: ${evento.local}</small></p>
        <p class="card-text"><small class="text-muted">Data: ${evento.data}</small></p>
        <span class="badge bg-primary">${evento.status}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputTitulo = document.getElementById("titulo").value.trim();
  const inputTipo = document.getElementById("tipo").value.trim();
  const inputData = document.getElementById("data").value;
  const inputLocal = document.getElementById("local").value.trim();
  const inputDescricao = document.getElementById("descricao").value.trim();

  const novoObjeto = {
    id: Date.now(),
    titulo: inputTitulo,
    tipo: inputTipo,
    data: inputData,
    local: inputLocal,
    descricao: inputDescricao,
    status: "Agendado",
  };

  eventos.push(novoObjeto);

  alert("Lista de eventos atualizada");

  formulario.reset();
  renderizarEventos();
});

renderizarEventos();
