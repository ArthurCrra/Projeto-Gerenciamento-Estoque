package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Compra;
import estoque.desafio.gerenciamento.entities.Projeto;
import estoque.desafio.gerenciamento.repositories.CompraRepository;
import estoque.desafio.gerenciamento.repositories.ProjetoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraService {

    private CompraRepository compraRepository;
    private ProjetoRepository projetoRepository;

    public CompraService(CompraRepository compraRepository, ProjetoRepository projetoRepository) {
        this.compraRepository = compraRepository;
        this.projetoRepository = projetoRepository;
    }

    public Compra add(Compra compra) {
        if (compra.getProjeto() == null || compra.getProjeto().getId() == null) {
            throw new IllegalArgumentException("Projeto da compra não pode ser nulo");
        }

        Projeto projeto = projetoRepository.findById(compra.getProjeto().getId())
                .orElseThrow(() -> new IllegalArgumentException("Projeto não encontrado"));

        return compraRepository.save(compra);
    }

    public Optional<Compra> findById(Long id) {return compraRepository.findById(id);}

    public List<Compra> buscarTodas() {return compraRepository.findAll();}

    public List<Compra> findByProjeto(Long projetoId) {
        return compraRepository.findByProjetoId(projetoId);
    }

    public void deleteById(Long id) {compraRepository.deleteById(id);}

    public Compra atualizarCompra(Long id, Compra novaCompra) {
        Compra compraExistente = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra não encontrada"));

        compraExistente.setDataCompra(novaCompra.getDataCompra());
        compraExistente.setObservacao(novaCompra.getObservacao());
        compraExistente.setProjeto(novaCompra.getProjeto());

        return compraRepository.save(compraExistente);
    }

}
