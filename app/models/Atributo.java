package models;

import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity(name="atributo")
public class Atributo extends Model {

	public Atributo(){}
	
	public Atributo(String nome){
		this.nome = nome;
	}
	
	public String nome;

	@Override
	public String toString() {
		return "Atributo [id=" + id + ", nome=" + nome + "]";
	}

}