package estoque.desafio.gerenciamento.controllers;


import estoque.desafio.gerenciamento.entities.Item;
import estoque.desafio.gerenciamento.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/item")
public class ItemController {

    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }


    @PostMapping("/adicionar/{armazenamentoId}/{fornecedorId}")
    public ResponseEntity<Item> adicionarItem(@RequestBody Item item, @PathVariable Long armazenamentoCodigo, @PathVariable Long fornecedorCodigo) {
        try {
            Item novoItem = itemService.salvarItem(item, armazenamentoCodigo, fornecedorCodigo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @GetMapping("/buscar")
    public ResponseEntity<?> listarItens() {
        try{
            List<Item> item = itemService.listarItens();
            return ResponseEntity.ok(item);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao buscar os armazenamentos");
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarItemPorCodigo(@PathVariable Long codigo) {
        try{
            Optional<Item> item = itemService.listarItemPorId(codigo);
            if (item.isPresent()) {
                return ResponseEntity.ok(item.get());
            }
            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item não encontrado");
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao buscar o item");
        }
    }

}
