package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity(name="mapping")
public class Mapping extends Model {

	@ManyToOne
	public Indicador indicador;
	@ManyToOne
	public Atributo atributo;
	@ManyToOne
	public DarwinCore darwinCore;
	
	@Override
	public String toString() {
		return "Mapping [indicador=" + indicador + ", atributo=" + atributo
				+ ", darwinCore=" + darwinCore + "]";
	}
	
}
