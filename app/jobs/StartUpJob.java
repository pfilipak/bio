package jobs;

import models.Atributo;
import models.DarwinCore;
import models.FileUpload;
import models.Indicador;
import models.Mapping;
import models.Observacao;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class StartUpJob extends Job {

	@Override
	public void doJob() throws Exception {
		Indicador plantas = new Indicador("Plantas");
		plantas.save();
		Indicador mamiferos = new Indicador("Mamíferos");
		mamiferos.save();
		Indicador aves = new Indicador("Aves");
		aves.save();
		Indicador borboletas = new Indicador("Borboletas");
		borboletas.save();
		
		Atributo dap = new Atributo("collector");
		dap.save();
		Atributo copa = new Atributo("revision");
		copa.save();
		Atributo altura = new Atributo("transecto");
		altura.save();
		Atributo formNumber = new Atributo("formNumber");
		formNumber.save();
		Atributo date = new Atributo("date");
		date.save();
		Atributo weatherCondition = new Atributo("weatherCondition");
		weatherCondition.save();
		Atributo samplingStation = new Atributo("samplingStation");
		samplingStation.save();
		Atributo protectedArea = new Atributo("protectedArea");
		protectedArea.save();
		Atributo observation = new Atributo("observation");
		observation.save();
		Atributo tribeCode = new Atributo("tribeCode");
		tribeCode.save();
		Atributo uncertainty = new Atributo("uncertainty");
		uncertainty.save();
		Atributo individualNumber = new Atributo("individualNumber");
		individualNumber.save();
		Atributo trap = new Atributo("trap");
		trap.save();
		
		FileUpload fileUpload = new FileUpload("teste.csv");
		fileUpload.save();
		
		new Observacao(fileUpload, plantas, dap, "1.90", "dap;copa;altura", "1.90;2.0;17.9").save();
		new Observacao(fileUpload, plantas, copa, "2.0", "dap;copa;altura", "1.90;2.0;17.9").save();
		new Observacao(fileUpload, plantas, altura, "17.9", "dap;copa;altura", "1.90;2.0;17.9").save();
		
		new DarwinCore("catalogNumber").save();
		new DarwinCore("recordedNumber").save();
		new DarwinCore("ownerInstitutionCode").save();
		new DarwinCore("collectionCode").save();
		new DarwinCore("collectionId").save();
		new DarwinCore("institutionCode").save();
		new DarwinCore("samplingProtocol").save();
		new DarwinCore("occurenceMarks").save();
		new DarwinCore("recordedBy").save();
		new DarwinCore("eventDate").save();
		DarwinCore verbatimLocality = new DarwinCore("verbatimLocality");
		verbatimLocality.save();
		new DarwinCore("occurrenceRemarks").save();
		new DarwinCore("eventTime").save();
		new DarwinCore("individualCount").save();
		new DarwinCore("measurementValue").save();
		new DarwinCore("measurementUnit").save();
		verbatimLocality.save();
		new DarwinCore("occurrenceRemarks").save();
		new DarwinCore("decimalLatitude").save();
		new DarwinCore("decimalLongitude").save();
		new DarwinCore("verbatimElevation").save();
		new DarwinCore("georeferenceProtocol").save();
		new DarwinCore("georeferenceBy").save();
		new DarwinCore("georeferenceDate").save();
		new DarwinCore("coordinateUncertaintyInMeters").save();
		new DarwinCore("Municipality").save();
		new DarwinCore("stateProvince").save();
		new DarwinCore("country").save();
		new DarwinCore("scientificName").save();
		new DarwinCore("taxonRank").save();
		new DarwinCore("genus").save();
		new DarwinCore("family").save();
		new DarwinCore("ordera").save();
		new DarwinCore("class").save();
		new DarwinCore("phylum").save();
		new DarwinCore("kingdom").save();
		new DarwinCore("vernacularName").save();
		new DarwinCore("taxonRemarks").save();
		
		new Mapping(plantas, dap, verbatimLocality).save();

	}

}
