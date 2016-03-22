$(function() {

	var allowedFlow = [
    'SEWING',
    'READY_TO_SHIP',
    'SHIPPED_TO_CLIENT',
    'RECEIVED_BY_CLIENT',
    'RECEIVED_BY_DRESS_AND_GO',
    'POSTED_TO_RETURN'
    ];

	var descriptions =
		{
			"UPGRADE_ME" : "Atualize-me",
			"PICKING" : "Separado",
			"MEASURES" : "Aguardando medidas",
			"HEMMING" : "Marcar barra",
			"SEWING" : "Em costura",
			"READY_TO_SHIP" : "Pronto para envio",
			"SHIPPED_TO_CLIENT" : "Enviado para o cliente",
			"RECEIVED_BY_CLIENT" : "Recebido pelo cliente",
			"POSTED_TO_RETURN" : "Postado para retorno",
			"RECEIVED_BY_DRESS_AND_GO" : "Recebido pelo Dress & Go",
			"LAUNDRY" : "Lavanderia",
			"TRUSTEESHIP" : "Em curadoria",
			"MAINTENANCE_LAUNDRY" : "Em manutencao Lavanderia",
			"MAINTENANCE_SEWING" : "Em manutencao Costura",
			"INVENTORY" : "Estoque",
			"SOLD_OUT" : "Vendido",
			"DAMAGED" : "Danificado",
			"LOST": "Perdido"
		};

	var flow = {
		UPGRADE_ME: {
			nextStatus: [
				{ status : "UPGRADE_ME" },
				{ status : "PICKING",  },
				{ status : "MEASURES" },
				{ status : "HEMMING" },
				{ status : "SEWING" },
				{ status : "READY_TO_SHIP" },
				{ status : "SHIPPED_TO_CLIENT" },
				{ status : "RECEIVED_BY_CLIENT" },
				{ status : "POSTED_TO_RETURN" },
				{ status : "RECEIVED_BY_DRESS_AND_GO" },
				{ status : "LAUNDRY" },
				{ status : "TRUSTEESHIP" },
				{ status : "MAINTENANCE_LAUNDRY" },
				{ status : "MAINTENANCE_SEWING" },
				{ status : "INVENTORY" },
				{ status : "SOLD_OUT" },
				{ status : "DAMAGED" },
				{ status : "LOST" }
			]
		}
	};

	SkuTrackHasComplement = function(flow) {
		return allowedFlow.indexOf(flow) > -1;
	};

	SkuTrackWorkflowTranslate = function(flow) {
		return descriptions[flow];
	};

	var SkuTrackWorkflowFunctions = function() {
		return {
			upgrademe: function() {
				return flow.UPGRADE_ME;
			}
		};
	};

	SkuTrackWorkflow = function(flow) {
		switch(flow) {
			default: 
				return SkuTrackWorkflowFunctions().upgrademe();
				break;
		}
	};

});