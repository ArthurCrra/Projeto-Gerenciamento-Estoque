package estoque.desafio.gerenciamento.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private double valorUnitario;
	private int quantidade;
	private double valorTotal;

	
	@ManyToOne
	@JoinColumn(name = "armazenamento_id", nullable = false)
	@JsonIgnoreProperties("itens")
	private Armazenamento armazenamento;
	
	@ManyToOne
	@JoinColumn(name = "compra_id", nullable = false)
	@JsonIgnoreProperties("itens")
	private Compra compra;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {return nome;}

	public void setNome(String nome) {this.nome = nome;}

	public double getValorUnitario() {
		return valorUnitario;
	}

	public void setValorUnitario(double valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

	public int getQuantidade() {return quantidade;}

	public void setQuantidade(int quantidade) {this.quantidade = quantidade;}

	public Armazenamento getArmazenamento() {
		return armazenamento;
	}

	public void setArmazenamento(Armazenamento armazenamento) {
		this.armazenamento = armazenamento;
	}

	public Compra getCompra() {
		return compra;
	}

	public void setCompra(Compra compra) {
		this.compra = compra;
	}

	public double getValorTotal() {
		return valorUnitario * quantidade;
	}

	public void setValorTotal(double valorTotal) {
		this.valorTotal = valorTotal;
	}
}
