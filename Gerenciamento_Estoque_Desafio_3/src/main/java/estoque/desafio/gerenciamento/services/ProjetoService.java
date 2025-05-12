package estoque.desafio.gerenciamento.services;

import estoque.desafio.gerenciamento.entities.Projeto;
import estoque.desafio.gerenciamento.repositories.ProjetoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetoService {

    private ProjetoRepository projetoRepository;

    public ProjetoService(ProjetoRepository projetoRepository) {
        this.projetoRepository = projetoRepository;
    }

    public Projeto add(Projeto projeto){
       return projetoRepository.save(projeto);
    }

    public List<Projeto> findAll(){
        return projetoRepository.findAll();
    }

    public Optional<Projeto> findById(Long id){
        return projetoRepository.findById(id);
    }

    public void delete(Long id){
        projetoRepository.deleteById(id);
    }

}
