class DisciplinaService {
    constructor() { 
        this.disciplinaRepositorio = new DisciplinaRepositorio();
     
    }



//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO E CRIAÇÃO DE OBJETOS NO SISTEMA    

    inserirDisciplina(codigo, nome) {

        const disciplinaPesquisada = this.disciplinaRepositorio.listarDisciplina().find(disciplina => disciplina.codigo === codigo);
    
        if (disciplinaPesquisada) {
            throw new Error('Código da disciplina já cadastrado!');
        }
    
        const disciplinaNova = new Disciplina(codigo, nome);
    
        this.disciplinaRepositorio.inserirDisciplina(disciplinaNova);
    
        return disciplinaNova;

    }

    inserirAlunoNaDisciplina(disciplina, aluno) {

        const dbDisciplina = disciplina;
        dbDisciplina._alunos.push(aluno);
        this.disciplinaRepositorio.atualizarDisciplina(dbDisciplina._codigo, dbDisciplina);
        console.log("alunos da disciplina: ", disciplina._alunos);
        //disciplina.inserirAluno(aluno); //chama o método da clase disciplina
        //console.log("alunos da disciplina: ", disciplina._alunos);

    }




//-=======================================================================================
//2 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS CONTIDOS NO SISTEMA

    pesquisarDisciplinaPorNome(nome) {

        const disciplinaEncontrada = this.disciplinaRepositorio.listarDisciplina().find(disciplina => disciplina._nome === nome);

        console.log("serviço: ", disciplinaEncontrada);
    
        if (!disciplinaEncontrada) {
            throw new Error('Disciplina não encontrada.');
        }
    
        return disciplinaEncontrada;
    }

    pesquisarDisciplinaPorCodigo(codigo) {

        const disciplinaEncontrada = this.disciplinaRepositorio.listarDisciplina().find(disciplina => disciplina._codigo === codigo);

        console.log("pesquisar por codigo: ", disciplinaEncontrada);

        //if (!disciplinaEncontrada) {
        //    throw new Error('Disciplina não encontrada.');
        //}
    
        return disciplinaEncontrada;
        
    }


//-=======================================================================================
//3 - MÉTODOS PARA ATUALIZAÇÃO E EDIÇÃO DE OBJETOS DO SISTEMA

    atualizarDisciplina(codigo, novoNome) {

        const disciplinaEncontrada = this.disciplinaRepositorio.listarDisciplina().find(disciplina => disciplina._codigo === codigo);

        if (!disciplinaEncontrada) {
            throw new Error('Disciplina não encontrada.');
        }

        disciplinaEncontrada._nome = novoNome; // Correção aqui

        this.disciplinaRepositorio.atualizarDisciplina(codigo, disciplinaEncontrada); // Correção aqui

        return disciplinaEncontrada;

    }


//-=======================================================================================
//4 - MÉTODOS PARA REMOÇÃO DE OBJETOS DO SISTEMA


    removerDisciplina(codigo) {

        const disciplinaEncontrada = this.disciplinaRepositorio.listarDisciplina().find(disciplina => disciplina._codigo === codigo);

        if (!disciplinaEncontrada) {
            throw new Error('Disciplina não encontrada.');
        }

        this.disciplinaRepositorio.removerDisciplina(codigo);
    }
    

}