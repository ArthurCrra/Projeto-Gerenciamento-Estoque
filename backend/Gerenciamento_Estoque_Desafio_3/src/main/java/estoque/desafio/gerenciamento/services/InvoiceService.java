package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Invoice;
import estoque.desafio.gerenciamento.repositories.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    private InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public Optional<Invoice> findByCompra(Long id) {
        return invoiceRepository.findByCompraId(id);
    }

    public Invoice add(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public void delete(Long id) {
        invoiceRepository.deleteById(id);
    }
}
