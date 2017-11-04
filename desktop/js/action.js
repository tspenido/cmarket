
/*FUNÇÕES*/
/**
 * @function isMobile
 * detecta se o useragent e um dispositivo mobile
 */
function isMobile() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1) {

		location.href = "../mobile/";
	}

}

function LimpaMarcacao(cp1, cp2, cp3, cp4, cp5) {

	Marcacao(cp1, '#bfbfbf');
	Marcacao(cp2, '#bfbfbf');
	Marcacao(cp3, '#bfbfbf');
	Marcacao(cp4, '#bfbfbf');
	Marcacao(cp5, '#bfbfbf');
}

function Marcacao(id, cor) {

	$(id).css('border', '2px solid ' + cor);
}

function AvisoTexto(id, TextoCampo) {

	$(id).text(TextoCampo);
}

function AnimacaoScroll(Numbr) {

	$('html, body').animate({
		scrollTop: Numbr
	}, 'slow');

}



//Inicia os eventos normais do jquery
jQuery(document).ready(function() {

	// alert(screen.width);

	isMobile();

	$(window).scroll(function() {

		// alert($(this).scrollTop());

		//Vê se foi movimentado o scroll
		if ($(this).scrollTop() > 1) {

			$('#BackMenu').css('position', 'fixed').css('margin-top','0px');
			$('#Logotipo img').css('width', '65%');
			$('#Logotipo').css('display', 'table').css('padding-top', '23px').css('margin','0px');
			$('nav').css('position', 'fixed').css('margin-left', '-431px').css('left', '50%');
			$('#Page_Home').css('margin', '174px auto 0');
			$('#menu').css('margin-left', '-184px').css('position', 'fixed').css('margin', '30px 0 38px 44px');

		} else {

			$('#BackMenu').css('position', 'relative').css('margin-top','29px');
			$('#Logotipo img').css('width', '100%');
			$('#Logotipo').css('display', 'table').css('padding-top', '23px').css('margin','0 auto');
			$('nav').css('position', 'relative');
			$('#Banners').css('position', 'relative');
			$('#Page_Home').css('margin', '407px auto 0');
			$('#menu').css('margin', '-76px 0 38px 44px').css('position', 'relative').css('margin-left', '-184px');
		}

	});


	$('.Botao1').click(function() {
		AnimacaoScroll('0');
	});

	$('.Botao2').click(function() {
		AnimacaoScroll('665');
	});

	$('.Botao3').click(function() {
		AnimacaoScroll('665');
	});

	$('.Botao4').click(function() {
		AnimacaoScroll('1025');
	});

	$('.Botao5').click(function() {
		AnimacaoScroll('1244');
	});

	$('.Botao6').click(function() {
		AnimacaoScroll('2460');
	});

	$('.Botao7').click(function() {
		AnimacaoScroll('3037');
	});

	$('.Botao8').click(function() {
		AnimacaoScroll('3726');
	});


	$('#BotaoOrcamento').click(function() {

		var Nome = $('#InputNome').val();
		var Email = $('#InputEmail').val();
		var Fone = $('#InputFone').val();
		var Sev = $('#SelectServico option:selected').val();
		var Obs = $('#TextareaObs').val();

		/*VALIDANDO EMAIL*/
		//Variavel de filtro para o email
		var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var cor_no = "#d80000";
		var cor_ok = "#bfbfbf";


		if (Nome == '') {

			Marcacao('#InputNome', cor_no);

			AvisoTexto('#Page_Budget strong', 'Preencha o campo NOME corretamente.');

			$('#InputNome').focus();

			return false;

		} else if (Email == '') {

			LimpaMarcacao('#InputNome', '#InputEmail', '#InputFone', '#SelectServico', '#TextareaObs');

			Marcacao('#InputEmail', cor_no);

			AvisoTexto('#Page_Budget strong', 'Preencha o campo E-mail corretamente.');

			$('#InputEmail').focus();

			return false;


		} else if ((Email !== '') && (!filtro.test(Email))) {

			LimpaMarcacao('#InputNome', '#InputEmail', '#InputFone', '#SelectServico', '#TextareaObs');

			Marcacao('#InputEmail', cor_no);

			AvisoTexto('#Page_Budget strong', 'Preencha o campo com um E-mail Válido.');

			$('#InputEmail').focus();

			return false;


		} else if (Fone == '') {

			LimpaMarcacao('#InputNome', '#InputEmail', '#InputFone', '#SelectServico', '#TextareaObs');

			Marcacao('#InputFone', cor_no);

			AvisoTexto('#Page_Budget strong', 'Preencha o campo TELEFONE corretamente.');

			$('#InputFone').focus();

			return false;


		} else if (Sev == '') {

			LimpaMarcacao('#InputNome', '#InputEmail', '#InputFone', '#SelectServico', '#TextareaObs');

			Marcacao('#SelectServico', cor_no);

			AvisoTexto('#Page_Budget strong', 'Escolha um dos Serviços.');

			return false;

		} else {

			LimpaMarcacao('#InputNome', '#InputEmail', '#InputFone', '#SelectServico', '#TextareaObs');

			$.ajax({

				type: "POST",
				url: "php/e_orcamento.php",
				data: {
					Nome: Nome,
					Email: Email,
					Fone: Fone,
					Sev: Sev,
					Obs: Obs
				},
				success: function(data) {

					if (data != "ok") {

						alert('Ocorreu algum problema no envio de sua solicitação. Por favor tente novamente.');

						$('#Loading').css('display', 'none');

					} else {

						alert('Seu Email foi enviado com sucesso. A HELPDESK agradece seu contato e em breve estaremos retornando.');

						$('#Loading').css('display', 'none');

						$('#InputNome').val('');
						$('#InputEmail').val('');
						$('#InputFone').val('');
						$('#TextareaObs').val('');

						$('#InputNome').focus();

					}

				},
				erro: function() {

					alert('Ocorreu algum problema no envio de sua solicitação. Por favor tente novamente.');

					$('#Loading').css('display', 'none');

				},
				beforeSend: function() {

					$('#Loading').css('display', 'inline');
				}
			});

		}


	});

	$('#BotaoContato').click(function() {

		var Nome = $('#InputNm').val();
		var Eil = $('#InputEma').val();
		var Fon = $('#InputFon').val();
		var Assunto = $('#InputAssunto').val();
		var Emp = $('#InputEmpresa').val();
		var Mgs = $('#TextareaMsg').val();

		/*VALIDANDO EMAIL*/
		//Variavel de filtro para o email
		var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var cor_no = "#d80000";
		var cor_ok = "#bfbfbf";


		if (Nome == '') {

			Marcacao('#InputNm', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo NOME corretamente.');

			$('#InputNm').focus();

			return false;

		} else if (Eil == '') {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			Marcacao('#InputEma', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo E-mail corretamente.');

			$('#InputEma').focus();

			return false;


		} else if ((Eil !== '') && (!filtro.test(Eil))) {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			Marcacao('#InputEma', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo com um E-mail Válido.');

			$('#InputEma').focus();

			return false;


		} else if (Fon == '') {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			Marcacao('#InputFon', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo TELEFONE corretamente.');

			$('#InputFon').focus();

			return false;

		} else if (Assunto == '') {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			Marcacao('#InputAssunto', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo com a SOLICITAÇÃO.');

			$('#InputAssunto').focus();

			return false;

		} else if (Mgs == '') {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			Marcacao('#TextareaMsg', cor_no);

			AvisoTexto('#Form_Contats strong', 'Preencha o campo MENSAGEM corretamente.');

			$('#TextareaMsg').focus();

			return false;

		} else {

			LimpaMarcacao('#InputNm', '#InputEma', '#InputFon', '#InputAssunto', '#TextareaMsg, #InputEmpresa');

			$.ajax({

				type: "POST",
				url: "php/e_faleconosco.php",
				data: {
					Nome: Nome,
					Email: Eil,
					Fone: Fon,
					Assunto: Assunto,
					Empresa: Emp,
					Mgs: Mgs
				},
				success: function(data) {

					if (data != 'ok') {

						alert('Ocorreu algum problema no envio de sua solicitação. Por favor tente novamente.');

						$('#Loading').css('display', 'none');

					} else {

						alert('Seu Email foi enviado com sucesso. A HELPDESK agradece seu contato e em breve estaremos retornando.');

						$('#Loading').css('display', 'none');

						$('#InputNm').val('');
						$('#InputEma').val('');
						$('#InputFon').val('');
						$('#InputAssunto').val('');
						$('#TextareaMsg').val('');
						$('#InputEmpresa').val('');
						
						$('#InputNm').focus();

					}

				},
				erro: function() {

					alert('Ocorreu algum problema no envio de sua solicitação. Por favor tente novamente.');

					$('#Loading').css('display', 'none');

				},
				beforeSend: function() {

					$('#Loading').css('display', 'inline');
				}
			});

		}

	});

});