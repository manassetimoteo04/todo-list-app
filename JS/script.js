"use strict";

// SELECIONANDO ELEMENTOS DOM
const btnCreate = document.querySelector(".create-btn");
const btnLogin = document.querySelectorAll(".login-btn");
const btnLogOut = document.querySelector(".logout-btn");

const labelTasksNumber = document.querySelector(".task-number");
const labelWelcome = document.querySelector(".welcome-label");

const inputUsernameLogin = document.querySelector(".username-login");
const inputPasswordLogin = document.querySelector(".password-login");

const inputNameCreate = document.querySelector(".fullname-create");
const inputUserNameCreate = document.querySelector(".username-create");
const inputPasswordCreate = document.querySelector(".password-create");

const inputAddTaskName = document.querySelector(".input-add-task-name");
const inputAddTaskDes = document.querySelector(".input-add-task");
const selectPriority = document.querySelector(".select-priority");

const labelTotal = document.querySelector(".label-total");
const labelConcluido = document.querySelector(".label-concluido");
const labelProgress = document.querySelector(".label-progresso");

const taskContainer = document.querySelector(".tasks-container");
const tasksEl = document.querySelectorAll(".task");
const btnAllConclude = document.querySelectorAll(".task-finished");
const btnAllDelete = document.querySelectorAll(".task-delete");
const concludeLabel = document.querySelectorAll(".conclude-span");
const deletLabel = document.querySelectorAll(".delete-span");

const app = document.querySelector(".app");
const form = document.querySelector(".form");
const loginApp = document.querySelector(".login-app");
const createApp = document.querySelector(".create-app");

const btnAddTask = document.querySelector(".add-task-btn");
const createSwitch = document.querySelector(".btn-create-account");
const loginSwitch = document.querySelector(".btn-login-account");

const empty = document.querySelector(".empty-box");
const sortEl = document.querySelector(".btn-sort");
const displayAddBtn = document.querySelector(".displayAdd");

const sectionSeeAll = document.querySelector(".see-all-task");
const btnEditTask = document.querySelector(".btn-edit");
const blured = document.querySelector(".blured");
const seeAllDEl = document.querySelector(".div-all");
const editDivEl = document.querySelector(".edit-task");

const btnEdited = document.querySelector(".btn-edited");
const newTitle = document.querySelector(".edit-input-title");
const newDesc = document.querySelector(".edit-input-descriptions");
const newSelect = document.querySelector(".edit-priority");
/****************************************** */
//CRIANDO FUNÇÕES
/******************************************* */

//CONTA N  -  01 PRESCRITA
app.classList.add("hidden");
const account1 = {
  name: "Timóteo",
  username: "mt",
  password: "manasse",
  allTasks: [
    {
      title: "AVALIAÇÃO DE PROVAS",
      description: "Lorem ipsum dolor sit amet consectetur",
      priority: "Média",
      dates:
        "Thu Mar 14 2024 22:04:22 GMT+0100 (Horário Padrão da África Ocidental)",
    },
  ],
};
let accounts = localStorage.getItem("accounts")
  ? JSON.parse(localStorage.getItem("accounts"))
  : [];

// let accounts = [];
// Função para salvar as contas no localStorage
function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// ALTERANDO ENTRE INICIAR SEESÃO E CRIAR CONTA
createApp.classList.add("display-none");
loginApp.classList.remove("display-none");
createSwitch.addEventListener("click", function (e) {
  e.preventDefault();
  createApp.classList.remove("display-none");
  loginApp.classList.add("display-none");
  inputPasswordLogin.value = inputUsernameLogin.value = "";
});

displayAddBtn.classList.add("hidden");
loginSwitch.addEventListener("click", function (e) {
  e.preventDefault();
  createApp.classList.add("display-none");
  loginApp.classList.remove("display-none");
  inputNameCreate.value =
    inputUserNameCreate.value =
    inputPasswordCreate.value =
      "";
});

//CRIANDO CONTA NOVA & ADICIONAR O NOVO USUÁRIO NA ERRAY CONTAS

btnLogOut.classList.add("hidden");
btnCreate.addEventListener("click", function (e) {
  e.preventDefault();
  const fullname = inputNameCreate.value;
  const username = inputUserNameCreate.value;
  const password = inputPasswordCreate.value;

  if (accounts.find((account) => account.username === username)) {
    alert("Este usuário já existe");
  } else if (fullname && username && password) {
    const account = {
      name: fullname,
      username: username,
      password: password,
      allTasks: [],
      taskConcluded: 0,
      taskProgress: 0,
    };
    accounts.push(account);
    saveAccounts();
    alert("Conta criada com sucesso");
    createApp.classList.add("display-none");
    loginApp.classList.remove("display-none");
    inputNameCreate.value =
      inputUserNameCreate.value =
      inputPasswordCreate.value =
        "";
  } else {
    alert("Credenciais enválidos");
  }
});

