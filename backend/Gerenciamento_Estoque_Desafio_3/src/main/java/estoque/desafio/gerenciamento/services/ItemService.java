package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Armazenamento;
import estoque.desafio.gerenciamento.entities.Compra;
import estoque.desafio.gerenciamento.entities.Fornecedor;
import estoque.desafio.gerenciamento.entities.Item;
import estoque.desafio.gerenciamento.repositories.ArmazenamentoRepository;
import estoque.desafio.gerenciamento.repositories.CompraRepository;
import estoque.desafio.gerenciamento.repositories.FornecedorRepository;
import estoque.desafio.gerenciamento.repositories.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
	
	private ItemRepository itemRepository;
	private CompraRepository compraRepository;
	private ArmazenamentoRepository armazenamentoRepository;

	public ItemService(ItemRepository itemRepository, CompraRepository compraRepository, ArmazenamentoRepository armazenamentoRepository) {
		this.itemRepository = itemRepository;
		this.compraRepository = compraRepository;
		this.armazenamentoRepository = armazenamentoRepository;
	}


	public List<Item> listarItens() {
		return itemRepository.findAll();
	}

	public Optional<Item> listarItemPorId(Long id) {
		return itemRepository.findById(id);

	}

	public Item salvarItem(Item item) {
		Compra compra = compraRepository.findById(item.getCompra().getId())
				.orElseThrow(() -> new IllegalArgumentException("Compra não encontrada"));
		Armazenamento armazenamento = armazenamentoRepository.findById(item.getArmazenamento().getId())
				.orElseThrow(() -> new IllegalArgumentException("Armazenamento não encontrado"));

		item.setCompra(compra);
		item.setArmazenamento(armazenamento);
		item.setValorTotal(item.getQuantidade() * item.getValorUnitario());

		return itemRepository.save(item);
	}

	public void deletarItem(Item item) {
		itemRepository.delete(item);
	}


	
	

}
