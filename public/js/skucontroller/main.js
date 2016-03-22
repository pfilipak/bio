$(function() {

  step = 1;

  $("#toggle-content").click();

  $(".magic-layout").removeAttr("style");
  $(".ion-arrow-resize").hide();

  var orderId;
  var orderLineId;
  var orderNumber;

  var color = [];
      color['UPGRADE_ME'] = "#f2f2f2",
      color['IN_PREPARATION'] = "#fffeb4",
      color['PICKING'] = "#FFFD61",
      color['MEASURES'] = "#E7E82F",
      color['SEWING'] = "#C7C700",
      
      color['READY_TO_SHIP'] = "#b4e5ff",
      color['SHIPPED_TO_CLIENT'] = "#37b9ff",
      color['RECEIVED_BY_CLIENT'] = "#009ef3",
      
      color['POSTED_TO_RETURN'] = "#b4ffc1",
      color['RECEIVED_BY_DRESS_AND_GO'] = "#37ff5c",
      
      color['LAUNDRY'] = "#ffd8b5",
      color['TRUSTEESHIP'] = "#ff9a3f",
      
      color['MAINTENANCE'] = "#ffbcb4",
      
      color['INVENTORY'] = "#00f32d",
      
      color['SOLD_OUT'] = "#e19c48",
      color['DAMAGED'] = "#ff4e37",
      color['LOST'] = "#f31c00"
  ;

  addColorToSkuTrack = function() {
    $("span.spancolor").each(function() {
      var status = $(this).attr("data-current");
      $(this).css("background-color", color[status]);
    });
  };

  var SEPARATOR = " | ";

  doAction = function(skuId, content, skuTrackJson) {
      $("#skuStatusTrack-"+skuId + " option").remove();
      $("#observation-"+skuId).val("");
      var currentSku = "<span class='spancolor' data-current='"+ skuTrackJson.value +"'>"+ skuTrackJson.description +"</span>";

      var html = "<option>Selecione</option>";
      content.forEach(function(v) {
          html += "<option value='" + v.value + "'>" + v.description + "</option>";
      });

      $("#current-"+skuId).html(currentSku);
      $("#skuStatusTrack-"+skuId).append(html);
      addColorToSkuTrack();
      doActionHistory(skuId);
  };

  var completeSkuTrackStatus = function(nextSkuTrackStatusMap) {
    var html = "<option value=''> - Selecione - </option>";
    nextSkuTrackStatusMap.forEach(function(v) {
      html += "<option value='"+ v.statusName +"'>"+ v.statusDescription +"</option>";
    });
    $("select[name=newStatus]").html(html);
  };

  var cleanBoxChange = function() {
      $("#box-change .title").text("");
      $("#box-change .brand").text("");
      $("#box-change .color").text("");
      $("#box-change .size").text("");
      $("#box-change .length").text("");
      $("#box-change .skuTrackStatus").text("");
      $("#to-append img").attr("src", "");
      $("#box-include").html("");
      $("select[name=newStatus] option:first-child").attr("selected", "selected");
      $("#observation").val("");
      $("#success").hide();
  };

  var completeShowTable = function(sku) {
    $("#show-table .sku-name").text(sku.name);
    $("#show-table .sku-color").text(sku.color);
    $("#show-table .sku-length").text(sku.length);
    $("#show-table .sku-size").text(sku.size);
    $("#show-table .sku-brand").text(sku.brand);
    $("#show-table .sku-status").text(sku.status);
    $("#show-table .sku-current-status").text(sku.skuTrackStatusDescription);
    $("#show-table .sku-order").text(orderNumber);
  };

  var unlockFields = function() {
     $("#to-append select").each(function() {
        $(this).removeAttr("disabled");
      });

      $("#to-append input").each(function() {
        $(this).removeAttr("disabled");
      });

      $("#to-append textarea").each(function() {
        $(this).removeAttr("disabled");
      });
  };

  $("#filter-form").slideDown('slow', function() {
    $("#box-sku-table").slideDown('slow');
  });

  $("select[name=newStatus]").change(function(){
    var skuId = $(this).attr("data-sku");
    var currentTrack = $(this).val();
    TrackOrderFlow(skuId, currentTrack, orderLineId);
  });

  $(document).on("click", ".btn-cancelStep", function(e) {
    e.preventDefault();
    window.location.reload();
  });

  $(document).on("click", "#to-append #cancelar", function() {    
    $("#box-change").slideUp('slow', function() {
      $("#box-sku-table").slideDown('slow', function() {
          cleanBoxChange();

          unlockFields();

          $("#to-append #salvar").hide();
          $("#to-append #correct").hide();
          $("#to-append #confirm").show();

          if (topItem !== undefined) {            
            $('.app-body').animate( {scrollTop: topItem}, 'slow' );
          }
      });
    });
  });

  $(document).on("click", "#to-append #confirm", function() {
    $(this).hide(); 
    $("#to-append select").each(function() {
      $(this).prop("disabled", "disabled");
    });

    $("#to-append input").each(function() {
      $(this).prop("disabled", "disabled");
    });

    $("#to-append textarea").each(function() {
      $(this).prop("disabled", "disabled");
    });

    $("#to-append #salvar").show();
    $("#to-append #correct").show();
  });

  $(document).on("click", "#to-append #correct", function() {
    unlockFields();

    $("#to-append #salvar").hide();
    $("#to-append #correct").hide();
    $("#to-append #confirm").show();
  });

  $(document).on("click", "#to-append #salvar", function() {

    var countParam = 1;

    var id = $("#to-append #salvar").attr("data-sku");
    var newStatus = $("select[name=newStatus]").val();
    var oldStatus = $("#to-append #salvar").attr("data-old");
    var observation = $("#observation").val().trim();
    var newStatusDescription = $("select[name=newStatus] option:selected").text();

    var parameters = {skuId:id, oldStatus:oldStatus, newStatus:newStatus, observation:observation, orderId:orderId, orderLineId:orderLineId};
    
    if (newStatus === "MEASURES") {      
      var param1 = {};
      $("#box-include select").each(function() {
        var paramName = $(this).attr("name");
        param1[paramName] = $(this).val();
      });
      parameters["param1"] = JSON.stringify(param1);
    } else {
      $("#box-include select").each(function() {
        parameters["param"+countParam] = $(this).val();
        countParam++;
      });

      $("#box-include input").each(function() {
        parameters["param"+countParam] = $(this).val();
        countParam++;
      });

      $("#box-include textarea").each(function() {
        parameters["param"+countParam] = $(this).val();
        countParam++;
      });
    }

    $.post("/sku", parameters, function(result) {

      if (result.isValid == false) {
        $("#box-change #danger").show();
        setTimeout(function() {
          $("#box-change #danger").fadeOut();
        }, 3000);
        return false;
      }

      var options = result.content;
      var html = "<option value=''>- Selecione -</option>";
     
      options.forEach(function(v) {
        html += "<option value='"+ v.statusName +"'>"+ v.statusDescription +"</option>";
      });      

      $("select[name=newStatus]").html(html);
      
      $("#observation").val("");
      $("#box-include").html("");

      // change view table

      var viewTableHtml = "<span style='background-color: "+ color[newStatus] +"; font-color: #000'>"+ newStatusDescription +"</span>";
      $(".sku-current-status").html(viewTableHtml);

      includeAdditionalInformation(skuId);
      includeHistory(skuId);
       
      //show success message after save
      $("#box-change #success").show();
      setTimeout(function() {
        $("#box-change #success").fadeOut();
      }, 3000);

      //set to table line the current status track 
      $("#current-" + id + " span").attr("data-current", newStatus);
      $("#current-" + id + " span").text(newStatusDescription);
      $("#to-append #salvar").attr("data-old", newStatus);

      unlockFields();
      $("#to-append #salvar").hide();
      $("#to-append #correct").hide();
      $("#to-append #confirm").show();

      addColorToSkuTrack();
    });

  });
  
  var includeAdditionalInformation = function(){
        var url = '/sku/additional/';
        $("#additional-information").html('');
        $.get(url, {skuId:skuId}, function(html) {
            $("#additional-information").html(html);
        }).fail(function(err) { 
            console.log(err);
        });
  };
  
  var includeHistory = function(skuId){
        url = '/sku/history';
        $("#sku-history").html('');
        $.get(url, {skuId:skuId}, function(html) {
            $("#sku-history").html(html);
        }).fail(function(err) { 
            console.log(err);
        });
  };

  $("#filter-input").keyup(function() {
    var filter = $(this).val();
    $("#nextFlowStatus li").find("span:not(:contains("+ filter.toLowerCase() +"))").parent().slideUp();
    $("#nextFlowStatus li").find("span:contains("+ filter +")").parent().slideDown();
  });

  // new
  var setComplement = function(flow) {
    var hasComplement = SkuTrackHasComplement(flow);
  };

  var ajaxSave = function(requestJson) {

      console.log(requestJson);
      $.post('/sku', requestJson, function(result) {
           console.log('done');     
          if (result.isValid == false) {
              $(".dangerMessage").text(result.message);
              $("#danger").show();
              setTimeout(function() {
                $("#danger").hide();
              }, 3000);
            } else {
              $("#success").show();
              setTimeout(function() {
                window.location.reload();
              }, 2000);
            }
      });

  };
  
  $(".btn-nextStep").click(function() {
    $(".step"+step).hide('fast');
    step++;
    $(".step"+step).show('fast');
  });

  $(".btn-prevStep").click(function() {
    $(".step"+step).hide('fast');
    step--;
    $(".step"+step).show('fast');
  });

  $(document).on("click", ".btn-informations", function(e) {
    e.preventDefault();
    var skuId = $(this).attr("data-sku");
    var orderId = $(this).attr("data-order");
    var orderLineId = $(this).attr("data-orderLine");
    var newStatus   = $(this).attr("data-newStatus");

    if (SkuTrackHasComplement(newStatus)) {
      $.get("/sku/includes", {skuTrackStatus:newStatus, skuId:skuId, orderLineId:orderLineId}, function(responseHtml) {
        $(".box-toAppend").html(responseHtml);
        loadEvents();
      });
    } else {
      $("#box-toAppend").html("");
    }
  });

  $(document).on("click", "input[name='newStatus']", function() {
    var value = $(this).val();

    var hasComplement = SkuTrackHasComplement(value);
    
    if (hasComplement) {
      $(".btn-informations").show();
      $(".btn-save").hide();
      $(".btn-informations").attr("data-newStatus", value);
    } else {
      $(".btn-informations").hide();
      $(".btn-save").show();
    }

    var html = "<span style='padding: 3px; color: #000; border-bottom: 3px solid "+color[value]+" '>"+ SkuTrackWorkflowTranslate(value); +"</span>";
    $("#bookmark").css("color", color[value]);
    $(".newStatusChanged").html( html );
  });

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

  // end new
  $("#form-newitem").submit(function(e) {
    e.preventDefault();
  });

  $(document).on("click", ".btn-save", function() {
      console.log('btn-save');
    var form = $("#form-newitem");    

    var skuId = $("#newSkuId").val();
    var newStatus = $("input[name='newStatus']:checked").val();
    var observation = $("#observation").val();

    parameters = getFormData(form);
    var requestJson = { skuId:skuId, observation:observation, newStatus:newStatus, parameters:parameters};

    ajaxSave(requestJson);

  });

  $(document).on("click", ".btn-save-params", function() {
    var form = $("#form-newitem");    

    var skuId = $("#newSkuId").val();
    var newStatus = $("input[name='newStatus']:checked").val();
    var observation = $("#observation").val();
    
    parameters = getFormData(form);
    var requestJson = { skuId:skuId, observation:observation, newStatus:newStatus, parameters:parameters};

    console.log(requestJson);
    ajaxSave(requestJson);
  });

  $(document).on("click", "#btnChangeNew", function() {
    skuId = $(this).attr("data-skuId");
    orderId = $(this).attr("data-orderId");
    orderLineId = $(this).attr("data-orderLineId");
    orderNumber = $(this).attr("data-orderNumber");
    var oldStatus = $(this).attr("data-old");
    topItem = $(".app-body").scrollTop();

    // new
    var flow          = SkuTrackWorkflow(oldStatus);

    $(".btn-informations").attr("data-sku", skuId);
    $(".btn-informations").attr("data-order", orderId);
    $(".btn-informations").attr("data-orderLine", orderLineId);

    $("#nextFlowStatus li").remove();

    $(".carregando").show();
    $(".step1").hide();
    $("#observation").val("");

    setTimeout(function() {
      flow.nextStatus.forEach(function(next) {
        $(".carregando").hide();
        $(".step1").show();

        if (next.status === oldStatus)
          $("#nextFlowStatus").append("<li id='line-"+ next.status +"' style='border-left: 7px solid "+color[next.status]+"'><input type='radio' value='"+ next.status +"' name='newStatus' checked/> <span>"+ SkuTrackWorkflowTranslate(next.status).toLowerCase() +"</span> </li>")
        else
          $("#nextFlowStatus").append("<li id='line-"+ next.status +"' style='border-left: 7px solid "+color[next.status]+"'><input type='radio' value='"+ next.status +"' name='newStatus'/> <span>"+ SkuTrackWorkflowTranslate(next.status).toLowerCase() +"</span> </li>")
      });
    }, 3000);    
    // end new


    $("#box-change #success").hide();

    $("#loading").show();
    $.get("/sku/json", {skuId:skuId, orderId:orderId, orderLineId:orderLineId}, function(sku) {
      var sku = sku;

      $("#newSkuId").val(skuId);

      completeShowTable(sku);
      completeSkuTrackStatus(sku.nextSkuTrackStatusToView);      
      
      $("#box-sku-table").slideUp('slow', function() {
         $("#box-change").slideDown('slow', function() {
            
            $('.app-body').animate( {scrollTop: 500}, 'slow' );

            $("#box-change .title").text(sku.name);
            $("#box-change .brand").text(sku.brand + SEPARATOR);
            $("#box-change .color").text(sku.color + SEPARATOR);
            $("#box-change .length").text(sku.length + SEPARATOR);
            $("#box-change .skuTrackStatus").text(sku.skuTrackStatusDescription);

            sku.size != null ? $("#box-change .size").text(sku.size + SEPARATOR) : "";
            
            $("#to-append #salvar").attr("data-old", oldStatus);

            $("#to-append #salvar").attr("data-sku", skuId);
            $("select[name='newStatus']").attr("data-sku", skuId);
            $("#to-append img").attr("src", sku.image);

            $("#loading").hide();           
        });

      });
      
      includeHistory(skuId);
      includeAdditionalInformation(skuId);
    });
    
    
    
  });
  
      var showCorreiosUrl = function(elem){
        var sendCode = $(this).val();       
        box = $(this).next('.cbox');
        if ( sendCode.length == 13) {  
            box.html("<a href='http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI="+ sendCode +"' target='_blank'>ver status</a>");         
        }else{
            box.html('');
        }
    };

    var changeDeliveryType = function() {
        var val = $(this).val();
        var orderLineId = $(this).data("order-line");
        if (val === "CORREIOS_SEDEX" || val === "CORREIOS_SEDEX10") {           
            $(".send-code-" + orderLineId).show();
        } else {
            $(".send-code-" + orderLineId).hide();
        }
    };
    
    var changeReturnType = function() {
        var val = $(this).val();
        var orderLineId = $(this).data("order-line");
        if (val === "CORREIOS") {           
            $(".received-code-" + orderLineId).show();
        } else {
            $(".received-code-" + orderLineId).hide();
        }
    };

    loadEvents = function(){
        $(".send-code input").change(showCorreiosUrl);
        $(".received-code input").change(showCorreiosUrl);
    
        $(".delivery-type").change(changeDeliveryType);
        $(".return-type").change(changeReturnType);
        
        $(".delivery-type").trigger("change");
        $(".return-type").trigger("change");
        $(".send-code input").trigger('change');
        $(".received-code input").trigger('change');
    };
  

  addColorToSkuTrack();
});




// nova ideia
$(function() {

});