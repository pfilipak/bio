$(function() {

  $("#toggle-content").click();

  $(".magic-layout").removeAttr("style");
  $(".ion-arrow-resize").hide();

  var orderId;
  var orderLineId;
  var orderNumber;

  var color = [];
      color['UPGRADE_ME'] = "#ffffff",
      color['IN_PREPARATION'] = "#fffeb4",
      color['PICKING'] = "#fffeb4",
      color['MEASURES'] = "#feff37",
      color['SEWING'] = "#f2f300",
      
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
  
function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).on("submit", "#to-append", function(e) {
    e.preventDefault();

    var form = $(this);
    var countParam = 1;

    var newStatus = form.find("select[name=newStatus]").val();
    var orderId = form.find("input[name=orderId]").val();
    var observation = form.find("textarea[name=observation]").val().trim();
    var orderLineIds = [];
    form.find('.bodyTrackStatus tr').each(function(index, elem){
        orderLineIds.push($(elem).data('orderline'));
    });
    parameters = getFormData(form);

    var requestJson = { skuTrackStatus:newStatus, observation:observation, orderId:orderId, orderLineId:orderLineIds, parameters:parameters};

    $.post("/admin/orderdispatch/save", requestJson, function(result) {

      if (result.isValid == false) {
        $("#box-change #danger").show();
        setTimeout(function() {
          $("#box-change #danger").fadeOut();
        }, 3000);
        return false;
      }

        reloadLine(orderId, orderLineIds, result);
        // reload detail
        // $.get('/admin/orderdispatch/detail', { orderId : orderId }, function(data){
            // $(".accordian-body[data-order='" + orderId + "']").html(data);
            // var message = $(".accordian-body[data-order='" + orderId + "']").find("#change-status-success");
            // orderLineIds.forEach(function(val, index){
                // $('#td-orderline-track-status-' + val).text(result.orderLineTrackStatus);
                // $('#td-sku-track-status-' + val).text(result.skuTrackStatus);
            // });
            // message.show();
            // setTimeout(function() {
                // message.fadeOut();
            // }, 3000);
        // });
        
              
    });

  });

  $(document).on("click", "#showHistory", function(e) {
    e.preventDefault();
    var orderId = $(this).attr("data-order");
    $("#collapseHistory-"+orderId).toggle('fast');
  });

  $(document).on("click", "#btnChangeNew", function() {
    skuId = $(this).attr("data-skuId");
    orderId = $(this).attr("data-orderId");
    orderLineId = $(this).attr("data-orderLineId");
    orderNumber = $(this).attr("data-orderNumber");
    var oldStatus = $(this).attr("data-old");
    topItem = $(".app-body").scrollTop();

    $("#box-change #success").hide();

    $("#loading").show();
    $.get("/sku/json", {skuId:skuId, orderId:orderId, orderLineId:orderLineId}, function(sku) {
      var sku = sku;


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
    });

  });


   var reloadLine = function(orderId, orderLineIds, result){
        $.get('/admin/orderdispatch/detail', { orderId : orderId }, function(data){
                body = $(".accordian-body[data-order='" + orderId + "']");
                body.html(data);
                
                if(orderLineIds != undefined && result != undefined){
                    var message = $(".accordian-body[data-order='" + orderId + "']").find("#change-status-success");
                    orderLineIds.forEach(function(val, index){
                        $('#td-orderline-track-status-' + val).text(result.orderLineTrackStatus);
                        $('#td-sku-track-status-' + val).text(result.skuTrackStatus);
                    });        
                    message.show();
                    setTimeout(function() {
                        message.fadeOut();
                    }, 3000);
                }
                lines = body.find('h3.panel-title-orderLine').toArray();
                lines.forEach(function(val, index){
                    
                    trClass = $(val).data('trclass');
                    trLineId = $(val).data('trorderlineid');
                    trReturnType = $(val).data('trreturntype');
                    trDeliveryType = $(val).data('trdeliverytype');

                    $('.tr_'+ trLineId).toggleClass('inweek', 'inweek' == trClass);
                    $('.tr_'+ trLineId).toggleClass('danger', 'danger' == trClass);
                    $('.tr_'+ trLineId).toggleClass('warning', 'warning' == trClass);
                    $('.tr_'+ trLineId).toggleClass('success', 'success' == trClass);
                    $('.tr_'+ trLineId).toggleClass('primary', 'primary' == trClass);

                    $('#return-table-'+ trLineId).html(trReturnType);
                    $('#delivery-table-'+ trLineId).html(trDeliveryType);
                });
        });
    };

    var hideAllPanel = function() {
        $(".panels").each(function() {
            var isVisible = $(this).is(":visible");
            if ( isVisible )
                $(this).hide('fast');
        });
        return {
            showById: function(objectId, orderId) {
                $("#"+objectId+"-"+orderId).show('fast');
            },
            showByClass: function(clazz, orderId) {
              $("."+clazz+"-"+orderId).show('fast');  
            }
        };
    };

    var functionChangeMeasures = function(){
        var orderId = $(this).data('order');
        var orderLineId = $(this).data('order-line');
        $('#change-status-pannel-' + orderId).hide();
        
        $.get('/admin/orderdispatch/measures', {"orderId" : orderId, "orderLineId" : orderLineId}, function(data){
            var collectMeasurePannel = $('#collect-measures-pannel-' + orderId);
            collectMeasurePannel.html(data);
            collectMeasurePannel.show('fast');
        });

    };
    $(document).on('click', '.change-measures' , functionChangeMeasures);
    
    var functionCancelChangeMeasures = function(){
        var orderId = $(this).data('order');
        $('#change-status-pannel-' + orderId).show('fast');  
        $('#collect-measures-pannel-' + orderId).hide();
    };
    $(document).on('click', '.cancel-change-measures' , functionCancelChangeMeasures);
    
    var functionSaveMeasures = function(){
        var orderId = $(this).data('order');
        var orderline = $(this).data('orderline');
        var isDress = $(this).data('isdress');
        
        var form = $('#form-measures-info-'+ orderline);
        form.find('.alert-danger').hide();
        form.find('.alert-success').hide();
        if (form.find('[name=height]').val() == undefined && isDress) {
            form.find('.alert-danger').show();
            return;
        };
        $(this).button('loading'); 
        
        $.post('/admin/orderdispatch/measures', form.serialize(), function(data){
            form.find('.alert-success').show();
            reloadLine(orderId);
        }).fail(function(){
            $(this).button('reset');
            alert('Não foi possível conectar com o servidor');
        });
    };
    $(document).on('click', '.save-measures' , functionSaveMeasures);

   $('.form-observation-info').submit(function(event){
        event.preventDefault();
        var form = $(this);
        form.find('.alert-danger').hide();
        form.find('.alert-success').hide();
         
        
        $.post('/admin/orderdispatch/measures', $(this).serialize(), function(data){
            form.find('.alert-success').show();
        }).fail(function(){
            alert('Não foi possível conectar com o servidor');
        });
   });

    var allowedFlow = [
        'SEWING',
        'READY_TO_SHIP',
        'SHIPPED_TO_CLIENT',
        'RECEIVED_BY_CLIENT',
        'POSTED_TO_RETURN',
        'RECEIVED_BY_DRESS_AND_GO'
    ];

    var addItemToTable = function(sku) {
        var line = "<tr id='table-line-"+sku.id+"' data-orderLine='"+sku.orderLine+"' data-sku='"+sku.id+"'><td>"+sku.skuName+"</td><td>"+sku.skuSize+"</td><td>"+sku.skuTrack+"</td><td><a href='' class='remove-line' data-orderLine='"+sku.orderLine+"' data-id='"+sku.id+"' data-order='"+sku.order+"'><i class='text-danger glyphicon glyphicon-trash'></i></a></td></tr>";
        $("#changeTrackStatus-"+sku.order).append(line);
        $("#orderLine-"+sku.orderLine).css("opacity", "0.5");
        $("#newStatus-"+sku.order).removeAttr("disabled");
        $("#observation-"+sku.order).removeAttr("disabled");
        $("#confirm-"+sku.order).removeAttr("disabled");
        $("#inform-"+sku.orderLine).attr("disabled","disabled");
        $("#deliveryType-"+sku.orderLine).attr("disabled", "disabled");
    };

    var removeItemFromTable = function(skuId, orderLine, order) {
        $("#table-line-"+skuId).remove();
        $("#orderLine-"+orderLine).removeAttr("style");
        $("#orderLine-"+orderLine).find(".btn-add").removeAttr("disabled");

        $("#panel-"+orderLine).remove();
        $("#inform-"+orderLine).removeAttr("disabled");
        $("#deliveryType-"+orderLine).removeAttr("disabled");
        
        if ( $("#changeTrackStatus-"+order +" tr").length == 0 ) {
            $("#box-include-"+order).html("");
            $("#newStatus-"+order).attr("disabled","disabled");
            $("#observation-"+order).attr("disabled","disabled");
            $("#confirm-"+order).attr("disabled","disabled");            
            clearFields();
        }
    };

    var clearFields = function() {
      $("select[name=newStatus]").each(function() {
        var id = $(this).attr("id");
        $(this).val( $("#" + id + " option:first").val() );
      });
      $("textarea[name=observation]").each(function() {
        $(this).val("");
      });
    };

    var appendCurrentHtml = function(orderId, skuTrackStatus) {

        var orderLineIds = [];

        $("#changeTrackStatus-"+orderId+" tr").each(function() {
            var orderLine = $(this).attr("data-orderLine");
            orderLineIds.push(orderLine);
        });
        if (allowedFlow.indexOf(skuTrackStatus) > -1) {
            $.get("/admin/orderdispatch/flow", {skuTrackStatus:skuTrackStatus, orderId:orderId, orderLineIds:orderLineIds}, function(html) {
                $("#box-include-"+orderId).html(html);
                loadEvents();  
            });
        } else {
            $("#box-include-"+orderId).html("");
        }

    };

    $(document).on("click", ".btn-add", function(e) {
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        var sku = {id: $(this).attr("data-id"), skuName: $(this).attr("data-skuName"), skuSize: $(this).attr("data-skuSize"), skuTrack: $(this).attr("data-skuTrackDescription"), orderLine: $(this).attr("data-orderLine"), order: $(this).attr("data-order")};
        
        addItemToTable(sku);
    });

    $(document).on("click", "#cancelar", function() {
        var id = $(this).attr("data-id");

        $("#box-order-"+id+" .orderLine").each(function() {
            $(this).removeAttr("style"); 
            $(this).find(".btn-add").removeAttr("disabled");
        });
        $("#newStatus-"+id).attr("disabled", "disabled");
        $("#observation-"+id).attr("disabled", "disabled");
        $("#confirm-"+id).attr("disabled", "disabled");        
        $("#table-order-"+id+" .bodyTrackStatus tr").remove();


        $("#footer-"+ id +" button.btn-inform").each(function() {
            $(this).removeAttr("disabled", "disabled");
        });

        $("#footer-"+ id +" button.btn-deliveryType").each(function() {
            $(this).removeAttr("disabled", "disabled");
        });

        $("#newStatus-"+id).val( $("#newStatus-" + id + " option:first").val() );
        $("#observation-"+id).val("");
        $("#box-include-"+id).html("");
    });

    $(document).on("click", ".remove-line", function(e) {
        e.preventDefault();

        var orderLine = $(this).attr("data-orderLine");
        var order     = $(this).attr("data-order");
        var skuId     = $(this).attr("data-id");

        removeItemFromTable(skuId, orderLine, order);
    });

    //change and append complement
    $(document).on("change", "select[name=newStatus]", function() {
        var orderId = $(this).attr("data-order");
        var skuTrackStatus = $(this).val();

        appendCurrentHtml(orderId, skuTrackStatus);
    });


    $(document).on("click", ".btn-deliveryType", function() {
        hideAllPanel();
        var orderId = $(this).attr("data-order");
        var orderLineId = $(this).attr("data-orderLine");
        var skuId = $(this).attr("data-sku");

        //$("#panel-entrega-body-"+orderId+" select[name='returnType']").val( $("#panel-entrega-body-"+orderId+"select[name='returnType'] option:first").val() );
        //$("#entrega-line-"+orderId).val(orderLineId);

        var img = $("#image-"+orderLineId).attr("src");
        $("#image-append-"+orderId).attr("src", img);

        $("#change-status-pannel-"+orderId).hide('fast', function() {
            $("#pannel-entrega-"+orderId).show('fast');
        });

        $.get("/admin/orderdispatch/shipping", {orderId: orderId, orderLineId: orderLineId} , function(data) {
            $("#pannel-entrega-"+orderId).find('.form-shipping-detail').html(data);
            loadEvents();
        });
        
    });

    $(document).on("click", "#entrega-cancel", function(e) {
        e.preventDefault();
        var orderId = $(this).attr("data-order");
        hideAllPanel().showById("change-status-pannel", orderId);
    });

    var changeDeliveryTableStatus = function() {

    };

    $(document).on("click", ".entrega-salvar", function(e) {
        e.preventDefault();

        var orderId = $(this).data("order");
        var orderLineId = $(this).data("order-line");
        var form = $("#entrega-form-"+orderId);

        $.ajax({
            method: form.attr("method"),
            url: form.attr("action"),
            data: form.serialize(),
            success: function(response) {
                $("#delivery-table-"+orderLineId).text( $("#returnType-"+orderId+" option:selected").text() );
                hideAllPanel().showById("change-status-pannel", orderId);
                $('.alert-success').show();
                reloadLine(orderId);
                setTimeout(function() {
                    $('.alert-success').fadeOut();
                }, 3000);
            }
        }).fail(function(err) {
            console.log(err);
        });

    });


/************
 * handle selects of delivery type and return type
 */
 
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