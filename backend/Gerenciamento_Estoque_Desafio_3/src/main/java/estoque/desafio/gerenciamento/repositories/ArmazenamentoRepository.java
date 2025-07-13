package estoque.desafio.gerenciamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import estoque.desafio.gerenciamento.entities.Armazenamento;
import org.springframework.stereotype.Repository;

@Repository
public interface ArmazenamentoRepository extends JpaRepository<Armazenamento, Long> {


}
