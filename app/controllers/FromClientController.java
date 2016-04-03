package controllers;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import play.Logger;
import play.mvc.Controller;
import play.mvc.Http.Header;

public class FromClientController extends Controller {

	public static void formList(String body) {
				Map<String, play.mvc.Http.Header> headers = response.headers;
		headers.put("contentType", new Header("contentType", "text/xml"));
		headers.put("charset", new Header("charset", "utf8"));
		headers.put("X-OpenRosa-Version", new Header("X-OpenRosa-Version", "1.0"));
		Logger.info(readFileAsList());
		renderXml(readFileAsList());
//		renderXml("<xforms>FormBorboleta.xml;asfd;asfd;asfd</xforms>");
		//public/images/favicon.png
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
