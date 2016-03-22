$(function() {	

	$("#vestidos").select2();
	$("#usuarios-lista").select2();
	
	/* Script para vestido */
	$('#substituir-vestido').click(function(e) {				
		 e.preventDefault();
		 $(".select2-chosen").text($("#vestidos option:first").text());
		 $("#agendamento-modal").bPopup();
		 
		 var selectVestido = $("#vestidos");
		 selectVestido.find('option').remove();				 
		 
		
		$("#loading-modal").show();
		selectVestido.hide();
		$.get('/sku/all', function(data) {
			var vestidos = data;
			vestidos.forEach(function(v, i) {
				if (v[2] !== null)
					var html = '<option value="' + v[0] + '">' + v[1] + ' (' + v[2] + ') </option>';
				else
					var html = '<option value="' + v[0] + '">' + v[1] + ' </option>';
				selectVestido.append(html);
			});					
		});
		
		$("#loading-modal").hide();
		selectVestido.show();				
	});
	
	$("#vestido-cancel").click(function(e) {
		e.preventDefault();
		var selectVestido = $("#vestidos");
		selectVestido.find('option').remove();
		$("#agendamento-modal").bPopup().close();
	});
	
	$("#vestido-ok").click(function(e) {
		e.preventDefault();
		
		var selectedItem     = $("#vestidos").val();
		var selectedItemText = $("#vestidos option:selected").text();
		
		$("#sku").val(selectedItemText);
		$("#object_sku_id").val(selectedItem);
		$("#agendamento-modal").bPopup().close();
	});
	
	/* Script para usuario */
	$("#substituir-usuario").click(function(e) {
		e.preventDefault();
		
		cleanAll();
		$('#user-email').val('');
		
		var item = $("#item");				
		item.removeAttr('data-id');
		item.removeAttr('data-email');
		
		$("#usuario-modal").bPopup();				
	});
	
	$("#usuario-buscar").click(function(e) {
		var email = $("#user-email").val();
		
		cleanAll();
		
		$.post("/admin/user/"+email, function(data) {
			var users = data;
			if (users.length === 0) {
				$('.show-no-data').show();
			} else if (users.length === 1) {
				forOneResult(users[0]);
			} else {
				forListResult(users);
			}
		});
	});
	
	$("#item").click(function(e) {
		e.preventDefault();
		
		var item = $("#item");
		
		var id = item.data('id');
		var email = item.data('email');
		
		$("#object_usur_id").val(id);
		$("#user").val(email);
		
		$("#usuario-modal").bPopup().close();
		
	});
	
	$("#usuario-ok").click(function(e) {
		e.preventDefault();
		
		var selectedItem     = $("#usuarios-lista").val();
		var selectedItemText = $("#usuarios-lista option:selected").text();
		var split = selectedItemText.split(' - ');
		selectedItemText = split[0].trim();
		
		$("#user").val(selectedItemText);
		$("#object_usur_id").val(selectedItem);
		$("#usuario-modal").bPopup().close();
		
	});
	
	var forOneResult = function(user) {
		
		$('.show-one-item').show();
	
		var id        = user[0];
		var email     = user[3] === '' ? 'não informado' : user[3];
		var nome      = user[1] === '' ? 'não informado' : user[1];
		var sobrenome = user[2] === '' ? 'não informado' : user[2];
		
		var item = $("#item");
		
		item.attr('data-id', id);
		item.attr('data-email', email);
		
		var result = email + ' - ' + nome + ' ' + sobrenome;
		$('#item').text(result);
		
	}; 
	
	var forListResult = function(items) {
		
		$("#usuarios-lista").find('option').remove();
		items.forEach(function(v, i) {		
			
			var id        = v[0];
			var email     = v[3] === '' ? 'não informado' : v[3];
			var nome      = v[1] === '' ? 'não informado' : v[1];
			var sobrenome = v[2] === '' ? 'não informado' : v[2];
			
			var html = '<option value="' + id + '">' + email + ' - ' + nome + ' ' + sobrenome + '</option>';
			$("#usuarios-lista").append(html);					
		});
		$(".show-items").show();
	};
	
	var cleanAll = function() {				
		$('.show-items').hide();
		$('.show-one-item').hide();
		$('.show-no-data').hide();
	};

	$("#substituir-pedido").click(function(e) {
		e.preventDefault();
		$("#pedido-modal").bPopup();
	});

	$(".pedido-cancel").click(function(e) {
		e.preventDefault();

		$(".pedido-control").hide('slow', function() {		
			$(".pedido-result").slideUp('slow', function() {
				$(".pedido-result").html("");
				$("#pedido-modal").bPopup().close();
			});
		});

	});

	$(".pedido-ok").click(function(e) {
		$(".pedido-control").hide('slow', function() {		
			$(".pedido-result").slideUp('slow', function() {
				var selectedId = $("#pedidoId").text();
				$(".pedido-result").html("");
				$("#pedido-modal").bPopup().close();
				$("#order").val(selectedId);
			});
		});
	});

	$("#pedido-buscar").click(function(e) {
		e.preventDefault();

		$(".pedido-result").slideUp(function() {

			var id = $("#pedido-id").val();

			if (id) {
			
				var url = "/admin/order/" + id
			
				$.post(url, function(data) {

					var html = "<hr />";
					html += "<p><b>Id:</b> <span id='pedidoId'>" + id + "</span></p>";

					if (data.subtotal) {
						html += "<p><b>Subtotal:</b> " + data.subtotal + "</p>";
					}

					if (data.user.email) {
						html += "<p><b>E-mail:</b> " + data.user.email + "</p>";
					}

					if (data.user.firstName) {
						html += "<p><b>Nome:</b> " + data.user.firstName + "</p>";
					}

					if (data.user.lastName) {
						html += "<p><b>Sobrenome:</b> " + data.user.lastName + "</p>";
					}

					if (data.freightTotal) {
						html += "<p><b>Preço total do frente</b> " + data.freightTotal + "</p>";
					}

					if (data.total) {
						html += "<p><b>Preço total</b> " + data.total + "</p>";
					}

					$(".pedido-result").html(html);
					$(".pedido-result").slideDown(function() {
						$(".pedido-control").show('slow');
					});
				});
			}

		});		
	});

	$("#collectDate").datetimepicker({
		pickTime: false,
		format: "DD/MM/YYYY"
	});

	$("#rentDate").datetimepicker({
		pickTime: false,
		format: "DD/MM/YYYY"
	});

	$("#devolutionDate").datetimepicker({
		pickTime: false,
		format: "DD/MM/YYYY"
	});

	$("#availableDate").datetimepicker({
		pickTime: false,
		format: "DD/MM/YYYY"
	});
	
});