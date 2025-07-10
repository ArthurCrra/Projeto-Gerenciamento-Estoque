package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Compra;
import estoque.desafio.gerenciamento.services.CompraService;
import jakarta.persistence.GeneratedValue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5174") // porta do front
@RestController
@RequestMapping("/compra")
public class CompraController {

    private CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> listarCompras() {
        try {
            List<Compra> compras = compraService.buscarTodas();
            return ResponseEntity.ok(compras);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao buscar as compras");
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> listarComprasPorProjeto(@PathVariable Long codigo) {
        try {
            List<Compra> compras = compraService.findByProjeto(codigo);
            if (compras.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compras não encontradas");
            } else {
                return ResponseEntity.ok(compras);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao buscar as compras");
        }
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> salvarCompra(@RequestBody Compra compra) {
        try {
            Compra novaCompra = compraService.add(compra);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCompra);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao criar a compra");
        }
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirCompra(@PathVariable Long codigo) {
        try {
            if (compraService.findById(codigo).isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Compras não encontradas");
            }
            compraService.deleteById(codigo);
            return ResponseEntity.ok("Compra exclúida com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao excluir a compra");
        }

    }


}
