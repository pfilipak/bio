package controllers;

import java.net.URI;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import play.Logger;
import play.mvc.Controller;

public class FromClientController extends Controller {

	public static void formList(String body) {
Path path;
		//		Map<String, play.mvc.Http.Header> headers = response.headers;
//		headers.put("contentType", new Header("contentType", "text/xml"));
//		headers.put("charset", new Header("charset", "utf8"));
		Logger.info(body);
		renderXml(readFileAsList());
//		renderXml("<xforms>FormBorboleta.xml;asfd;asfd;asfd</xforms>");
		
	}
	
	private static String readFileAsList() {
        String fileName = "/Users/pfilipak/Downloads/javaRosa.xml";
//        String fileName = "/Users/pfilipak/Downloads/FormBorboleta.xml";

        StringBuilder content = new StringBuilder();
        try {
//            URI uri = FromClientController.class.getResource(fileName).toURI();
            List<String> lines = Files.readAllLines(Paths.get(fileName),
                    Charset.defaultCharset());
            for (String line : lines) {
            	content.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }
	public static void submission(String body) {
		Logger.info(body);
	}
}
