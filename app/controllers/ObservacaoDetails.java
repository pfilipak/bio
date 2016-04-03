package controllers;

import play.data.binding.Binder;
import play.db.Model;
import play.exceptions.TemplateNotFoundException;
import controllers.CRUD.ObjectType;
import models.Observacao;
import models.ObservacaoDetail;

@CRUD.For(ObservacaoDetail.class)
public class ObservacaoDetails extends CRUD {

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
            redirect("/upload/list/" + ((ObservacaoDetail)object).observacao.fileUpload.id);
        }
        redirect(request.controller + ".show", object._key());
    }
}
