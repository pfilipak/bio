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
	
	@Enumerated(EnumType.STRING)
	public Type type;
	
	public Date createDate = new Date();
	
	public FileUpload(){}
	
	public FileUpload(String name){
		this.name = name;
		createDate = new Date();
		status = Status.PROCESSED;
	}
	
	public enum Status {
		CREATED, PROCESSED, ERROR;
	}
	
	public enum Type {
		PLANILHA, MOBILE;
	}

	@Override
	public String toString() {
		return id + "";
	}
	
}