// VALIDANDO O LOGIN DO USUÁRIO
let currentAccount;
btnLogin.forEach(function (btnLogin) {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    const loginPassword = inputPasswordLogin.value;
    const loginUsername = inputUsernameLogin.value;
    currentAccount = accounts.find(
      (account) => account.username === loginUsername
    );
    // console.log(currentAccount);
    if (
      loginPassword === currentAccount?.password &&
      loginUsername === currentAccount?.username
    ) {
      app.classList.remove("hidden");
      loginApp.classList.add("hidden");
      inputPasswordLogin.value = inputUsernameLogin.value = "";
      displayTasks(currentAccount);
      displaySummary(currentAccount);
      btnLogOut.classList.remove("hidden");
      const login = document.querySelector(".login-header");
      // login.classList.add("hidden");
      document.querySelector(".welcome").textContent = `Bem-vindo de volta, ${
        currentAccount.name.split(" ")[0]
      }`;
      displayAddBtn.classList.remove("hidden");

      // btnLogOut.textContent = "Terminar Sessão";
      // btnLogOut.classList.remove();
    } else {
      alert("Credencias errada, tente novamente");
    }
  });
});

// FUNÇÃO PARA FORMATAR DATA COM BASE NA DATA ACTUAL
const formatDate = function (date) {
  const calDaysFuntion = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const displayDays = calDaysFuntion(new Date(), date);
  if (displayDays === 0) return `Hoje`;
  if (displayDays === 1) return `Ontem`;
  if (displayDays <= 7) return ` Há ${displayDays} dias`;
  return new Intl.DateTimeFormat("pt-PT").format(date);
};

// FUNÇÃO PARA MOSTRAR O SUMÁRIO DE TAREFAS CONCLUIDAS, EM PROGRESSO E TOTAL
const displaySummary = function (acc) {
  const toTask = acc.allTasks.length;
  let progress = 0;
  toTask >= 0
    ? (labelTotal.textContent = `${toTask}`.padStart(2, 0))
    : (labelTotal.textContent = `0`.padStart(2, 0));

  if (progress >= 0) {
    progress = acc.taskProgress;
  } else {
    progress = 0;
    // labelProgress.textContent = `${progress}`.padStart(2, 0)
  }
  labelProgress.textContent = `${progress}`.padStart(2, 0);
  labelConcluido.textContent = `${currentAccount.taskConcluded}`.padStart(2, 0);
};
// console.log(accounts, currentAccount);

// FUNÇÃO PARA EXIBIR TAREFAS E GERAR NOVO CÓDIGO HTML
// FUNÇÃO PARA MOSTRAR TAREFAS
const displayTasks = function (acc, sort = false) {
  taskContainer.innerHTML = "";
  // const arr = [];
  // if (acc.allTasks.length === 0) {
  //   empty.classList.add("hidden");
  // } else {
  //   empty.classList.remove("hidden");
  // }

  console.log(acc.allTasks.slice().sort());

  sort = sort ? acc.allTasks.slice().sort() : acc.allTasks;
  sort.forEach(function (task, i) {
    let type, numType, conType;
    // CONDIÇÃO PARA MOSTRAR A PRIORIDADE COM BASE A SELEÇÃO DO USUÁRIO
    if (task.priority === "Alta") {
      numType = "taskNumHigh";
      conType = "taskConHigh";
      type = "high";
    } else if (task.priority === "Média") {
      numType = "taskNumMedium";
      conType = "taskConMedium";
      type = "medium";
    } else if (task.priority === "Baixa") {
      numType = "taskNumLow";
      conType = "taskConLow";
      type = "low";
    }
    const now = new Date(acc.allTasks[i].dates);
    const displayDate = formatDate(now, "pt-AO");

    // CONDIÇÃO PARA VERIFICAR SE A TAREFA ESTÁ MARCADA COMO CONCLUIDA
    let concludeConditions = acc.allTasks[i].concluded ? "concluded" : " ";
    // CÓDIGO HTML GERADO AUTOMATICAMENTE PELO JAVASCRIPT

    // checkmark-done-circle-outline
    let html = ` <div class="task ${concludeConditions}">
        <span class="task-number ${numType}">${i + 1}</span>
        <div class="task-container ${conType}">
           <header class="task-header"><span>${
             task.title
           }</span> <span class="task-date">${displayDate}</span>
           </header>
           <div class="task-contents">

              <div class="tesk-content">
                 <p class="task-text">${task.description}</p>
              </div>
              <div>
                 <span class="priority-${type}">${task.priority}</span>
              </div>
              <div class="mark-parent"> 
                        
                        <div class="marcar">
                           <button class="task-finished"> 
                                 <ion-icon name="checkmark-circle${
                                   acc.allTasks[i].concluded ? "" : "-outline"
                                 }"></ion-icon>
                                 </button>
                           <button class="task-delete"><ion-icon name="trash-outline" </ion-icon><span class="delete-span"></span></button>
                        </div>
                     </div>
           </div>
        </div>
      </div>`;
    // task.html = html;
    // <span class="conclude-span">${
    //   acc.allTasks[i].concluded
    //     ? "Concluida"
    // <ion-icon name="ellipsis-horizontal-circle-outline" class="setts"></ion-icon>
    //     : "Concluir"
    // }</span>

    taskContainer.insertAdjacentHTML("afterbegin", html);
    displaySummary(acc);
  });
};

