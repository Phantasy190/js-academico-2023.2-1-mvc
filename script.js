const alunoControlador = new AlunoControlador();
const disciplinaControlador = new DisciplinaControlador(alunoControlador.alunoServico);

const Aluno1 = new Aluno("Lucas", 26, 20);
const Aluno2 = new Aluno("Brian", 27, 21);
const Aluno3 = new Aluno("Roberto", 28, 22);
const Aluno4 = new Aluno("Myke", 29, 23);
        
alunoControlador.alunoServico.alunoRepositorio.inserirAluno(Aluno1);
alunoControlador.alunoServico.alunoRepositorio.inserirAluno(Aluno2);
alunoControlador.alunoServico.alunoRepositorio.inserirAluno(Aluno3);
alunoControlador.alunoServico.alunoRepositorio.inserirAluno(Aluno4);

const Disciplina1 = new Disciplina(10, "artes");

disciplinaControlador.disciplinaServico.disciplinaRepositorio.inserirDisciplina(Disciplina1);

//Disciplina1.inserirAluno(Aluno1);
//Disciplina1.inserirAluno(Aluno2);
//Disciplina1.inserirAluno(Aluno3);






