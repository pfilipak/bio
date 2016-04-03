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

	public static Atributo findByNome(String nome) {
		return find("nome", nome).first();
	}
	
	@Override
	public String toString() {
		return "Atributo [id=" + id + ", nome=" + nome + "]";
	}

}