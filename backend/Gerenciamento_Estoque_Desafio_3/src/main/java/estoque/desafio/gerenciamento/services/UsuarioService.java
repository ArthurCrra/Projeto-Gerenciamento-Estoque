package estoque.desafio.gerenciamento.services;

import java.util.List;
import java.util.Optional;



import org.springframework.stereotype.Service;

import estoque.desafio.gerenciamento.entities.Usuario;
import estoque.desafio.gerenciamento.entities.dtos.AtualizarSenhaDTO;
import estoque.desafio.gerenciamento.entities.dtos.LoginDTO;
import estoque.desafio.gerenciamento.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	private final UsuarioRepository usuarioRepository;

	public UsuarioService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	public Usuario criarUsuario(Usuario usuario) {
		usuarioRepository.save(usuario);
		return usuario;
	}

	public List<Usuario> listarUsuarios() {
		return usuarioRepository.findAll();
	}

	public Usuario atualizarSenha(AtualizarSenhaDTO senhaUsuarioDTO) {
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(senhaUsuarioDTO.getId());
		if (usuarioOpt.isPresent()) {
			Usuario usuario = usuarioOpt.get();
			usuario.setSenha(senhaUsuarioDTO.getSenha());
			usuarioRepository.save(usuario);
			return usuario;
		}
		throw new RuntimeException("Usuário não encontrado");
	}

	public void excluirUsuario(Long id) {
		usuarioRepository.deleteById(id);
	}

}