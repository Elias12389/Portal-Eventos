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
//Pegando o container onde os cards vão ser criados
const container = document.getElementById("containerEventos");
//Pegando a div do dashboard
const dashboard = document.querySelector("#dashboard");

//Função principal que faz rodar toda a parte de cadastro e de eventos
function renderizarEventos(filtro = "") {
  container.innerHTML = "";

  //para cada evento, crie um card
  eventos.forEach((evento) => {
    const titulo = evento.titulo.toLowerCase();

    if (!titulo.includes(filtro.toLowerCase())) {
      return;
    }

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
        <div class="d-flex justify-content-between mt-2">
          <span class="badge bg-primary">${evento.status}</span>
          <button class="badge bg-danger btnDelete" data-id="${evento.id}">Excluir</button>
        </div>
      </div>
    `;
    //Somando aos cards
    container.appendChild(card);
  });
}

//Função que atualiza o dashboard com o contador automático
function atualizarDashboard() {
  let eventosAgendados = 0;
  let eventosRealizados = 0;

  eventos.forEach((evento) => {
    if (evento.status === "Agendado") {
      eventosAgendados++;
    }

    if (evento.status === "Realizado") {
      eventosRealizados++;
    }
  });

  dashboard.innerHTML = `
  <h1>Dashboard</h1>
  <p>Todos os nossos eventos, os eventos agendados e os eventos que já ocorreram!</p>
    <div class="d-flex flex-row justify-content-center">
      <div class="card mx-2" style="width: 13rem;">
        <div class="card-body text-center">
          <h5 class="card-title">Total de eventos</h5>
          <p class="card-text">${eventos.length}</p>
        </div>
      </div>
      <div class="card mx-2" style="width: 13rem;">
        <div class="card-body text-center">
          <h5 class="card-title">Eventos Agendados</h5>
          <p class="card-text">${eventosAgendados}</p>
        </div>
      </div>
      <div class="card mx-2" style="width: 13rem;">
        <div class="card-body text-center">
          <h5 class="card-title">Eventos Realizados</h5>
          <p class="card-text">${eventosRealizados}</p>
        </div>
      </div>
    </div>
  `;
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

  //Garante que o contador e os cards sempre fiquem atualizados
  atualizarDashboard();
  renderizarEventos();
});

//Botão de excluir (delegação no container, funciona para todos os cards)
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnDelete")) {
    if (confirm("Deseja apagar mesmo?")) {
      const id = Number(e.target.dataset.id);
      eventos.splice(
        eventos.findIndex((ev) => ev.id === id),
        1,
      );
      renderizarEventos();
      atualizarDashboard();
    }
  }
});

//Fitro do Eventos Cadastrados (no caso o escutador de eventos que faz tudo acontecer)
inputFiltroEvento.addEventListener("input", () => {
  const textoDigitado = inputFiltroEvento.value.trim();

  renderizarEventos(textoDigitado);
});

//Permite que sempre que o site carregue, ele exiba os eventos que já estão marcados
document.addEventListener("DOMContentLoaded", () => {
  atualizarDashboard();
  renderizarEventos();
});
