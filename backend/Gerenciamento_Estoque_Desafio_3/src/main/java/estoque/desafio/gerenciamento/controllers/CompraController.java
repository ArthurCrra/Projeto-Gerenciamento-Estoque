package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Compra;
import estoque.desafio.gerenciamento.services.CompraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // porta do front
@RestController
@RequestMapping("/compra")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }


    @PostMapping("/adicionar")
    public ResponseEntity<?> salvarCompra(@RequestBody Compra compra) {
        try {
            Compra novaCompra = compraService.add(compra);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCompra);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro nos dados enviados: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar a compra: " + e.getMessage());
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> listarCompras() {
        try {
            List<Compra> compras = compraService.buscarTodas();
            return ResponseEntity.ok(compras);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar as compras: " + e.getMessage());
        }
    }


    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarCompraPorId(@PathVariable Long id) {
        try {
            Optional<Compra> compra = compraService.findById(id);
            if (compra.isPresent()) {
                return ResponseEntity.ok(compra.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compra não encontrada");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar a compra");
        }
    }


    @GetMapping("/buscar/por-projeto/{projetoId}")
    public ResponseEntity<?> listarComprasPorProjeto(@PathVariable Long projetoId) {
        try {
            List<Compra> compras = compraService.findByProjeto(projetoId);
            if (compras.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhuma compra encontrada para o projeto " + projetoId);
            } else {
                return ResponseEntity.ok(compras);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar as compras do projeto: " + e.getMessage());
        }
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarCompra(@PathVariable Long id, @RequestBody Compra compra) {
        try {
            // Verifica se a compra existe antes de tentar atualizar
            if (compraService.findById(id).isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compra não encontrada para atualização.");
            }

            Compra compraAtualizada = compraService.atualizarCompra(id, compra);
            return ResponseEntity.ok(compraAtualizada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar a compra: " + e.getMessage());
        }
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirCompra(@PathVariable("id") Long id) {
        try {
            if (compraService.findById(id).isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compra não encontrada com id " + id);
            }
            compraService.deleteById(id);
            return ResponseEntity.ok("Compra excluída com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir a compra: " + e.getMessage());
        }
    }
}