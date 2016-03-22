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
	
	public Mapping(){}
	
	public Mapping(Indicador indicador, Atributo atributo, DarwinCore darwinCore){
		this.indicador = indicador;
		this.atributo = atributo;
		this.darwinCore = darwinCore;
	}
	
	@Override
	public String toString() {
		return "Mapping [id=" + id + ", indicador=" + indicador + ", atributo=" + atributo
				+ ", darwinCore=" + darwinCore + "]";
	}
	
}
