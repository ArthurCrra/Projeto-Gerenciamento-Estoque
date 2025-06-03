package estoque.desafio.gerenciamento.controllers;

import estoque.desafio.gerenciamento.services.InvoiceService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvoiceController {

    private InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

}
