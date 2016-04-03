package utils;

import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import play.Logger;

public class FileUtils {

	public String read(String fileName) {
		StringBuilder content = new StringBuilder();
        try {
            List<String> lines = Files.readAllLines(Paths.get(fileName), Charset.defaultCharset());
            for (String line : lines) {
            	content.append(line);
            }
        } catch (Exception e) {
            Logger.error(e, e.getMessage());
            throw new RuntimeException(e);
        }
        return content.toString();
	}
	
}