
<?php
  
  $to = "fasca85@gmail.com";
  $subject = $_POST['email']." - ".$_POST["asunto"];   
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion();
  
  $message = '
  <html>
  <body>
    <p style="margin: 0 0 5px 5px">Nombre: '.$_POST["nombre"].'</p>
    <p style="margin: 0 0 5px 5px">Email: '.$_POST["email"].'</p>
    <p style="margin: 0 0 5px 5px">Asunto: '.$_POST["asunto"].'</p>
    <p style="margin: 5px 0 5px 10px">'.$_POST["mensaje"].'</p>
  </body>
  </html>
  '; 
  

  mail($to ,$subject ,$message ,$headers);

  echo "<script>
        window.open('','_self','');
        window.close();
        </script>";
?>
