package controllers;

import handler.PlanilhaUploadHandler;

import java.util.List;

import models.FileUpload;
import play.Logger;
import play.data.Upload;
import play.mvc.Controller;

public class TaxonomiaFileController extends Controller {

	public static void list(){
		List<FileUpload> uploadFileList = new PlanilhaUploadHandler().lastFileImport();
    	String title = "Importar Taxonomia";
    	String sampleHead = "nomePopular;nomeCientifco;genero;familia;ordem;classe;filo;reino;nomeAutor;grauAmeaca";
    	String sampleLine = "Lobo Guará;Chrysocyon brachyurus;Chrysocyon;Canidae;Carnivora;Mammalia;Chordata;Animalia;;";
		render(uploadFileList, title, sampleLine, sampleHead);
    }
	
	public static void upload(Upload data) throws Exception{
		Logger.info("import... lala");
			new PlanilhaUploadHandler().upload(data, flash, validation);
			list();
	}
}