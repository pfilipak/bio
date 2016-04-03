package controllers;

import java.util.List;

import models.FileUpload;
import play.mvc.Controller;

public class ExportDarwinCoreController extends Controller {

	public static void index(){
		List<FileUpload> fileList = FileUpload.findAll();
		String title = "Gerar arquivo DarwinCore";
		render(fileList, title);
	}
}
