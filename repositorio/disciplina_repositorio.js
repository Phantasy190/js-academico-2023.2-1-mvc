class DisciplinaRepositorio {

    constructor() {
        this.disciplinas = [];
    }


    //disciplinas = [objeto1, objeto2]

//-=======================================================================================
//1 - MÉTODOS PARA INSERÇÃO DE OBJETOS NO REPOSITORIO


    inserirDisciplina(disciplina) {
        this.disciplinas.push(disciplina);
        localStorage.setItem('disciplinas', JSON.stringify(this.disciplinas));
        
    }



//-=======================================================================================
//2 - MÉTODOS DE PESQUISA E LISTAGEM DE OBJETOS CONTIDOS NO REPOSITORIO


    listarDisciplina() {
        const dbDisciplinas = JSON.parse(localStorage.getItem('disciplinas'));

        console.log("disciplina repositorio: ", dbDisciplinas);

        if (dbDisciplinas && Array.isArray(dbDisciplinas)) {
            this.disciplinas = dbDisciplinas; 
        }

        return this.disciplinas;
    }


//-=======================================================================================
//3 - MÉTODOS PARA ATUALIZAÇÃO E EDIÇÃO DE OBJETOS CONTIDOS NO REPOSITORIO


    atualizarDisciplina(codigo, novaDisciplina) {
        const index = this.disciplinas.findIndex(disciplina => disciplina._codigo === codigo);

        if (index !== -1) {
            this.disciplinas[index] = novaDisciplina;
            localStorage.setItem('disciplinas', JSON.stringify(this.disciplinas));
        } else {
            throw new Error('Disciplina não encontrada para atualização.');
        }
    }



//-=======================================================================================
//4 - MÉTODOS PARA REMOÇÃO DE OBJETOS CONTIDOS NO REPOSITORIO


    removerDisciplina(codigo) {
        const index = this.disciplinas.findIndex(disciplina => disciplina._codigo === codigo);

        if (index !== -1) {
            this.disciplinas.splice(index, 1);
            localStorage.setItem('disciplinas', JSON.stringify(this.disciplinas));
        } else {
            throw new Error('Disciplina não encontrada para remoção.');
        }
    }

}