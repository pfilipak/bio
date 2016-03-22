$(function() {
	
	//JQuery events
	var visitDateSelected = new Date();
	
	$("#visitDate").datepicker({
		format:    'dd/mm/yyyy'
	}).on('changeDate', function(e) {
		var selectedDate = new Date( e.date.getFullYear(), e.date.getMonth(), e.date.getDate(), 0, 0, 0 );
		var today = getToday();
		
		if (selectedDate < today) {
			var html = "<span class='text-danger'>A data da visita não pode ser menor que a data de hoje.</span>";
			visitDateSelected = selectedDate;
			$(this).addClass('datepicker-error');
			$(this).after(html);
		}
	});
	
	$("#eventDate").datepicker({
		format: 'dd/mm/yyyy',
		startDate: visitDateSelected
	}).on('changeDate', function(e) {
		var selectedDate = new Date( e.date.getFullYear(), e.date.getMonth(), e.date.getDate(), 0, 0, 0 );
		
		var dateValidate = $("#visitDate").val();
		if (dateValidate === "undefined") {
			console.log('selecione uma data para visita');
			return;
		}
		
		var visitDate = generateDate(dateValidate);
		if (selectedDate < visitDate) {
			var html = "<span class='text-danger'>A data do evento nao pode ser menor que a data da visita .</span>";
			$(this).addClass('datepicker-error');
			$(this).after(html);
		}
	});
	
	$("#saveThis").on('click', function(e) {
		e.preventDefault();
		
		var name  	  = $("input[name='object.name']").val();
		var email 	  = $("input[name='object.email']").val();
		var phone 	  = $("input[name='object.phone']").val();
		var visitDate = $("input[name='object.visitDate']").val();
		var visitHour = $("input[name='object.visitHour']").val();
		var eventDate = $("input[name='object.eventDate']").val();
		
		$("input[name='object.name']").nextAll().remove();
		$("input[name='object.email']").nextAll().remove();
		$("input[name='object.phone']").nextAll().remove();
		$("input[name='object.visitDate']").nextAll().remove();
		$("input[name='object.visitHour']").nextAll().remove();
		$("input[name='object.eventDate']").nextAll().remove();
		
		if (name === '') {
			var html = "<span class='text-danger'>Favor adionar um nome .</span>";
			$("input[name='object.name']").after(html);
			return;
		} else if (name.length < 2) {
			var html = "<span class='text-danger'>Tamanho de nome inválido .</span>";
			$("input[name='object.name']").after(html);
			return;
		} 
		
		
		if (email === '') {
			var html = "<span class='text-danger'>Favor adicionar um e-mail .</span>";
			$("input[name='object.email']").after(html);
			return;
		} else if (!validateEmail(email)) {
			var html = "<span class='text-danger'>Favor adicionar um e-mail válido .</span>";
			$("input[name='object.email']").after(html);
			return;
		}
		
		if (phone === '') {
			var html = "<span class='text-danger'>Favor adicionar um telefone .</span>";
			$("input[name='object.phone']").after(html);
			return;
		}
		
		if (visitDate === '') {
			var html = "<span class='text-danger'>Favor adicionar uma data de visita .</span>";
			$("input[name='object.visitDate']").after(html);
			return;
		}
		
		if (visitHour === '') {
			var html = "<span class='text-danger'>Favor adicionar a hora da visita .</span>";
			$("input[name='object.visitHour']").after(html);
			return;
		}
		
		if (eventDate === '') {
			var html = "<span class='text-danger'>Favor adicionar a data do evento .</span>";
			$("input[name='object.eventDate']").after(html);
			return;
		}
		
		$(".form-horizontal").submit();
		
	});
	
	var validateEmail = function(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
	};

	$("#visitDate").focus(function() {
		$(this).removeClass('datepicker-error');
		$(this).nextAll().remove();
	});
	
	$("#eventDate").focus(function() {
		$(this).removeClass('datepicker-error');
		$(this).nextAll().remove();
	});
	
	//private functions
	var getToday = function() {
		var tmpToday = new Date();
		var d = tmpToday.getDate();
		var m =  tmpToday.getMonth();
		//m += 1;
		var y = tmpToday.getFullYear();
		var today = new Date( y, m, d, 0, 0, 0 );
		return today;
	}
	
	var generateDate = function(value) {
		var tmpDate = value.split("/");
		var d = tmpDate[0];
		var m =  tmpDate[1] - 1;
		var y = tmpDate[2];
		var date = new Date( y, m, d, 0, 0, 0 );
		return date;
	};
	
});