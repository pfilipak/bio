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
		return "Observacao [id=" + id + ", lote=" + fileUpload + ", indicador=" + indicador + ", atributo=" + atributo
				+ ", valor=" + valor + "]";
	}

}
