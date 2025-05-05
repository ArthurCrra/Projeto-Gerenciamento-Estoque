package estoque.desafio.gerenciamento.repositories;

import estoque.desafio.gerenciamento.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Integer> {

}
