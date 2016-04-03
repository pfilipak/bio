package handler;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilderFactory;

import models.Atributo;
import models.FileUpload;
import models.Indicador;
import models.Observacao;
import models.ObservacaoDetail;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import play.Logger;

public class MobileHandler {

	public void parse(File file) throws Exception{
		InputStream in = new FileInputStream(file);
		String fileName = file.getName();
		FileUpload fileUpload = new FileUpload(fileName);
		fileUpload.type = FileUpload.Type.MOBILE;
		fileUpload.status = FileUpload.Status.CREATED;
		fileUpload.save();
		
		Indicador indicador = new IndicadorHandler().discovery(fileName);
		
		Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(in);
		 Node objects = doc.getDocumentElement();
		 Integer position = 0;
	        for (Node object = objects.getFirstChild(); object != null; object = object.getNextSibling()) {
	        	position++;
	            if (object instanceof Element) {
	                Element e = (Element)object;
	                
	                if ("meta".equals(e.getTagName())){
	                	
	                } else {
	                	Atributo atributo = Atributo.findByNome(e.getTagName());
//	                <data id="build_FormBorboleta_1426784944">
//	                <meta>
//	                   <instanceID>uuid:2d189bc3-88df-4dc9-a843-87209c83153a</instanceID>
//	                </meta>
	                	if (atributo == null) {
	                		throw new RuntimeException("Atributo não cadastrado: " + e.getTagName());
	                	} else {
	                		if (e.hasChildNodes()) {
	                			NodeList childNodes = e.getChildNodes();
	                			if (childNodes.getLength() > 1) {
		                			Logger.info("hasChildren [%s]", childNodes.getLength());
		                			String textContent1 = e.getTextContent();
		                			Logger.info("atributo[%s] textContent[%s]", atributo, textContent1);
									Observacao observacao1 = new Observacao(fileUpload, indicador, atributo, textContent1);
		                			observacao1.save();
		                			for (int i = 0; i < childNodes.getLength(); i++) {
										Node nodeChild = childNodes.item(i);
//										for (Node object1 = nodeChild.getFirstChild(); object1 != null; object1 = object1.getNextSibling()) {
											if (nodeChild instanceof Element) {
								                Element e1 = (Element)nodeChild;
								                Atributo atributo1 = Atributo.findByNome(e1.getTagName());
								                String textContent = e1.getTextContent();
					                			Logger.info("observacao1[%s] atributo[%s] textContent[%s]", observacao1,  atributo1, textContent);
					                			ObservacaoDetail observacaoDetail = new ObservacaoDetail(observacao1, atributo1, textContent);
					                			observacaoDetail.save();
					                			observacao1.observacaoDetailList.add(observacaoDetail);
					                			observacao1.save();
											}
//										}
									}
	                			} else {
		                			String textContent = e.getTextContent();
		                			Logger.info("atributo[%s] textContent[%s]", atributo, textContent);
									Observacao observacao = new Observacao(fileUpload, indicador, atributo, textContent);
		                			observacao.save();
		                		}
	                		} 
	                	}
	                }
	            }
	        }
	}
}
