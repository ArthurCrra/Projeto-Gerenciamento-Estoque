package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Projeto;
import estoque.desafio.gerenciamento.services.ProjetoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // porta do front
@RestController
@RequestMapping("/projeto")
public class ProjetoController {

    private final ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Projeto>> listarProjetos() {
        List<Projeto> projetos = projetoService.findAll();
        return ResponseEntity.ok(projetos);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarProjetoPorId(@PathVariable Long id) {
        try {
            Optional<Projeto> projeto = projetoService.findById(id);
            if (projeto.isPresent()) {
                return ResponseEntity.ok(projeto.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar o projeto");
        }
    }

    @PostMapping("/adicionar")
    public ResponseEntity<?> adicionarProjeto(@RequestBody Projeto projeto) {
        try{
            Projeto novoProjeto = projetoService.add(projeto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoProjeto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar o projeto: " + e.getMessage());
        }
    }


    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarProjeto(@PathVariable Long id, @RequestBody Projeto projetoDetails) {
        try {
            Projeto projetoAtualizado = projetoService.update(id, projetoDetails);
            return ResponseEntity.ok(projetoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o projeto: " + e.getMessage());
        }
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirProjeto(@PathVariable Long id) {
        try {
            if (projetoService.findById(id).isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado para exclusão com o id: " + id);
            }
            projetoService.delete(id);
            return ResponseEntity.ok("Projeto com id " + id + " foi excluído com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir o projeto: " + e.getMessage());
        }
    }
}