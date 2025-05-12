package estoque.desafio.gerenciamento.entities.dtos;

public class AtualizarSenhaDTO {
	
	private Long id;
	private String senha;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long codigo) {
		this.id = id;
	}
	
	public String getSenha() {
		return senha;
	}
	
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
}
