package controllers;

import handler.MobileHandler;

import java.io.File;
import java.net.URLEncoder;
import java.util.Map;

import play.Logger;
import play.mvc.Controller;
import play.mvc.Http.Header;
import utils.FileUtils;

public class FromClientController extends Controller {

	public static void formList(String body) {
		Map<String, play.mvc.Http.Header> headers = response.headers;
		headers.put("contentType", new Header("contentType", "text/xml"));
		headers.put("charset", new Header("charset", "utf8"));
		headers.put("X-OpenRosa-Version", new Header("X-OpenRosa-Version", "1.0"));
		String fileName = "/Users/pfilipak/dev/workspaceLuna/mestrado/public/files/javaRosa.xml";
		
		FileUtils fileUtils = new FileUtils();
		String content = fileUtils.read(fileName);
		Logger.info("FormList content[%s]", content);
		renderXml(content);
	}

	public static void submission(String body, File attachment) {
		try {
			Logger.info("submition[%s] [%s]", body, attachment);
			Map<String, play.mvc.Http.Header> headers = response.headers;
			
			headers.put("Location", new Header("Location", URLEncoder.encode("http://192.168.0.100:9000/accept")));
			response.status = 204;
		} catch (Exception e) {
			Logger.error(e, e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	public static void accept(String body, File xml_submission_file) throws Exception{
		try {
			String absoluteFile = xml_submission_file.getAbsolutePath();
			Logger.info("accept[%s] [%s]", body, absoluteFile);
			
			FileUtils fileUtils = new FileUtils();
			String content = fileUtils.read(absoluteFile);
			Logger.info("Accept content[%s]", content);
			MobileHandler xmlUtils = new MobileHandler();
			xmlUtils.parse(xml_submission_file);
			response.status = 201;
		} catch (Exception e) {
			Logger.error(e, e.getMessage());
			throw new RuntimeException(e);
		}
		
	}
}
