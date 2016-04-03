package controllers;

import java.util.List;

import models.Indicador;
import models.Observacao;
import models.ObservacaoDetail;
import play.db.Model;

@CRUD.For(Observacao.class)
public class Observacaos extends CRUD {

	 public static void list(int page, String search, String searchFields, String orderBy, String order) {
        ObjectType type = ObjectType.get(getControllerClass());
        notFoundIfNull(type);
        if (page < 1) {
            page = 1;
        }
        List<Model> objects = type.findPage(page, search, searchFields, orderBy, order, (String) request.args.get("where"));
        Long count = type.count(search, searchFields, (String) request.args.get("where"));
        Long totalCount = type.count(null, null, (String) request.args.get("where"));
        Model indicador = objects.iterator().next();
        render(type, objects, count, totalCount, page, orderBy, order, indicador);
    }
	 
}