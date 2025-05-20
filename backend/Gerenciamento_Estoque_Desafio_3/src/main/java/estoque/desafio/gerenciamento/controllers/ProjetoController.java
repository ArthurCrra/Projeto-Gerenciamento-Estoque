package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.services.ProjetoService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjetoController {

    private ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }


}
