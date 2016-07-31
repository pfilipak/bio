package models;


public class Student {
	private String Name;
	private Double mathematicsMark;
	private Double computerMark;
	
	public Student(String valor, Double valor2, Double constantNumber) {
		Name = valor;
		mathematicsMark = valor2;
		computerMark = constantNumber;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Double getMathematicsMark() {
		return mathematicsMark;
	}
	public void setMathematicsMark(Double mathematicsMark) {
		this.mathematicsMark = mathematicsMark;
	}
	public Double getComputerMark() {
		return computerMark;
	}
	public void setComputerMark(Double computerMark) {
		this.computerMark = computerMark;
	}
}
