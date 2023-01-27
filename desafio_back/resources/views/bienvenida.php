<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

    <meta name="author" content="Manuel Hergueta">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bienvenida</title>
</head>

<body>
    <h1>
        <?php echo 'Bienvenido al Olimpo, '.strtoupper($nombreUsuario); ?>
    </h1>
<br><br><br>
    <div>
        <p>Su correo a sido verificado satisfactoriamente</p>
        <br>
        <p><?php echo 'En esta travesía por el Olimpo ha sido asignado al dios: '.strtoupper($nombreDios); ?></p>
        <p><?php echo 'Para comunicarte con tu dios, con el debido respeto, puedes usar nuestro sistema Hermes,
        enviandole un email a '.$emailDios; ?></p>
    </div>
    <div>
        <p>Cuentas con estos valores iniciales en tus atributos: 
        <?php 
        echo '<table>';
        echo '<tr>';
        echo '  <th> Atributo </th>';
        echo '  <th> Valor </th>';
        echo '</tr>';
        echo '<tr>';
        echo '  <td> Sabiduria </td>';
        echo '  <td> '.$atributos[0].'</td>';
        echo '</tr>';
        echo '<tr>';
        echo '  <td> Nobleza </td>';
        echo '  <td> '.$atributos[1].'</td>';
        echo '</tr>';
        echo '<tr>';
        echo '  <td> Virtud </td>';
        echo '  <td> '.$atributos[2].'</td>';
        echo '</tr>';
        echo '<tr>';
        echo '  <td> Maldad </td>';
        echo '  <td> '.$atributos[3].'</td>';
        echo '</tr>';
        echo '<tr>';
        echo '  <td> Astucia </td>';
        echo '  <td> '.$atributos[4].'</td>';
        echo '</tr>';?>
        </p>
    </div>
</body>

</html>
