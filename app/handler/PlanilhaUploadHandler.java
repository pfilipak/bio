package handler;

import java.util.List;

import models.Atributo;
import models.FileUpload;
import models.Indicador;
import models.Observacao;
import play.Logger;
import play.data.Upload;
import play.data.validation.Validation;
import play.mvc.Scope.Flash;

public class PlanilhaUploadHandler {

	public List<FileUpload> lastFileImport(){
    	Logger.info("Show last 10 files");
    	return FileUpload.find("order by id desc").fetch(10);
    }
	
	public void upload(Upload data, Flash flash, Validation validation) throws Exception {
		 if (data == null) {
			 Logger.error("File does NOT uploded.");
		 } else {
			 String fileName = data.getFileName();
			Logger.info("File uploading... fileName[%s], contentType[%s]", fileName, data.getContentType());
			FileUpload uploadFile = new FileUpload();
			uploadFile.name = fileName;
			uploadFile.status = FileUpload.Status.CREATED;
			uploadFile.type = FileUpload.Type.PLANILHA;
			uploadFile.save();
			String trim = "";
			Indicador indicador = new IndicadorHandler().discovery(fileName);
			try {
				String[] content = new String(data.asBytes()).split("\n");
				Atributo[] headers = null;
				String headerAsLine = null;
				 for (int i = 0; i < content.length; i++) {
					 Logger.info("Updating... Content[%S]", content[i]);
					 trim = content[i].trim();
					if (i == 0) {
						headerAsLine = trim;
						String[] headerFromFile = trim.split(";");
						headers = new Atributo[headerFromFile.length];
						for (int j = 0; j < headers.length; j++) {
//							headers[j] = headerFromFile[j];
							Atributo atributo = Atributo.find("nome", headerFromFile[j]).first();
							if (atributo == null) {
								atributo = new Atributo(headerFromFile[j]).save();
							}
							headers[j] = atributo;
						}
					 } else {
						 String[] line = trim.split(";");
						 for (int j = 0; j < line.length; j++) {
							
							Observacao observacao = new Observacao(uploadFile, indicador, headers[j], line[j], headerAsLine, trim, j);
							observacao.save();
							
						}
					 }
				}
			} catch (Exception e) {
				Logger.error(e, e.getMessage());
				uploadFile.status = FileUpload.Status.ERROR;
				uploadFile.save();
				flash.error("ERRO: arquivo[%s] linha[%s] erro[%s]", fileName, trim, e.getMessage());
				validation.addError("", e.getMessage());
			}
			if (!validation.hasErrors()) {
				 uploadFile.status = FileUpload.Status.PROCESSED;
				 uploadFile.save();
				 flash.success("Arquivo processado com sucesso [%s]", fileName);
				 Logger.info("File uploaded [%s]", fileName);
			}
		 }
	 }
}
