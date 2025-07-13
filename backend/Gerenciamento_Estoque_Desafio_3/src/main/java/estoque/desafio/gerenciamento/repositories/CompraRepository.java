package estoque.desafio.gerenciamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import estoque.desafio.gerenciamento.entities.Compra;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByProjetoId(Long id);

}
