package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.services.InvoiceService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5174") // porta do front
@RestController
public class InvoiceController {

    private InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

}
