package models;


public class Student {
	private String name;
	private Double mathematicsMark;
	private Double computerMark;
	
	public Student(String valor, Double valor2, Double constantNumber) {
		name = valor;
		mathematicsMark = valor2;
		computerMark = constantNumber;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
