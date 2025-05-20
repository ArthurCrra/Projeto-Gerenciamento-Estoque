package estoque.desafio.gerenciamento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import estoque.desafio.gerenciamento.entities.Compra;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByProjetoId(Long id);

}
