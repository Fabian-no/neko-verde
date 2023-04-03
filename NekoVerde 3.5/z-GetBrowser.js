  function get_browser() {
    var ua = navigator.userAgent,tem,M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
      tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
      return {name:'IE',version:(tem[1]||'')};
    }   
    if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR|Edge\/(\d+)/)
      if(tem!=null){return {name:'Opera', version:tem[1]};}
    }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null){M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
  }

  var browser = get_browser();
  console.log(browser.name);
  console.log(browser.version);

  var brName = browser.name;
  var brVer = browser.version;

  if(window.location.href.includes("index")){
    if(brName == "Chrome"){
    }else if(brName == "Firefox" || brName == "Safari"){
      if(window.navigator.language.includes("es")){
        alert("Es posible que el contenido no se vea correctamente en esta versión del navegador. \nPara una correcta visualización utiliza Chrome en sus últimas versiones.");
      }else{
        alert("Some features might not be displayed correctly on this browser version.\nTo ensure a proper display please use CHROME in its latest versions.");
      }  
    }
    else{
      window.location ="tryAnotherBrowser.html";
    }
  }
  
