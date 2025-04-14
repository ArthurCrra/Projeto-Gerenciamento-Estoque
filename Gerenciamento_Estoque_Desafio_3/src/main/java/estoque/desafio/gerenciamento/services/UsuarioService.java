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
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(senhaUsuarioDTO.getCodigo());
		if (usuarioOpt.isPresent()) {
			Usuario usuario = usuarioOpt.get();
			usuario.setSenha(senhaUsuarioDTO.getSenha());
			usuarioRepository.save(usuario);
			return usuario;
		}
		throw new RuntimeException("Usuário não encontrado");
	}

	public void excluirUsuario(Long codigo) {
		usuarioRepository.deleteById(codigo);
	}

	public Optional<Usuario> getUsuarioAutenticacao(String username) {
		return usuarioRepository.findByMatricula(username);
	}

	
//	public String isAuthenticated(LoginDTO loginDTO) {
//		Optional<Usuario> usuario = usuarioRepository.findByMatricula(loginDTO.getMatricula());
//		if(Optional.ofNullable(usuario).isPresent() && usuario.get().getSenha().equals(loginDTO.getSenha())) {
//			UUID uuid = UUID.randomUUID();
//			String myRandom = uuid.toString();
//			return myRandom;
//		}
//		return "";
//	}

}