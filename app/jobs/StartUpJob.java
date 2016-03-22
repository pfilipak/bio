package jobs;

import models.Atributo;
import models.DarwinCore;
import models.Indicador;
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
		
		Atributo dap = new Atributo("dap");
		dap.save();
		Atributo copa = new Atributo("copa");
		copa.save();
		Atributo altura = new Atributo("altura");
		altura.save();
		Atributo armadilha = new Atributo("armadilha");
		armadilha.save();
		
		new Observacao(plantas, dap, "1.90").save();
		new Observacao(plantas, copa, "2.0").save();
		new Observacao(plantas, altura, "17.9").save();
		new Observacao(borboletas, armadilha, "b5").save();
		
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
		new DarwinCore("verbatimLocality").save();
		new DarwinCore("occurrenceRemarks").save();
		new DarwinCore("eventTime").save();
		new DarwinCore("individualCount").save();
		new DarwinCore("measurementValue").save();
		new DarwinCore("measurementUnit").save();
		new DarwinCore("verbatimLocality").save();
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

	}

}
