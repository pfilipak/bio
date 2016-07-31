package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import play.db.jpa.Model;
@Entity(name="observacao")
public class Observacao extends Model {

	public String valor;
	public String header;
	public String line;
	public Integer lineNumber;

	@OneToMany
	public List<ObservacaoDetail> observacaoDetailList = new ArrayList<ObservacaoDetail>();
	@ManyToOne
	public FileUpload fileUpload;
	@ManyToOne
	public Indicador indicador;
	@ManyToOne
	public Atributo atributo;
	
	public Observacao() {
	}
	
	public Observacao(FileUpload fileUpload, Indicador indicador, Atributo atributo, String valor, String header, String line, Integer lineNumber) {
		this.fileUpload = fileUpload;
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
		this.header = header;
		this.line = line;
		this.lineNumber = lineNumber;
	}
	
	public Observacao(FileUpload fileUpload, Indicador indicador, Atributo atributo, String valor){
		this.fileUpload = fileUpload;
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
	}
	
	@Override
	public String toString() {
		return "Observacao [fileUpload=" + fileUpload + ", indicador="
				+ indicador + ", atributo=" + atributo + ", valor=" + valor
				+ ", header=" + header + ", line=" + line + 
				", lineNumber=" + lineNumber + "]";
	}

}
