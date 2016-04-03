package handler;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;

import models.Atributo;
import models.FileUpload;
import models.Indicador;
import models.Observacao;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class MobileHandler {

	public void parse(File file) throws Exception{
		InputStream in = new FileInputStream(file);
		String fileName = file.getName();
		FileUpload fileUpload = new FileUpload(fileName);
		fileUpload.save();
		
		Indicador indicador = new IndicadorHandler().discovery(fileName);
		
		Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(in);
		 Node objects = doc.getDocumentElement();
	        for (Node object = objects.getFirstChild(); object != null; object = object.getNextSibling()) {
	            if (object instanceof Element) {
	                Element e = (Element)object;
	                
	                if ("meta".equals(e.getTagName())){
	                	
	                } else {
	                	Atributo atributo = Atributo.findByNome(e.getTagName());
//	                <data id="build_FormBorboleta_1426784944">
//	                <meta>
//	                   <instanceID>uuid:2d189bc3-88df-4dc9-a843-87209c83153a</instanceID>
//	                </meta>
	                	
	                	
	                	Observacao observacao = new Observacao(fileUpload, indicador, atributo, e.getTextContent());
	                	observacao.save();
	                }
	                
					
	                
	            }
	        }
	}
}