// ADICIONAR TAREFAS NOVAS
let task;
labelConcluido.textContent = `0`.padStart(2, 0);
labelTotal.textContent = `0`.padStart(2, 0);
labelProgress.textContent = `0`.padStart(2, 0);

btnAddTask.addEventListener("click", function (e) {
  e.preventDefault();
  task = {};
  const taskTitle = inputAddTaskName.value;
  const taskDesc = inputAddTaskDes.value;
  const prioritys = selectPriority.value;
  // VERIFICAR SE TASKTITLE & TASKDESCRIPTION 6 PRIORITY = TRUE
  if (taskTitle && taskDesc && prioritys) {
    task.title = taskTitle;
    task.description = taskDesc;
    task.priority = prioritys;
    task.dates = new Date().toISOString();
    task.concluded = false;
    currentAccount.allTasks.push(task);
    currentAccount.taskProgress++;
    saveAccounts();
    setTimeout(function () {
      displayTasks(currentAccount);
    }, 500);
    inputAddTaskName.value = inputAddTaskDes.value = selectPriority.value = "";
    form.classList.toggle("show");
    taskContainer.classList.toggle("task-blur");
  } else {
    alert("Preencha todos os campos para adicionar tarefa nova");
  }
});

// MARCAR TAREFAS COMO CONCLUIDA
taskContainer.addEventListener("click", function (e) {
  const target = e.target.closest(".task-finished");
  if (!target) return; //

  const task = target.closest(".task");
  // const title = e.target.closest(".task-header");
  const taskArr = [...task.parentNode.children].reverse();
  const index = taskArr.indexOf(task);
  const concludeSpan = task.querySelector(".conclude-span");
  currentAccount.style = "";

  if (!task.classList.contains("concluded")) {
    // CONDIÇÃO PARA VERIFICAR SE O ALLTASKS CONCLUDED É IGUAL A FALSE
    if (currentAccount.allTasks[index].concluded === false) {
      // concludeSpan.textContent = "Concluído";
      task.status = "Concluído";
      currentAccount.allTasks[index].concluded = true;

      // VERIFICAR SE CURRENT ACCOUNT TASK CONCLUDED É MENOR QUE O TAMANHO DO ARRAY ALLTASKS
      if (
        currentAccount.taskConcluded < currentAccount.allTasks.length &&
        !currentAccount.allTasks[index].taskConcluded
      ) {
        currentAccount.taskConcluded++;
      }
      // VERIFICAR SE O TASK PROGRESS É MENOR OU IGUAL A 1
      if (currentAccount.taskProgress >= 1) {
        currentAccount.taskProgress--;
      }
      // saveAccounts();
    } else {
      // VERIFICAR SE O TASK CONCLUDED É MAIOR QUE ZERO E SUBTRAIR
      // saveAccounts();
    }
  } else {
    // console.log(currentAccount.allTasks[index].concluded);
    currentAccount.allTasks[index].concluded =
      !currentAccount.allTasks[index].concluded;
    currentAccount.taskProgress++;
    if (currentAccount.taskConcluded > 0) {
      currentAccount.taskConcluded--;
    }
    displaySummary(currentAccount);
  }
  displaySummary(currentAccount);
  // task.style.backgroundColor = currentAccount.allTasks[index].displayBgColor();
  displayTasks(currentAccount);
  saveAccounts();
  console.log(currentAccount.allTasks[index].concluded);
});

// FUNÇÃO PARA ELIMINAR TAREFAS

