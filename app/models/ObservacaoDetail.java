package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import play.db.jpa.Model;

@Entity(name="observacao_detail")
public class ObservacaoDetail extends Model {

	@ManyToOne
	public Observacao observacao;
	@ManyToOne
	public Atributo atributo;
	public String textContent;

	public ObservacaoDetail(){}
	
	public ObservacaoDetail(Observacao observacao, Atributo atributo, String textContent) {
		this.observacao = observacao;
		this.atributo = atributo;
		this.textContent = textContent;
	}

	@Override
	public String toString() {
		return "ObservacaoDetail [observacao=" + observacao + ", atributo="
				+ atributo + ", textContent=" + textContent + "]";
	}

}