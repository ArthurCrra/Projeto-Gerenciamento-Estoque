import './style.css';

export function Projetos() {

  const projetos = [
    {
      id: '1',
      nome: 'Projeto A',
      descricao: 'Projeto teste'
    },
    {
      id: '2',
      nome: 'Projeto B',
      descricao: 'Projeto teste'
    },
    {
      id: '3',
      nome: 'Projeto C',
      descricao: 'Projeto teste'
    },
  ]

  const entrarNoProjeto = (projetoId) => {
    // Aqui será substituído por navegação ou lógica real
    console.log("Entrando no projeto com ID:", projetoId);
  };

  return (

    <div>
      <h1>Projetos</h1>
      <div className='projetos'>
        {projetos.map(projeto => (
          <div key={projeto.id} className='card'>
            <div>
              <p>Nome: {projeto.nome}</p>
              <p>Descricao: {projeto.descricao}</p>
            </div>
          </div >
        ))}
      </div>

    </div>
  );
}