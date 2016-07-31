package controllers;

import java.util.ArrayList;
import java.util.List;

import models.Atributo;
import models.Observacao;
import models.Student;
import play.mvc.Controller;

import com.google.gson.Gson;

public class ChartController extends Controller {

	public static void data(Double constantNumber, String parameterName){
		System.out.println("Constant = " + constantNumber);
		System.out.println("parameter = " + parameterName);
		Atributo atributo = Atributo.findByNome(parameterName);
		Atributo dateAtributo = Atributo.findByNome("date");
		System.out.println("atributo=" + atributo);
		List<Observacao> list = Observacao.find("atributo", atributo).fetch();
		List<Student> listOfStudent = new ArrayList<Student>();
		for (Observacao observacao : list) {
			System.out.println("atributo=" + atributo);
			Observacao observacaoData = Observacao.find("atributo = ? and lineNumber = ? and fileUpload = ?", dateAtributo, observacao.lineNumber, observacao.fileUpload).first();
			System.out.println("dateAtributo=" + dateAtributo);
			
			System.out.println("observacao=" + observacao);
			System.out.println("observacaoData=" + observacaoData);
			System.out.println("+++++++++++++++++++++++++");
			System.out.println("observacao.valor=" + observacao.valor);
			System.out.println("observacaoData.valor=" + observacaoData.valor);
			listOfStudent.add(new Student(observacaoData.valor, new Double(observacao.valor), constantNumber));
			System.out.println("=========================");
		}
		Gson gson = new Gson();
		String titleName = gson.toJson(listOfStudent);
		System.out.println(titleName);
		renderText(titleName);
	}
	public static void index(){
		render();
	}
	
}