package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Armazenamento;
import estoque.desafio.gerenciamento.entities.Fornecedor;
import estoque.desafio.gerenciamento.entities.Item;
import estoque.desafio.gerenciamento.repositories.ArmazenamentoRepository;
import estoque.desafio.gerenciamento.repositories.FornecedorRepository;
import estoque.desafio.gerenciamento.repositories.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
	
	private ItemRepository itemRepository;
	private ArmazenamentoRepository armazenamentoRepository;
	private FornecedorRepository fornecedorRepository;

	public ItemService(ItemRepository itemRepository, ArmazenamentoRepository armazenamentoRepository, FornecedorRepository fornecedorRepository) {
		this.itemRepository = itemRepository;
		this.armazenamentoRepository = armazenamentoRepository;
		this.fornecedorRepository = fornecedorRepository;
	}


	public List<Item> listarItens() {
		return itemRepository.findAll();
	}

	public Optional<Item> listarItemPorId(Long codigo) {
		return itemRepository.findById(codigo);

	}

	public Item salvarItem(Item item, Long armazenamentoId, Long fornecedorId) {
		Armazenamento armazenamento = armazenamentoRepository.findById(armazenamentoId).
				orElseThrow(() -> new RuntimeException("Armazenamento não encontrado"));
		item.setArmazenamento(armazenamento);
		Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId).
				orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
		item.setFornecedor(fornecedor);
		return itemRepository.save(item);
	}

	public void deletarItem(Item item) {
		itemRepository.delete(item);
	}


	
	

}
