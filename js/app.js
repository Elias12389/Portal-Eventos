const linksMenu = document.querySelectorAll("nav a[data-view]");
const telas = document.querySelectorAll(".tela");

//Definindo quando a tela vai ser mostrada
function alterarTela(nomeDaTela) {
  telas.forEach((tela) => {
    if (tela.id === nomeDaTela) {
      tela.classList.add("ativa");
    } else {
      tela.classList.remove("ativa");
    }
  });
}

//Fazendo a navegação com links
linksMenu.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const viewAlvo = this.dataset.view;
    alterarTela(viewAlvo);
  });
});

alterarTela("dashboard");

//Criando a lista de objetos para servir de base
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

//Pegando o id do formulario
const formulario = document.getElementById("cadastroEventos");

//Função princiapl que faz rodar toda a parte de cadastro e de eventos
function renderizarEventos() {
  const container = document.getElementById("containerEventos");
  if (!container) return;

  container.innerHTML = "";

  //para cada evento, crie um card
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
    //Somando aos cards
    container.appendChild(card);
  });
}

//Para fazer o submit dos dados do formulário
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

//Pegando o ID da div para fazer o dashboard
let dashboard = document.querySelector("#dashboard");
dashboard.innerHTML = `
  <div class="card" style="width: 13rem;">
    <div class="card-body text-center">
      <h5 class="card-title">Total de eventos</h5>
      <p class="card-text">${eventos.length}</p>
    </div>
  </div>
`;
