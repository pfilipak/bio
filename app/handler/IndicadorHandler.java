package handler;

import java.util.List;

import models.Indicador;

public class IndicadorHandler {

	public Indicador discovery(String fileName) {
		List<Indicador> indicadorList = Indicador.findAll();
		Indicador indicador = null;
		for (Indicador indicadorFromDb : indicadorList) {
			if (fileName.contains(indicadorFromDb.nome)){
				indicador = indicadorFromDb;
				break;
			}
		}
		return indicador;
	}
}
