package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.jpa.Model;
@Entity(name="observacao")
public class Observacao extends Model {

	public Observacao() {
	}
	
	public Observacao(FileUpload fileUpload, Indicador indicador, Atributo atributo, String valor, String header, String line) {
		this.fileUpload = fileUpload;
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
		this.header = header;
		this.line = line;
	}
	
	public Observacao(FileUpload fileUpload, Indicador indicador, Atributo atributo, String valor){
		this.fileUpload = fileUpload;
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
	}
	
	@OneToMany
	public List<ObservacaoDetail> observacaoDetailList = new ArrayList<ObservacaoDetail>();
	
	@ManyToOne
	public FileUpload fileUpload;
	
	@ManyToOne
	public Indicador indicador;
	
	@ManyToOne
	public Atributo atributo;
	
	public String valor;
	
	public String header;
	public String line;
	
	@Override
	public String toString() {
		return "Observacao [fileUpload=" + fileUpload + ", indicador="
				+ indicador + ", atributo=" + atributo + ", valor=" + valor
				+ ", header=" + header + ", line=" + line + "]";
	}


}
