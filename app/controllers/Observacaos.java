package controllers;

import java.util.ArrayList;
import java.util.List;

import controllers.CRUD.ObjectType;
import models.FileUpload;
import models.Observacao;
import play.Logger;
import play.data.binding.Binder;
import play.db.Model;
import play.exceptions.TemplateNotFoundException;

@CRUD.For(Observacao.class)
public class Observacaos extends CRUD {

	 public static void save(String id) throws Exception {
	        ObjectType type = ObjectType.get(getControllerClass());
	        notFoundIfNull(type);
	        Model object = type.findById(id);
	        notFoundIfNull(object);
	        Binder.bindBean(params.getRootParamNode(), "object", object);
	        validation.valid(object);
	        if (validation.hasErrors()) {
	            renderArgs.put("error", play.i18n.Messages.get("crud.hasErrors"));
	            try {
	                render(request.controller.replace(".", "/") + "/show.html", type, object);
	            } catch (TemplateNotFoundException e) {
	                render("CRUD/show.html", type, object);
	            }
	        }
	        object._save();
	        flash.success(play.i18n.Messages.get("crud.saved", type.modelName));
	        if (params.get("_save") != null) {
	            redirect("/upload/list/" + ((Observacao)object).fileUpload.id);
	        }
	        redirect(request.controller + ".show", object._key());
	    }

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
		Observacao observacao = (Observacao) objects.iterator().next();
        List<String> headers = new ArrayList<String>();
        for (Observacao observacao2 : objects) {
        	String nome = observacao2.atributo.nome;
			if (!headers.contains(nome) && observacao2.observacaoDetailList.isEmpty()) {
        		headers.add(nome);
        	}
		}
        if (FileUpload.Type.MOBILE.equals(observacao.fileUpload.type)){
        	render("app/views/Observacaos/list.html", type, objects, 0, 0, 0, "", "", observacao, headers);
        } else {
        	render("app/views/Observacaos/listPlan.html", type, objects, 0, 0, 0, "", "", observacao, headers);
        }
	 }
	 
}