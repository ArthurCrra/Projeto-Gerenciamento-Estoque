package estoque.desafio.gerenciamento.controllers;


import estoque.desafio.gerenciamento.entities.Item;
import estoque.desafio.gerenciamento.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173") // porta do front
@RestController
@RequestMapping("/item")
public class ItemController {

    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }


    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarItem(@RequestBody Item item) {
        try {
            Item novoItem = itemService.salvarItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoItem);
        } catch (Exception e) {
            e.printStackTrace(); // log no console do backend
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar o item: " + e.getMessage());
        }

    }

    @GetMapping("/buscar")
    public ResponseEntity<?> listarItens() {
        try{
            List<Item> item = itemService.listarItens();
            return ResponseEntity.ok(item);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar o item");
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarItemPorCodigo(@PathVariable Long id) {
        try{
            Optional<Item> item = itemService.listarItemPorId(id);
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
