package controllers;

import java.util.List;

import models.Indicador;
import models.Observacao;
import models.ObservacaoDetail;
import play.Logger;
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
        Model observacao = objects.iterator().next();
        List<Observacao> headers = Observacao.find("select distinct(atributo) from models.Observacao ").fetch();
        render(type, objects, count, totalCount, page, orderBy, order, observacao, headers);
    }
	 
	 public static void editByFile(Long fileUploadId) {
		Logger.info("Editing fileUploadId[%s]", fileUploadId);
		ObjectType type = ObjectType.get(getControllerClass());
		List<Observacao> objects = Observacao.find("fileUpload.id = ?", fileUploadId).fetch();
        Model observacao = objects.iterator().next();
        List<Observacao> headers = Observacao.find("select distinct(o.atributo) from models.Observacao o where o.fileUpload.id = ?", fileUploadId).fetch();
        render("app/views/Observacaos/list.html", type, objects, 0, 0, 0, "", "", observacao, headers);
	 }
	 
}