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
	public String valor;

	public ObservacaoDetail(){}
	
	public ObservacaoDetail(Observacao observacao, Atributo atributo, String valor) {
		this.observacao = observacao;
		this.atributo = atributo;
		this.valor = valor;
	}

	@Override
	public String toString() {
		return "ObservacaoDetail [observacao=" + observacao + ", atributo="
				+ atributo + ", valor=" + valor + "]";
	}

}