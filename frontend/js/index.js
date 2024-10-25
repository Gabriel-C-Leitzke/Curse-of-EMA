document.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.href.endsWith("index.html")) {
        trazerCursos();
    }
});

let Cursos = {};
let cursos_editar;

async function trazerCursos() {
    try {
        const response = await fetch("http://localhost:3000/consultar-curso", {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error("Problemas com a tua API, faz direito esse trem aí");
        }
        const data = await response.json();
        console.log("Meus dados da API", data);
        Cursos = data;
        renderizaCursos();
    } catch (error) {
        console.log("Deu erro aqui", error);
    }
}

function renderizaCursos() {
    const tabela = document.getElementById("MeusCursos")?.getElementsByTagName("tbody")[0];
    if (!tabela) {
        throw new Error("A tua tabela não carregou, tua internet não funciona ou teu pc é da xuxa");
    }
    tabela.innerHTML = "";
    Cursos.forEach((cursos) => {
        const row = tabela.insertRow();
        const Cellnome = row.insertCell(0);
        Cellnome.innerHTML = cursos.nome;
        const Cellturno = row.insertCell(1);
        Cellturno.innerHTML = cursos.turno;
        const Celldescricao = row.insertCell(2);
        Celldescricao.innerHTML = cursos.descricao;
    });
}
