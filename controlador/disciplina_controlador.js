class DisciplinaControlador {

    constructor(alunoService) {
        this.disciplinaServico = new DisciplinaService(); 
        this.alunoServico = alunoService;
        
    }

//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO DE ELEMENTOS HTML NA PÁGINA

    inserirDisciplinaNoHtml(disciplina, elementoDestino) {
        const disciplinaElemento = document.createElement("li");
        disciplinaElemento.textContent = `Codigo: ${disciplina.codigo} - Nome da Disciplina: ${disciplina.nome}`;
        elementoDestino.appendChild(disciplinaElemento);
    }

//-=======================================================================================
//2 - MÉTODOS PARA INSERÇÃO E CRIAÇÃO DE OBJETOS NO SISTEMA PARA INTERAÇÃO COM ELEMENTOS HTML

    inserirDisciplina() {

        const codigoElemento = document.querySelector("#codigo");
        const disciplinaElemento = document.querySelector("#disciplina");
        const mensagemElemento = document.querySelector("#mensagemErro2");
   
        try {

            // criacao do objeto disciplina //

            const disciplinaInserida = this.disciplinaServico.inserirDisciplina(Number(codigoElemento.value), disciplinaElemento.value);

            const listaDisciplinasElemento = document.querySelector("#listaDisciplinas");

            if (disciplinaInserida) {
                this.inserirDisciplinaNoHtml(disciplinaInserida, listaDisciplinasElemento);
            }

            this.exibirErro("", mensagemElemento); // Limpa mensagem de erro

        } 

        catch (error) {

            this.exibirErro(error.message, mensagemElemento); // Mostra mensagem de erro

        }

    }

    inserirAlunoNaDisciplina() {

        const codigoDisciplinaElemento = document.querySelector("#codigo_disciplina_aluno");
        const matriculaAlunoElemento = document.querySelector("#matricula_aluno");
        const mensagemElemento = document.querySelector("#mensagemErro5");

        mensagemElemento.innerHTML = '';

        try {

            const disciplina = this.disciplinaServico.pesquisarDisciplinaPorCodigo(Number(codigoDisciplinaElemento.value));
            console.log("objeto disciplina: ", disciplina);

            if (!disciplina) {
                throw new Error('Disciplina não encontrada'); // Error específico para disciplina não encontrada
            }

            const aluno = this.alunoServico.pesquisarAlunoPorMatricula(Number(matriculaAlunoElemento.value));
            if (!aluno) {
                throw new Error('Aluno não encontrado'); // Error específico para aluno não encontrado
            }
          
            this.disciplinaServico.inserirAlunoNaDisciplina(disciplina, aluno);
    
            const respostaInserirAluno = document.querySelector("#respostaInserirAluno");

            respostaInserirAluno.innerHTML = `
                <p>Aluno inserido na disciplina:</p>
                <p>Nome da Disciplina: ${disciplina._nome}</p>
                <p>Código da Disciplina: ${disciplina._codigo}</p>
                <p>Alunos Matriculados:</p>
                <ul>
                    ${disciplina._alunos.map(aluno => `<li>${aluno._nome}</li>`).join('')}
                </ul>
            `;

            this.exibirErro("", mensagemElemento)

        } catch (error) {
            this.exibirErro(error.message, mensagemElemento);
        }
    }

//-=======================================================================================
//3 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS DO SISTEMA PARA VISUALIZAÇÃO E INTERAÇÃO COM ELEMENTOS HTML

    pesquisarDisciplina() {
        const pesquisaDisciplinaElemento = document.querySelector("#pesquisa_disciplina");
        const nomeDisciplina = pesquisaDisciplinaElemento.value;
        const mensagemElemento = document.querySelector("#mensagemErro3");
        const resultadoDiv = document.querySelector("#respostaDisciplina");

        resultadoDiv.innerHTML = '';
    
        try {
            const disciplinaEncontrada = this.disciplinaServico.pesquisarDisciplinaPorNome(nomeDisciplina);
            console.log("disciplina controlador", disciplinaEncontrada);
            console.log("disciplina controlador alunos da disciplina", disciplinaEncontrada._alunos);
            
            resultadoDiv.innerHTML = `
                <p>Nome da Disciplina: ${disciplinaEncontrada._nome}</p>
                <p>Código da Disciplina: ${disciplinaEncontrada._codigo}</p>
                <p>Alunos Matriculados:</p>
                <ul>
                    ${disciplinaEncontrada._alunos.map(aluno => `<li>${aluno._nome}</li>`).join('')}
                </ul>
            `;
    
            this.exibirErro("", mensagemElemento);
        } catch (error) {
            this.exibirErro(error.message, mensagemElemento);
        }
    }

//-=======================================================================================
//3 - MÉTODOS DE ATUALIZAÇÃO E EDIÇÃO DE OBJETOS DO SISTEMA PARA VISUALIZAÇÃO E INTERAÇÃO COM ELEMENTOS HTML

    atualizarDisciplina() {

        const informaCodigoElemento = document.querySelector("#informacodigo_disciplina");
        const atualizaNomeElemento = document.querySelector("#atualizanome_disciplina");
        const mensagemElemento = document.querySelector("#mensagemErro4");
        const respostaAtualizacao = document.querySelector("#respostaAtualizacao");

        respostaAtualizacao.innerHTML = '';
    
        try {
    
        
            const disciplinaEncontrada = this.disciplinaServico.pesquisarDisciplinaPorCodigo(Number(informaCodigoElemento.value));
            console.log("controlador atualizar disciplina", disciplinaEncontrada);

            if (!disciplinaEncontrada) {
                throw new Error('Disciplina não encontrada para atualização.');
            }

            const novoNome = atualizaNomeElemento.value.trim(); 

            if (!novoNome) {
                throw new Error('Informe um novo nome para atualização.');
            }

            const disciplinaAtualizada = this.disciplinaServico.atualizarDisciplina(Number(informaCodigoElemento.value), novoNome);

            respostaAtualizacao.innerHTML = `
                <p>Atualização bem sucedida:</p>
                <p>Código da Disciplina: ${disciplinaAtualizada._codigo}</p>
                <p>Novo nome da Disciplina: ${disciplinaAtualizada._nome}</p>
            `;

            this.exibirErro("", mensagemElemento)
    
        } 
        
        catch (error) {
    
            this.exibirErro(error.message, mensagemElemento)
    
        }
    
    }




//-=======================================================================================
//3 - MÉTODOS DE REMOÇÃO DE OBJETOS DO SISTEMA PARA VISUALIZAÇÃO E INTERAÇÃO COM ELEMENTOS HTML

    removerDisciplina() {

        const recebeCodigoElemento = document.querySelector("#recebe_codigo_remover");
        const mensagemElemento = document.querySelector("#mensagemErro6");

        try {

            const codigoDisciplina = Number(recebeCodigoElemento.value);

            this.disciplinaServico.removerDisciplina(codigoDisciplina);

            const respostaRemocao = document.querySelector("#resposta_remover");
            respostaRemocao.innerHTML = "Disciplina removida com sucesso!";

            this.exibirErro("", mensagemElemento)

        } catch (error) {

            this.exibirErro(error.message, mensagemElemento)
        }
    }


//-=======================================================================================
//3 - MÉTODOS DE TRATAMENTOS DE EXCEÇÕES DO SISTEMA 

    exibirErro(mensagem, elementoHTML) {

        elementoHTML.textContent = mensagem;
    }


   
}