taskContainer.addEventListener("click", function (e) {
  form.classList.remove("show");

  const target = e.target.closest(".task-delete");
  if (!target) return; //

  const task = target.closest(".task");
  const taskArr = [...task.parentNode.children].reverse();
  const index = taskArr.indexOf(task);

  console.log("Eliminad0");
  if (index !== -1) {
    currentAccount.allTasks.splice(index, 1);
    if (task.classList.contains("concluded")) {
      currentAccount.taskConcluded--;
    } else {
      if (currentAccount.taskProgress > 0) currentAccount.taskProgress--;
    }
  }

  displayTasks(currentAccount);
  displaySummary(currentAccount);
  saveAccounts();
});

blured.addEventListener("click", function (e) {
  e.preventDefault();
  sectionSeeAll.classList.add("hidden");
});

let index;
taskContainer.addEventListener("click", function (e) {
  const task = e.target.closest(".task");
  if (!task) return;
  index = [...task.parentNode.children].reverse().indexOf(task);
  // const index = taskArr.indexOf(task);
  editDivEl.classList.add("display-none");
  seeAllDEl.classList.remove("display-none");
  sectionSeeAll.classList.remove("hidden");
  const acDate = new Date(currentAccount.allTasks[index].dates);
  const date = new Intl.DateTimeFormat("pt-PT").format(acDate);
  // labelWelcome.textContent = date;
  document.querySelector(".task-see-date").textContent = date;
  document.querySelector(".task-see-header").textContent =
    currentAccount.allTasks[index].title;
  document.querySelector(".task-see-text").textContent =
    currentAccount.allTasks[index].description;
  document.querySelector(".see-task-status").textContent = currentAccount
    .allTasks[index].concluded
    ? "Conluida"
    : "Em progresso";
  console.log(currentAccount.allTasks[index]);
});
console.log(index);
// BOTÃO PARA CLASSIFICAR AS TAREFAS
// let sorted = false;
// let newArr = [1, 2, 3, 4, 5];
// sortEl.addEventListener("click", function (e) {
//   e.preventDefault();
//   // alert("clicado");
//   displayTasks(currentAccount, !sorted);

//   sorted = !sorted;
//   // if (!sorted) {
//   //   sor = newArr.slice().sort((a, b) => a - b);
//   //   sorted = !sorted;
//   // } else {
//   //   sor = newArr;
//   // }
//   // console.log(sor);
// });
// TERMINAR SESSÃO E MARCAR O UI COMO HIDDEN E O LOGIN COMO BLOCK
const loginHeader = document.querySelector(".login-header");
btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  app.classList.add("hidden");
  loginApp.classList.remove("hidden");
  taskContainer.innerHTML = "";
  document.querySelector(".welcome").textContent = "Inicie Sessão para começar";
  btnLogOut.classList.add("hidden");
});
// app.addEventListener("click", function (e) {
//   e.preventDefault();
//   form.classList.toggle("show");
// });

displayAddBtn.addEventListener("click", function (e) {
  e.preventDefault();
  form.classList.toggle("show");
  editDivEl.classList.toggle("display-none");
  seeAllDEl.classList.toggle("display-none");
});
// const closeSee = document.querySelector(".btn-close-see");
// closeSee.ddEventListener("click", function (e) {
//   e.preventDefault();
//   sectionSeeAll.classList.add("hidden");
// });

btnEditTask.addEventListener("click", function (e) {
  e.preventDefault();
  // alert("ola");
  editDivEl.classList.toggle("display-none");
  seeAllDEl.classList.toggle("display-none");
  const title = newTitle.value;
  const description = newDesc.value;
  const selecPri = newSelect.value;
  newTitle.value = currentAccount.allTasks[index].title;
  newDesc.value = currentAccount.allTasks[index].description;
  newSelect.value = currentAccount.allTasks[index].priority;
});

btnEdited.addEventListener("click", function (e) {
  e.preventDefault();
  // alert("");
  const title = newTitle.value;
  const description = newDesc.value;
  const selecPri = newSelect.value;

  if (title && description && selecPri) {
    currentAccount.allTasks[index].title = title;
    currentAccount.allTasks[index].description = description;
    currentAccount.allTasks[index].priority = selecPri;
    console.log(index);
    saveAccounts();
    displayTasks(currentAccount);
    editDivEl.classList.toggle("display-none");
    seeAllDEl.classList.toggle("display-none");
    sectionSeeAll.classList.add("hidden");
  } else if (!title || !description || !selecPri) {
    alert("Preencha todos os campos");
  }
  // currentAccount.allTasks[index].title
});
const btnCloseSee = document.querySelectorAll(".btn-close-see");
btnCloseSee.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    // alert("fechado");
    editDivEl.classList.toggle("display-none");
    seeAllDEl.classList.toggle("display-none");
    sectionSeeAll.classList.add("hidden");
  });
});
