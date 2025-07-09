package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Fornecedor;
import estoque.desafio.gerenciamento.entities.dtos.FornecedorDTO;
import estoque.desafio.gerenciamento.services.FornecedorService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3005") // porta do front
@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    private FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarFornecedores() {
        try {
            List<Fornecedor> fornecedores = fornecedorService.listarFornecedores();
            return ResponseEntity.ok(fornecedores);
        } catch (Exception ex) {
            return new ResponseEntity<>("Erro de consulta", HttpStatusCode.valueOf(504));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> criarFornecedor(@RequestBody FornecedorDTO fornecedor) {
        try {
            Fornecedor fornecedorCriado = fornecedorService.CriarFornecedor(fornecedor);
            return ResponseEntity.ok(fornecedorCriado);
        } catch (Exception e) {
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
            return new ResponseEntity<>("Erro ao atualizar fornecedor: " + e.getMessage(), HttpStatusCode.valueOf(500));
        }
    }
}
