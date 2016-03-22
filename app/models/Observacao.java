package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;
@Entity(name="observacao")

public class Observacao extends Model {

	public Observacao() {
	}
	
	public Observacao(Indicador indicador, Atributo atributo, String valor) {
		this.indicador = indicador;
		this.atributo = atributo;
		this.valor = valor;
	}
	
	@ManyToOne
	public Indicador indicador;
	
	@ManyToOne
	public Atributo atributo;
	
	public String valor;
	
	@Override
	public String toString() {
		return "Observacao [indicador=" + indicador + ", atributo=" + atributo
				+ ", valor=" + valor + "]";
	}
	
	
}
