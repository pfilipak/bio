$(function() {

	var allowedFlow = [
		'SEWING',
		'SHIPPED_TO_CLIENT',
		'RECEIVED_BY_CLIENT',
		'POSTED_TO_RETURN'
	];

	var getUrl = function(flow) {
		return "/sku/includes";
	};
	
    FlowStatusAction = function() {
        return {
            sewing: function(orderId) {
                $.get("/admin/dressmaker/types", function(types) {                    
                    var options = "<option value=''> - Selecione - </option>";
                    types.forEach(function(type) {
                        options += "<option value='"+ type.id +"'>"+ type.description +"</option>";
                    });
                    $("#dressmakerType").html(options);
                });
            },
            sewingNameAppend: function(type, orderId) {
                if(type === 'OTHERS'){
                    $("#sewing-"+orderId+" .sewing-name").hide();
                    $("#sewing-"+orderId+" #sewing-name").html('');
                    $("#sewing-"+orderId+" .others-name").show();
                }else{
                    $("#sewing-"+orderId+" .others-name").hide();
                    $.get("/admin/dressmaker/"+type, function(dressmakers) {
                        if(dressmakers.length == 0){
                            $("#sewing-"+orderId+" .sewing-name").hide();
                            $("#sewing-"+orderId+" #sewing-name").html('');
                        }else{
                            $("#sewing-"+orderId+" .sewing-name").show();
                            var options = "<option value=''> - Selecione - </option>";
                            dressmakers.forEach(function(maker) {
                                options += "<option value='"+ maker.id +"'>"+ maker.name +"</option>";
                            });
                            $("#sewing-"+orderId+" #sewing-name").html(options);
                        }
                    });
                }
            }
        };
    };
	
	flowStatus = function(flow, orderId) {
	    console.log(flow + " - " + orderId);
        switch(flow) {
            case 'SEWING':
                FlowStatusAction().sewing(orderId);
                break;
        }
    };

	var includeHtml = function(flow, skuId, url, orderLineId) {
		startDivs(skuId);
		var load = "#loading";
		$(load).show();
		$.get(url, {skuTrackStatus:flow, skuId:skuId, orderLineId:orderLineId}, function(html) {
			$(load).hide();
			$("#box-include").html(html);
			flowStatus(flow, orderId);
			
		}).fail(function(err) { 
			console.log(err);
		});
	};

	var removeHtml = function(skuId) {
		endDivs(skuId);
		$("#box-include").html("");
	};

	var startDivs = function(skuId) {
		$("#form-status-"+skuId).removeClass("col-md-12");
    	$("#form-status-"+skuId).addClass("col-md-6");
    	$("#form-complement-"+skuId).show();
    	$("#form-status-" + skuId + " #send-form").hide();
	};

	var endDivs = function(skuId) {
		$("#form-complement-"+skuId).hide();	
    	$("#form-status-"+skuId).removeClass("col-md-6");
    	$("#form-status-"+skuId).addClass("col-md-12");    	
    	$("#form-status-" + skuId + " #send-form").show();
	};

	var afterSave = function(skuId) {
		removeHtml(skuId);
		var line = "#line-"+skuId;
		$(line).addClass("hide");

		$("#top-line-"+skuId +" .change-sku-track button#btnChange").text("Alterar");
		$("#top-line-"+skuId +" .change-sku-track button#btnChange").addClass("btn-success");
		$("#top-line-"+skuId +" .change-sku-track button#btnChange").removeClass("btn-default");
		$("#top-line-"+skuId).css("background-color","#a5ddb1");
		$("select[name=newStatus] option:first-child").attr("selected", "selected");
	};
	
	TrackOrderFlow = function(skuId, flow, orderLineId) {
		var url = getUrl(flow);
		if (allowedFlow.indexOf(flow) > -1) {			
			includeHtml(flow, skuId, url, orderLineId);
		} else {			
			removeHtml(skuId);
		}
	};

	TrackStatusFunctions = function() {
		return {
			save: function(skuId) {
				afterSave(skuId);
			}
		};
	};

});
