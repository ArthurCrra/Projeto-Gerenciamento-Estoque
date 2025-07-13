package estoque.desafio.gerenciamento.services;

import java.util.List;
import java.util.Optional;


import estoque.desafio.gerenciamento.entities.Compra;
import org.springframework.stereotype.Service;

import estoque.desafio.gerenciamento.entities.Usuario;
import estoque.desafio.gerenciamento.entities.dtos.AtualizarSenhaDTO;
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

	public Optional<Usuario> findById(Long id) {
		return usuarioRepository.findById(id);
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

	public Usuario login(String email, String senha) {
		List<Usuario> usuarios = listarUsuarios();

		for (Usuario usuario : usuarios) {
			if (usuario.getEmail().equals(email) && usuario.getSenha().equals(senha)) {
				return usuario;
			}
		}

		throw new RuntimeException("Credenciais inválidas");
	}

	public Usuario atualizarUsuario(Long id, Usuario novoUsuario) {
		Usuario usuarioExistente = usuarioRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Compra não encontrada"));

		usuarioExistente.setNome(novoUsuario.getNome());
		usuarioExistente.setEmail(novoUsuario.getEmail());
		usuarioExistente.setSenha(novoUsuario.getSenha());
		usuarioExistente.setFuncao(novoUsuario.getFuncao());
		return usuarioRepository.save(usuarioExistente);
	}
}

