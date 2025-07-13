package estoque.desafio.gerenciamento.controllers;

import java.util.List;

import estoque.desafio.gerenciamento.entities.Compra;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import estoque.desafio.gerenciamento.entities.Usuario;
import estoque.desafio.gerenciamento.entities.dtos.AtualizarSenhaDTO;
import estoque.desafio.gerenciamento.entities.dtos.LoginDTO;
import estoque.desafio.gerenciamento.services.UsuarioService;

@CrossOrigin(origins = "http://localhost:5173") // porta do front
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	private UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	
	@GetMapping("/buscar")
	public ResponseEntity<?> listarUsuarios() {
		try {
			List<Usuario> usuarios = usuarioService.listarUsuarios();
			return ResponseEntity.ok(usuarios);
		} catch (Exception e) {
			return new ResponseEntity("Erro de Consulta", HttpStatusCode.valueOf(504));
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
		try {
			Usuario usuario = usuarioService.login(loginDTO.getEmail(), loginDTO.getSenha());
			return ResponseEntity.ok(usuario);
		} catch (Exception e) {
			return new ResponseEntity<>("Credenciais inválidas", HttpStatusCode.valueOf(401));
		}
	}
	
	@PostMapping("/adicionar")
	public ResponseEntity<?> criarUsuario(@RequestBody Usuario usuario) {
		try {
			Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
			return ResponseEntity.ok(usuarioCriado);
		} catch (Exception e) {
			return new ResponseEntity("Erro de Consulta", HttpStatusCode.valueOf(504));
		}
	}
	
	@PatchMapping("/alterar/senha")
	public ResponseEntity<?> atualizarSenha(@RequestBody AtualizarSenhaDTO atualizarSenhaDTO) {
		try {
			Usuario usuario = usuarioService.atualizarSenha(atualizarSenhaDTO);
			return ResponseEntity.ok(usuario);
		} catch (Exception e) {
			return new ResponseEntity("Erro de Consulta", HttpStatusCode.valueOf(504));
		}
	}

	@PutMapping("/atualizar/{id}")
	public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
		try {
			// Verifica se a compra existe antes de tentar atualizar
			if (usuarioService.findById(id).isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado para atualização.");
			}

			Usuario usaurioAtualizado = usuarioService.atualizarUsuario(id, usuario);
			return ResponseEntity.ok(usaurioAtualizado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o Usuario: " + e.getMessage());
		}
	}
	
	@DeleteMapping("/excluir/{id}")
	public ResponseEntity<?> excluirUsuario(@PathVariable Long id) {
		try {
			usuarioService.excluirUsuario(id);
			return ResponseEntity.ok("Excluido com Sucesso");
		} catch (Exception e) {
			return new ResponseEntity("Erro de Consulta", HttpStatusCode.valueOf(504));
		}
	}
	
}
