$(function() {
	
	var current_effect = 'bounce';
	
	
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var getURLParameter = function(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [ , "" ])[1].replace(/\+/g, '%20')) || null;
	};

	var filterDateAction = function(dataType, startDate, endDate) {

		$("#" + dataType + "Start").datetimepicker({
			pickTime : false,
			format : "DD/MM/YYYY"
		});

		$("#" + dataType + "End").datetimepicker({
			pickTime : false,
			format : "DD/MM/YYYY"
		});

		$("input[data-location='" + dataType + "']").prop('checked', true);
		$("#dates .submenu").each(function() {
			var location = $(this).prev('.check').attr('data-location');
			if (location !== dataType)
				$(this).hide();
		});
		$("#" + dataType + "Start").val(revertDateFromGet(startDate));
		$("#" + dataType + "End").val(revertDateFromGet(endDate));
	};

	var filterUserAction = function(actionTo, nameOrEmailOrSku) {
		$("#users input[data-location='" + actionTo + "']").prop('checked',
				true);
		$("#users .submenu").each(function() {
			var location = $(this).prev('.check').attr('data-location');
			if (location !== actionTo)
				$(this).hide();
		});
		$("#user" + actionTo.capitalizeFirstLetter()).val(nameOrEmailOrSku);
	};

	var filterDressAction = function(actionTo, nameOrSize) {
		$("#dresses input[data-location='" + actionTo + "']").prop('checked',
				true);
		$("#dresses .submenu").each(function() {
			var location = $(this).prev('.check').attr('data-location');
			if (location !== actionTo)
				$(this).hide();
		});
		$("#dress" + actionTo.capitalizeFirstLetter()).val(nameOrSize);
	};
	
	var filterAddressAction = function(actionTo, address) {
		$("#enderecos input[data-location='" + actionTo + "']").prop('checked',
				true);
		$("#enderecos .submenu").each(function() {
			var location = $(this).prev('.check').attr('data-location');
			if (location !== actionTo)
				$(this).hide();
		});
		$("#" + actionTo).val(address);
	};

	var setFilterColor = function() {
		$(".filter").css("background-color", "red");
	};

	var checkChildren = function(id) {
		var object = $("#" + id + " .menu input[class='check']");
		object.removeAttr("checked");
		object.next(".submenu").slideUp();
		var inputObjects = object.next(".submenu").find("input");
		inputObjects.each(function() {
			$(this).val("");
		});
	};

	var init = function() {
		var startDate = getURLParameter("startDate");
		var endDate = getURLParameter("endDate");
		var dateType = getURLParameter("dateType");
		var returnType = getURLParameter("returnType");
		var email = getURLParameter("email");
		var name = getURLParameter("name");
		var deliveryType = getURLParameter("deliveryType");
		var dressName = getURLParameter("dressName");
		var dressSize = getURLParameter("dressSize");
		var orderStatus = getURLParameter("orderStatus");
		var toOrder = getURLParameter("toOrder");
		var orderBy = getURLParameter("orderBy");
		var street = getURLParameter("street");
		var city = getURLParameter("city");
		var uf = getURLParameter("uf");
		var outSaoPaulo = getURLParameter("outSaoPaulo");

		$("input[value='" + orderBy + "']").prop('checked', true);

		if (toOrder != null) {
			var itemDiv = $("#toOrder-" + toOrder);
			$(".app-body").animate(
					{
						scrollTop : itemDiv.offset().top - 125
					},
					1000,
					function() {
						$("#toOrder-" + toOrder + " .code-title").fadeIn(300)
								.fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(
										300)
					});
		}

		if (startDate != null || endDate != null) {
			setFilterColor();
			$(".dates").prop('checked', true);
			$("#dates ul").show();
			if (dateType === 'collectDate') {
				filterDateAction('collectdate', startDate, endDate);
			} else if (dateType === 'rentDate') {
				filterDateAction('rentdate', startDate, endDate);
			} else if (dateType === 'devolutionDate') {
				filterDateAction('devolutiondate', startDate, endDate);
			}
		}

		if (name != null || email != null) {
			setFilterColor();
			$(".users").prop('checked', true);
			$("#users ul").show();
			if (name != null) {
				filterUserAction('name', name);
			}
			if (email != null) {
				filterUserAction('email', email);
			}
		}

		if (returnType != null) {
			setFilterColor();
			$(".fdevolucao").prop('checked', true);
			$("#forma-devolucao .menu ul").show();
			$("input[value='" + returnType + "']").prop('checked', true);
		}

		if (orderStatus != null) {
			setFilterColor();
			$(".ostatus").prop('checked', true);
			$("#order-status .menu ul").show();
			$("input[value='" + orderStatus + "']").prop('checked', true);
		}

		if (deliveryType != null) {
			setFilterColor();
			$(".fenvio").prop('checked', true);
			$("#forma-envio .menu ul").show();
			$("input[value='" + deliveryType + "']").prop('checked', true);
		}

		if (dressName != null) {
			setFilterColor();
			$(".dresses").prop('checked', true);
			$("#dresses ul").show();
			filterDressAction("name", dressName);
		}

		if (dressSize != null) {
			setFilterColor();
			$(".dresses").prop('checked', true);
			$("#dresses ul").show();
			filterDressAction("size", dressSize);
		}
		
		if (street != null) {
			setFilterColor();
			$(".enderecos").prop('checked', true);
			$("#enderecos ul").show();
			filterAddressAction("street", street);
		}
		
		if (city != null) {
			setFilterColor();
			$(".enderecos").prop('checked', true);
			$("#enderecos ul").show();
			filterAddressAction("city", city);
		}
		
		if (uf != null) {
			$("#uf option").each(function() {
				var v = $(this).val().trim();
				if ( v === uf ) {
					$(this).attr('selected', true);
				}
			});
			
			if (city == null && street == null) {
				setFilterColor();
				$(".enderecos").prop('checked', true);
				$("#enderecos ul").show();
				filterAddressAction("uf", uf);
			}
		}
		
		if (outSaoPaulo != null) {
			outSaoPaulo = outSaoPaulo == "true" ? true : false;
			if (outSaoPaulo == true) {
				setFilterColor();
				$("#outSaoPaulo").prop('checked', true);
			} else {
				$("#outSaoPaulo").prop('checked', false);
			}
		}
		
	};

	var parseDateToGet = function(date) {
		date = date.split("/");
		return date[0] + "-" + date[1] + "-" + date[2];
	};

	var revertDateFromGet = function(date) {
		if (date == null)
			return null;
		date = date.split("-");
		return date[0] + "/" + date[1] + "/" + date[2];
	}

	var removeURLParameter = function(url, parameter) {
		var urlparts = url.split('?');
		if (urlparts.length >= 2) {

			var prefix = encodeURIComponent(parameter) + '=';
			var pars = urlparts[1].split(/[&;]/g);

			for (var i = pars.length; i-- > 0;) {
				if (pars[i].lastIndexOf(prefix, 0) !== -1) {
					pars.splice(i, 1);
				}
			}

			url = urlparts[0] + '?' + pars.join('&');
			return url;
		} else {
			return url;
		}
	}

	var showSequence = function(id, thiz) {
		var isChecked = $(thiz).prop('checked');
		$("#" + id + " .menu .check").removeAttr('checked');
		$('#' + id + " .menu .submenu").each(function() {
			$(this).find("input[type='text']").val("");
			$(this).slideUp();
		});

		if (isChecked) {
			var location = thiz.data('location');

			if (location.indexOf('date') > -1) {

				$("#" + location + "Start").datetimepicker({
					pickTime : false,
					format : "DD/MM/YYYY"
				});

				$("#" + location + "End").datetimepicker({
					pickTime : false,
					format : "DD/MM/YYYY"
				});

			}

			$(thiz).prop('checked', true);
			$(thiz).next('.submenu').slideDown('slow');
		}
	};

	var replaceAll = function(str, from, to) {
		var pos = str.indexOf(from);
		while (pos > -1) {
			str = str.replace(from, to);
			pos = str.indexOf(from);
		}
		return (str);
	}
	
	function run_waitMe() {
		$('#SELECTOR').show();
		$('#SELECTOR').waitMe({
			effect: 'bounce',
			text: 'Carregando...',
			bg: 'rgba(255,255,255,0.7)',
			color: '#000',
			sizeW: '',
			sizeH: '',
			source: '../images/img.svg'

		});
	}

	$(".filter").on("click", function() {
		$(".filter-box").toggle('slow');
	});

	$(".fdevolucao").on("click", function() {
		$("#forma-devolucao .menu ul").toggle('slow', function() {
			var hasOneItem = $("#f-devolucao:checked").val();
			var isChecked = $("#forma-devolucao .menu ul").is(':hidden');
			if (isChecked && hasOneItem !== undefined) {
				$("input[value='" + hasOneItem + "']").prop('checked', false);
			}
		});
	});

	$(".fenvio").on("click", function() {
		$("#forma-envio .menu ul").toggle('slow', function() {
			var hasOneItem = $("#f-envio:checked").val();
			var isChecked = $("#forma-envio .menu ul").is(':hidden');
			if (isChecked && hasOneItem !== undefined) {
				$("input[value='" + hasOneItem + "']").prop('checked', false);
			}
		});
	});

	$(".ostatus").on("click", function() {
		$("#order-status .menu ul").toggle('slow', function() {
			var hasOneItem = $("#o-status:checked").val();
			var isChecked = $("#order-status .menu ul").is(':hidden');
			if (isChecked && hasOneItem !== undefined) {
				$("input[value='" + hasOneItem + "']").prop('checked', false);
			}
		});
	});

	$(".check").on("click", function() {
		var id = $(this).data('id');
		var thiz = $(this);
		showSequence(id, thiz);
	});

	$(".head-menu-check").on("click", function() {
		var id = $(this).next("ul").attr("id");
		$(this).next("ul").toggle('slow', function() {
			var isVisible = $(this).is(":visible");
			if (!isVisible) {
				checkChildren(id);
			}
		});
	});

	$("body").on("click","#statusUpdate", function() {
		var thiz = $(this), link = thiz.data('link'), order = thiz.data('order'), sku = thiz.data('sku');
	
		var fullURL = window.location.href;
	
		if (fullURL.indexOf('toOrder') > -1) {
			fullURL = removeURLParameter(fullURL, "toOrder");
		}
	
		var parameters = fullURL, parameters = parameters.split("?"), parameters = parameters[1];
	
		if (parameters) {
			parameters = replaceAll(parameters, '&', ';');
			parameters = replaceAll(parameters, '=', ':');
		}
	
		var url = "/skutrack/flow/show/sku/" + sku + "/order/" + order;
	
		if (parameters != null) {
			url += "?parameters=" + parameters + ";toOrder:"
					+ order;
		} else {
			url += "?parameters=toOrder:" + order;
		}
	
		window.location.href = url;
	});

	$(".skuOrderLine").on("click", function() {
		var id = $(this).data("id");
		$("#orderLine-" + id).toggle('slow', function() {
			var isVisible = $(this).is(":visible");
			if (isVisible) {
				var i = $(this).prev("i");
				i.removeClass("glyphicon-chevron-down");
			}
		});
		$(this).toggleClass('active');
	});

	$(document).keypress(function(e) {
		if (e.which == 13) {
			$(".send").click();
		}
	});

	$(".send").on("click",function() {
		run_waitMe(current_effect);
		var selectSend = "";
		var start = "";
		var end = "";

		var rentdateStart = $("#rentdateStart").val().trim();
		var rentdateEnd = $("#rentdateEnd").val().trim();
		var collectdateStart = $("#collectdateStart").val().trim();
		var collectdateEnd = $("#collectdateEnd").val().trim();
		var devolutiondateStart = $("#devolutiondateStart").val().trim();
		var devolutiondateEnd = $("#devolutiondateEnd").val().trim();
		var returnType = $("#f-devolucao:checked").val() === undefined ? "" : $("#f-devolucao:checked").val();
		var deliveryType = $("#f-envio:checked").val() === undefined ? "" : $("#f-envio:checked").val();
		var orderStatus = $("#o-status:checked").val() === undefined ? "" : $("#o-status:checked").val();
		var orderBy = $("#orderBy:checked").val() === undefined ? "" : $("#orderBy:checked").val();
		var name = $("#userName").val().trim();
		var email = $("#userEmail").val().trim();
		var dressName = $("#dressName").val().trim();
		var dressSize = $("#dressSize").val().trim();
		
		var street =  $("#street").val().trim();
		var city   =  $("#city").val().trim();
		var uf     =  $("#uf option:selected").val();
		
		var outSaoPaulo = $('#outSaoPaulo').prop('checked');

		if (rentdateStart != "" && rentdateEnd != "") {
			start = parseDateToGet(rentdateStart);
			end = parseDateToGet(rentdateEnd);
			selectSend = "rentDate";
		} else if (rentdateStart != "" && rentdateEnd == "") {
			start = parseDateToGet(rentdateStart);
			end = "";
			selectSend = "rentDate";
		} else if (rentdateStart == "" && rentdateEnd != "") {
			start = "";
			end = parseDateToGet(rentdateEnd);
			selectSend = "rentDate";
		} else if (collectdateStart != ""
				&& collectdateEnd != "") {
			start = parseDateToGet(collectdateStart.trim());
			end = parseDateToGet(collectdateEnd.trim());
			selectSend = "collectDate";
		} else if (collectdateStart != ""
				&& collectdateEnd == "") {
			start = parseDateToGet(collectdateStart.trim());
			end = "";
			selectSend = "collectDate";
		} else if (collectdateStart == ""
				&& collectdateEnd != "") {
			start = "";
			end = parseDateToGet(collectdateEnd.trim());
			selectSend = "collectDate";
		} else if (devolutiondateStart != ""
				&& devolutiondateEnd != "") {
			start = parseDateToGet(devolutiondateStart.trim());
			end = parseDateToGet(devolutiondateEnd.trim());
			selectSend = "devolutionDate";
		} else if (devolutiondateStart != ""
				&& devolutiondateEnd == "") {
			start = parseDateToGet(devolutiondateStart.trim());
			end = "";
			selectSend = "devolutionDate";
		} else if (devolutiondateStart == ""
				&& devolutiondateEnd != "") {
			start = "";
			end = parseDateToGet(devolutiondateEnd.trim());
			selectSend = "devolutionDate";
		}
	
		var hostname = window.location.hostname;
		var protocol = window.location.protocol;
		var port = window.location.port;

		var url = "";
		if (port) {
			url = protocol + "//" + hostname + ":" + port;
		} else {
			url = protocol + "//" + hostname;
		}

		url += "/admin/orderlistcontroller?startDate=" + start + "&endDate=" + end + "&dateType=" + selectSend + "&page=1&returnType=" + returnType + "&email=" + email + "&name=" + name + "&deliveryType=" + deliveryType + "&dressName=" + dressName + "&dressSize=" + dressSize + "&orderStatus=" + orderStatus + "&orderBy=" + orderBy + "&street=" + street + "&city=" + city + "&outSaoPaulo=" + outSaoPaulo;
		if ( $(".enderecos").prop('checked') == true ) {
			url += "&uf="+ uf;
		}
		window.location.href = url;

	});

	$(".address-dropdown").on("click", function() {
		var order = $(this).data("order");
		$("#address-dropdown-" + order).toggle('slow');
	});

	$(".dados-pedido-dropdown").on("click", function() {
		var order = $(this).data("order");
		$("#dados-pedido-dropdown-" + order).toggle('slow');
	});

	init();
	
});