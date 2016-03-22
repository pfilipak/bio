package models;

import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity(name="indicador")
public class Indicador extends Model {

	public Indicador(){}
	
	public Indicador(String nome){
		this.nome = nome;}
	
	public String nome;
	
	@Override
	public String toString() {
		return "Indicador [id=" + id + ", nome=" + nome + "]";
	}
	
}
