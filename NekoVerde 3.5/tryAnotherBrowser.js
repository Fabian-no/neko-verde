document.addEventListener("DOMContentLoaded", function(){
  
  if(window.navigator.language.includes("es")){
    $("h2").html(
      "Este navegador no soporta algunas de las carasterísticas de esta página. <br><br> Para poder acceder, por favor, utiliza CHROME en sus últimas versiones."
    );
  }else{
    $("h2").html(
      "This browser does not support some of the features on this web page. <br><br> In order to access, please use CHROME in its latest versions."
    );
  }

});