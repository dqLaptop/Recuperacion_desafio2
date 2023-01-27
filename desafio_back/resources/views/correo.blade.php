<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta name="author" content="Isabel">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Verificación correo</title>
</head>

<body>
    <?php echo 'Bienvenido ' . $nombreUsuario. ' tu correo a verificar es ' . $email; ?>
<br>
    <a href=<?php echo 'http://127.0.0.1:8000/api/modificar/'. $idUsu; ?> >Pincha aquí para verificarlo</a>
</body>

</html>
