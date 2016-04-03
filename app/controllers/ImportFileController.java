package controllers;

import handler.PlanilhaUploadHandler;

import java.util.List;

import models.FileUpload;
import play.Logger;
import play.data.Upload;
import play.mvc.Controller;

public class ImportFileController extends Controller {

	public static void list(){
		List<FileUpload> uploadFileList = new PlanilhaUploadHandler().lastFileImport();
    	String title = "Importar CSV";
    	String sampleHead = "atributo1;atributo2;atributo3;...";
    	String sampleLine = "2;asdfg;1.29";
		render(uploadFileList, title, sampleLine, sampleHead);
    }
	
	public static void edit(){
		List<FileUpload> uploadFileList = new PlanilhaUploadHandler().lastFileImport();
		String title = "Editar dados";
		render(uploadFileList, title);
	}
	
	public static void upload(Upload data) throws Exception{
		Logger.info("import... lala");
			new PlanilhaUploadHandler().upload(data, flash, validation);
			list();
	}
}
