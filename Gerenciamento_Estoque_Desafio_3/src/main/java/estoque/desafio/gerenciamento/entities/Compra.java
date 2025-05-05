package estoque.desafio.gerenciamento.entities;

import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

@Entity
public class Compra {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;
	private LocalDateTime dataCompra;
	private LocalDateTime dataEnvio; // Data que a mercadoria saiu do fornecedor

	@Column(nullable = true)
	private String observacao; // Complemento vai ser aqui
	
	@ManyToOne
	@JoinColumn(name = "projeto", nullable = false)
	@JsonIgnoreProperties("compras")
	private Projeto projeto;
	
	@OneToMany(mappedBy = "compra")
	@JsonIgnoreProperties("compra")
	private Set<Item> itens;

	@OneToOne(mappedBy = "compra")
	@JsonIgnoreProperties("compra")
	private Invoice invoice;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public LocalDateTime getDataCompra() {
		return dataCompra;
	}

	public void setDataCompra(LocalDateTime dataCompra) {
		this.dataCompra = dataCompra;
	}

	public LocalDateTime getDataEnvio() {
		return dataEnvio;
	}

	public void setDataEnvio(LocalDateTime dataEnvio) {
		this.dataEnvio = dataEnvio;
	}

	public Projeto getProjeto() {
		return projeto;
	}

	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}

	public Set<Item> getItens() {
		return itens;
	}

	public void setItens(Set<Item> itens) {
		this.itens = itens;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

}
