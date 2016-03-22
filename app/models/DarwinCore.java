package models;

import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity(name="darwincore")
public class DarwinCore extends Model {

	public DarwinCore(){}
	
	public DarwinCore(String nome){
		this.nome = nome;
	}
	
	public String nome;
	
	@Override
	public String toString() {
		return "DarwinCore [id=" + id + ", nome=" + nome + "]";
	}
	
}
