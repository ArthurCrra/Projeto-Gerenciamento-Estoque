package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Armazenamento;
import estoque.desafio.gerenciamento.repositories.ArmazenamentoRepository;
import estoque.desafio.gerenciamento.entities.Item;
import estoque.desafio.gerenciamento.repositories.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ArmazenamentoService {

    private ArmazenamentoRepository armazenamentoRepository;
    private ItemRepository itemRepository;


    public ArmazenamentoService(ArmazenamentoRepository armazenamentoRepository, ItemRepository itemRepository) {
        this.armazenamentoRepository = armazenamentoRepository;
        this.itemRepository = itemRepository;
    }

    public List<Armazenamento> listarArmazenamento() {
        return armazenamentoRepository.findAll();
    }

    public Optional<Armazenamento> findById(Long codigo) {
        return armazenamentoRepository.findById(codigo);
    }

    @Transactional
    public Armazenamento salvar(Armazenamento armazenamento) {
        return armazenamentoRepository.save(armazenamento);
    }

    @Transactional
    public void deleteById(Long codigo) {
        armazenamentoRepository.deleteById(codigo);
    }

    @Transactional
    public boolean removeItemDeArmazenamento(Long armazenamentoId, Long itemId) {
        Optional<Armazenamento> armazenamentoOpt = armazenamentoRepository.findById(armazenamentoId);
        Optional<Item> itemOpt = itemRepository.findById(itemId);

        if (armazenamentoOpt.isPresent() && itemOpt.isPresent()) {
            Armazenamento armazenamento = armazenamentoOpt.get();
            Item item = itemOpt.get();

            if (armazenamento.getItens().contains(item)) {
                armazenamento.getItens().remove(item);
                item.setArmazenamento(null);
                armazenamentoRepository.save(armazenamento);
                itemRepository.delete(item);
                return true;
            }
        }
        return false;
    }
}

