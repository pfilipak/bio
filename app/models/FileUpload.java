package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import play.db.jpa.Model;

@Entity(name="file_upload")
public class FileUpload extends Model {

	public String name;
	
	@Enumerated(EnumType.STRING)
	public Status status;
	
	public Date createDate = new Date();
	
	public enum Status {
		CREATED, PROCESSED, ERROR;
	}
	
}
