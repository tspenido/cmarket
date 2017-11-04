<?php
extract($_POST);
$charset = "utf-8";
$cpassunto= "Orçamento solicitado.";
$cpemail  = $Email;
$to       = "contato@hdsuporte.com.br";
$data     = date("d/m/y");
$hora     = date("H:i");
$corpo    = "E-mail enviado pelo site com o assunto: ORÇAMENTO<br><br><br>";
$corpo   .= "Nome: $Nome<br>";
$corpo   .= "Telefone: $Fone<br>";
$corpo   .= "E-mail: $Email<br>";
$corpo   .= "Serviço solicitado: $Sev<br>";
$corpo   .= "Observações: $Obs<br>";
$corpo   .= "Data e Hora do envio: $data - $hora<br>";
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=".$charset."\r\n";
$headers .= "From: ".$cpemail."\r\n";
//mail($to, $cpassunto, $corpo, $headers);
if(!mail($to, $cpassunto, $corpo, $headers)){
	$retorno = "no";
}else{
	$retorno = "ok";
}
echo("$retorno");
?>