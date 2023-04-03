$(document).on('ready', function(){

/*--- MENU ---*/  
  /*scroll*/
  $(window).on('scroll', function(){
    altoScroll = $(window).scrollTop();
    if(altoScroll>90){
      $('.Caja-nav').addClass('sticky');
      $('.Caja-nav').css('height','60px');
      $('.Caja-nav').css('width','calc(100% - 60px)');
      $('#Boton-menu').css('top','17px');
      $('.Menu1').css('top', '60px');
      $('.Menu2').css('top', '193px');
      $('.Menu a>.raya').addClass('after');
      $('.Menu a>.raya').removeClass('before');
    }else{
      $('.Caja-nav').removeClass('sticky');
      $('.Caja-nav').css('height','90px');
      $('.Caja-nav').css('width','100%');
      $('#Boton-menu').css('top','32px');
      $('.Menu1').css('top', '90px');
      $('.Menu2').css('top', '223px');
      $('.Menu a>.raya').addClass('before');
      $('.Menu a>.raya').removeClass('after');
    }
  });

  /*raya fija en elemento con nombre igual a la página*/ 
  if($("[href='#']")){
    $("[href='#']>.raya").css('opacity','1');
  }

  /*menu desplegable*/  
  var estado ='cerrado';
  $("#Boton-menu").on('click', function(){
    if(estado == 'cerrado'){
      $('.Menu1').slideDown(100,function(){
        $('.Menu2').slideDown(100);
      });
      estado ='abierto';
    }else{
      $('.Menu2').slideUp(100,function(){
        $('.Menu1').slideUp(100);
      });
      estado ='cerrado';
    } 
  });
  
  /*cambio ancho pantalla*/
  $(window).on('resize', function(){
    var anchoPantalla = $(window).width();
    /*desface: 17px (@med-1239, resize-1222)*/
    if(anchoPantalla>1222){
      $('.Menu').css('display', 'flex');
      $('.Menu').css('flex-direction', 'row');
    }else{
      $('.Menu').css('display', 'none');
    }   
  });
/*-- FIN MENU --*/





/*-- OUR MODELS(2) --*/
  /*menu galeria*/
  all = $(".MdSec1 ul>li:first-child");
  actress = $(".MdSec1 ul>li:nth-child(2)");
  dancer = $(".MdSec1 ul>li:nth-child(3)");
  model = $(".MdSec1 ul>li:nth-child(4)");
  tradeshow = $(".MdSec1 ul>li:last-child");
  M1 = $('.MdSec1 .Foto1');
  M2 = $('.MdSec1 .Foto2');
  M3 = $('.MdSec1 .Foto3');
  M4 = $('.MdSec1 .Foto4');
  M5 = $('.MdSec1 .Foto5');
  M6 = $('.MdSec1 .Foto6');
  M7 = $('.MdSec1 .Foto7');
  M8 = $('.MdSec1 .Foto8');
  M9 = $('.MdSec1 .Foto9');

  all.on('click', function(){
    M1.add(M2).add(M3).add(M4).add(M5).add(M6).add(M7).add(M8).add(M9).show();
    $(".MdSec1 ul>li").css('color','#858585');
    $(this).css('color','#081025');
    $(".MdSec1 li>.raya").hide();
    $(".MdSec1 ul>li:first-child>.raya").show();
  });
  actress.on('click', function(){
    M1.add(M2).add(M4).add(M5).add(M6).show();
    M3.add(M7).add(M8).add(M9).hide();
    $(".MdSec1 ul>li").css('color','#858585');
    $(this).css('color','#081025');
    $(".MdSec1 li>.raya").hide();
    $(".MdSec1 ul>li:nth-child(2)>.raya").show();
  });
  dancer.on('click', function(){
    M2.add(M6).add(M7).add(M8).show();
    M1.add(M3).add(M4).add(M5).add(M9).hide();
    $(".MdSec1 ul>li").css('color','#858585');
    $(this).css('color','#081025');
    $(".MdSec1 li>.raya").hide();
    $(".MdSec1 ul>li:nth-child(3)>.raya").show();
  });
  model.on('click', function(){
    M2.add(M5).add(M7).show();
    M1.add(M3).add(M4).add(M6).add(M8).add(M9).hide();
    $(".MdSec1 ul>li").css('color','#858585');
    $(this).css('color','#081025');
    $(".MdSec1 li>.raya").hide();
    $(".MdSec1 ul>li:nth-child(4)>.raya").show();
  });
  tradeshow.on('click', function(){
    M2.add(M3).add(M6).add(M8).add(M9).show();
    M1.add(M4).add(M5).add(M7).hide();
    $(".MdSec1 ul>li").css('color','#858585');
    $(this).css('color','#081025');
    $(".MdSec1 li>.raya").hide();
    $(".MdSec1 ul>li:last-child>.raya").show();
  });

  /*lupa (our models) - agranda foto*/
  $(".MdSec1 .Tapa-link .fa-search").on('click', function(){
    var srcFotoMd = $(this).parents(".Foto").children("img").attr('src');
    $('.MdSec1 .Modal img').attr("src",srcFotoMd);
    $('.MdSec1 .Modal').fadeIn(200);
  });
  $('.MdSec1 .Modal').on('click', function(){
    $(this).fadeOut('fast');
  });
/*-- FIN OUR MODELS(2) --*/





/*-- DETAILS(3) --*/
  /*lupa (details) - agranda foto*/
  $('.DtSec2 .Tapa').on('click', function(){
    var srcFotoDt = $(this).prev().attr('src');
    $('.DtSec2 .Light>img').attr("src",srcFotoDt);
    $('.DtSec2 .Light-content').fadeIn(200);  
  });
  $('.DtSec2 .Light-content').on('click', function(){
    $(this).fadeOut('fast');
  });
/*-- FIN DETAILS(3) --*/



/* getUrl() */
  const getUrl = () => {
    return window.location.search.substring(1);
  }

  const ArrLinks = document.getElementsByTagName("a");
  const setLinks = idioma =>{
    for(let k=0; k<ArrLinks.length; k++){
      let hRef = ArrLinks[k].getAttribute("href");
      if(hRef == "../index.html") ArrLinks[k].setAttribute("href", hRef+"?S3&"+idioma);
      else ArrLinks[k].setAttribute("href", hRef+"?"+idioma);
    }
  }
  setLinks(getUrl());

//  fin
});