package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

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
	
	public Observacao(FileUpload fileUpload, Indicador indicador, Atributo atributo, String valor, boolean isHeader){
		this.fileUpload = fileUpload;
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
		this.isHeader = isHeader;
	}
	
	@ManyToOne
	public FileUpload fileUpload;
	
	@ManyToOne
	public Indicador indicador;
	
	@ManyToOne
	public Atributo atributo;
	
	public String valor;
	
	public String header;
	public String line;
	public boolean isHeader;
	
	@Override
	public String toString() {
		return "Observacao [fileUpload=" + fileUpload + ", indicador="
				+ indicador + ", atributo=" + atributo + ", valor=" + valor
				+ ", header=" + header + ", line=" + line + ", isHeader="
				+ isHeader + "]";
	}


}
