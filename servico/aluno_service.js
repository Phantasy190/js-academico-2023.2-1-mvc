class AlunoService {
    constructor() {
        this.alunoRepositorio = new AlunoRepositorio();
    }



//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO E CRIAÇÃO DE OBJETOS NO SISTEMA    

    inserirAluno(nome, idade, matricula) {

        const alunoExistente = this.alunoRepositorio.listarAlunos().find(aluno => aluno.matricula === matricula);

        if (alunoExistente) {
            throw new Error('Aluno já cadastrado!');
        }

        if (idade < 18) {
            throw new Error("Não é permitido inserir alunos menores de idade.");
        }

        const alunoNovo = new Aluno(nome, idade, matricula);
        
        this.alunoRepositorio.inserirAluno(alunoNovo);

        return alunoNovo;
    }

 

//-=======================================================================================
//2 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS CONTIDOS NO SISTEMA



    listarAlunos() {
        return this.alunoRepositorio.listarAlunos();
    }

    listarAlunosMenoresIdade() {
        return this.alunoRepositorio.listarAlunos().filter(aluno => aluno.idade < 18);
    }

    pesquisarAlunoPorMatricula(matricula) {
        const aluno = this.alunoRepositorio.listarAlunos().find(aluno => aluno.matricula === matricula);

        //console.log(aluno);

        return aluno;

    }


//-=======================================================================================
//3 - MÉTODOS PARA ATUALIZAÇÃO E EDIÇÃO DE OBJETOS DO SISTEMA




//-=======================================================================================
//4 - MÉTODOS PARA REMOÇÃO DE OBJETOS DO SISTEMA


    removerAluno(matricula) {
        this.alunoRepositorio.removerAluno(matricula);
    }


}
