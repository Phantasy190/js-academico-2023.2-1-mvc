class AlunoRepositorio {

    constructor() {
        this.alunos = [];
    }


//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO DE OBJETOS NO REPOSITORIO


    inserirAluno(aluno) {
        this.alunos.push(aluno);    
        localStorage.setItem('alunos', JSON.stringify(this.alunos));    
    }


//-=======================================================================================
//2 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS CONTIDOS NO REPOSITORIO


    listarAlunos() {  
        const dbAlunos = JSON.parse(localStorage.getItem('alunos'));

        console.log("aluno repositorio: ", dbAlunos);

        if (dbAlunos && Array.isArray(dbAlunos)) {
            this.alunos = dbAlunos; // Atualize this.alunos com os valores de dbAlunos
        }

        return this.alunos;
    }


//-=======================================================================================
//3 - MÉTODOS PARA ATUALIZAÇÃO E EDIÇÃO DE OBJETOS CONTIDOS NO REPOSITORIO

    atualizarAluno(matricula, novoNome) {
        const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);

        if (index !== -1) {
            this.alunos[index] = novoNome;
            localStorage.setItem('alunos', JSON.stringify(this.alunos));
        } else {
            throw new Error('Aluno não encontrado para atualização.');
        }
    }


//-=======================================================================================
//4 - MÉTODOS PARA REMOÇÃO DE OBJETOS CONTIDOS NO REPOSITORIO


    removerAluno(matricula) {
        const indxAlunoARemover = this.alunos.findIndex(aluno => aluno.matricula === matricula);
        if (indxAlunoARemover > -1) {
            this.alunos.splice(indxAlunoARemover, 1);
            localStorage.setItem('alunos', JSON.stringify(this.alunos));   
        }
    }


}
