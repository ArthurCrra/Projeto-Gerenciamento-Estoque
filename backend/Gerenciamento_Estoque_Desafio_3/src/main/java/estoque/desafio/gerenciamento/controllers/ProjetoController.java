package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.entities.Projeto;
import estoque.desafio.gerenciamento.services.ProjetoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3005") // porta do front
@RestController
@RequestMapping("/projeto")
public class ProjetoController {

    private ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }


    // 1. Listar todos os projetos
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
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body("Erro ao buscar o projeto");
        }
    }


}
