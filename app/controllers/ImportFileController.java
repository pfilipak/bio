package controllers;

import handler.FileUploadHandler;

import java.util.List;

import models.FileUpload;
import play.Logger;
import play.data.Upload;
import play.mvc.Controller;

public class ImportFileController extends Controller {

	public static void list(){
		List<FileUpload> uploadFileList = new FileUploadHandler().lastFileImport();
    	String title = "Importar CSV";
    	String sampleHead = "atributo1;atributo2;atributo3;...";
    	String sampleLine = "2;asdfg;1.29";
		render(uploadFileList, title, sampleLine, sampleHead);
    }
	
	public static void upload(Upload data) throws Exception{
		Logger.info("import... lala");
			new FileUploadHandler().upload(data, flash, validation);
			list();
	}
}
