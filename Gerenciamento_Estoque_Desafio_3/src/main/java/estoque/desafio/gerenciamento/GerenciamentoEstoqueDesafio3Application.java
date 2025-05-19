package estoque.desafio.gerenciamento;

import com.fincatto.documentofiscal.DFAmbiente;
import com.fincatto.documentofiscal.utils.DFCadeiaCertificados;
import org.apache.commons.io.FileUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class GerenciamentoEstoqueDesafio3Application {

	public static void main(String[] args) {
		SpringApplication.run(GerenciamentoEstoqueDesafio3Application.class, args);
		try {
			FileUtils.writeByteArrayToFile(new File("/tmp/producao.cacerts"), DFCadeiaCertificados.geraCadeiaCertificados(DFAmbiente.PRODUCAO, "senha"));
			FileUtils.writeByteArrayToFile(new File("/tmp/homologacao.cacerts"), DFCadeiaCertificados.geraCadeiaCertificados(DFAmbiente.HOMOLOGACAO, "senha"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
