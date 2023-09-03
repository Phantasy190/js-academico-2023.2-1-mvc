class AlunoControlador {

    constructor() {
        this.alunoServico = new AlunoService();

    }

//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO DE ELEMENTOS HTML NA PÁGINA

    inserirAlunoNoHtml(aluno, elementoDestino) {
        const alunoElemento = document.createElement("li");
        alunoElemento.textContent = `Nome: ${aluno._nome} - Idade: ${aluno.idade}`;
        elementoDestino.appendChild(alunoElemento);
    }

//-=======================================================================================
//2 - MÉTODOS PARA INSERÇÃO E CRIAÇÃO DE OBJETOS NO SISTEMA PARA INTERAÇÃO COM ELEMENTOS HTML

    inserirAluno() {


        const nomeElemento = document.querySelector("#nome");

        const idadeElemento = document.querySelector("#idade");

        const matriculaElemento = document.querySelector("#matricula");

        const mensagemElemento = document.querySelector("#mensagemErro1");

        


        try {

            // criacao do objeto aluno //
            
            const alunoInserido = this.alunoServico.inserirAluno(nomeElemento.value, Number(idadeElemento.value),
                Number(matriculaElemento.value));

            const listaAlunosElemento = document.querySelector("#listaAlunos");

            if (alunoInserido) {
                this.inserirAlunoNoHtml(alunoInserido, listaAlunosElemento);
            }

            this.exibirErro("", mensagemElemento); // Limpa mensagem de erro

        } 
        
        catch (error) {

            this.exibirErro(error.message, mensagemElemento); // Mostra mensagem de erro

        }

        
    }

//-=======================================================================================
//3 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS DO SISTEMA PARA VISUALIZAÇÃO E INTERAÇÃO COM ELEMENTOS HTML

    listarAlunosMenoresIdade() {
        const listaAlunosMenoresElemento = document.querySelector('#listaAlunosMenores');
        const alunosMenores = this.alunoServico.listarAlunosMenoresIdade();
        alunosMenores.forEach(menor => this.inserirAlunoNoHtml(menor, listaAlunosMenoresElemento));
    }

    listarAlunos() {
        const listaAlunosElemento = document.querySelector('#listar_alunos');       
        listaAlunosElemento.innerHTML = '';
        const alunosListados = this.alunoServico.listarAlunos();
        alunosListados.forEach(aluno => this.inserirAlunoNoHtml(aluno, listaAlunosElemento));
    }

//-=======================================================================================
//3 - MÉTODOS DE TRATAMENTOS DE EXCEÇÕES DO SISTEMA 

    exibirErro(mensagem, elementoHTML) {

        elementoHTML.textContent = mensagem;
    }


}
