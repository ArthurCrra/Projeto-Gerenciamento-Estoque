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
            Optional<Item> item = itemService.findById(id);
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

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarItem(@PathVariable Long id, @RequestBody Item item) {
        try {
            Optional<Item> itemExistente = itemService.findById(id);
            if (itemExistente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item não encontrado");
            }

            item.setId(id);
            Item itemAtualizado = itemService.salvarItem(item);
            return ResponseEntity.ok(itemAtualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o item");
        }
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirItem(@PathVariable Long id) {
        try{
            if (itemService.findById(id).isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item nao encontrado");
            }
            itemService.deleteById(id);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir item: " + e.getMessage());
        }
    }

}
