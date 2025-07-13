package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Fornecedor;
import estoque.desafio.gerenciamento.entities.dtos.FornecedorDTO;
import estoque.desafio.gerenciamento.services.FornecedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // porta do front
@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    private final FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarFornecedores() {
        try {
            List<Fornecedor> fornecedores = fornecedorService.listarFornecedores();
            return ResponseEntity.ok(fornecedores);
        } catch (Exception ex) {
            // Mantido como no seu código original
            return new ResponseEntity<>("Erro de consulta", HttpStatusCode.valueOf(504));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> criarFornecedor(@RequestBody FornecedorDTO fornecedor) {
        try {
            Fornecedor fornecedorCriado = fornecedorService.CriarFornecedor(fornecedor);
            return ResponseEntity.ok(fornecedorCriado);
        } catch (Exception e) {
            // Mantido como no seu código original
            return new ResponseEntity<>("Erro ao criar fornecedor", HttpStatusCode.valueOf(504));
        }
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> atualizarFornecedor(@RequestBody Fornecedor fornecedor) {
        try {
            FornecedorDTO fornecedorDTO = new FornecedorDTO();
            fornecedorDTO.setNome(fornecedor.getNome());
            fornecedorDTO.setEmail(fornecedor.getEmail());
            fornecedorDTO.setTelefone(fornecedor.getTelefone());
            fornecedorDTO.setCnpj(fornecedor.getCnpj());

            Fornecedor fornecedorAtualizado = fornecedorService.atualizarFornecedor(fornecedor.getId(), fornecedorDTO);
            return ResponseEntity.ok(fornecedorAtualizado);
        } catch (Exception e) {
            // Mantido como no seu código original
            return new ResponseEntity<>("Erro ao atualizar fornecedor: " + e.getMessage(), HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarFornecedorPorId(@PathVariable Long id) {
        try {
            Optional<Fornecedor> fornecedor = fornecedorService.buscarFornecedorPorId(id);
            if (fornecedor.isPresent()) {
                return ResponseEntity.ok(fornecedor.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fornecedor não encontrado com o id: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar o fornecedor: " + e.getMessage());
        }
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirFornecedor(@PathVariable Long id) {
        try {
            // Verifica se o fornecedor existe antes de tentar excluir
            if (fornecedorService.buscarFornecedorPorId(id).isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fornecedor não encontrado para exclusão com o id: " + id);
            }
            fornecedorService.excluirFornecedor(id);
            return ResponseEntity.ok("Fornecedor com id " + id + " foi excluído com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir o fornecedor: " + e.getMessage());
        }
    }
}