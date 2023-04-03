

window.addEventListener("load", function() {
  
/* ---- VARIABLES & OBJECTS ---- */
  /* KeyCodes */
  var ESCAPE_KEY = 27;
  var LEFT_KEY = 37, UP_KEY = 38, RIGHT_KEY = 39, DOWN_KEY = 40;
  var A_KEY = 65, W_KEY = 87, D_KEY = 68, S_KEY = 83;
  var SPACE_KEY = 32, CTRL_KEY = 17, L_KEY = 76;
  
  /* PRECARGAR IMÁGENES */
  var Images = ["pic1.jpeg", "pic2.jpeg", "pic3.png", "pic4.jpg", "pic5.jpg", "pic6.jpeg", "hat1.png", "hat2.png", "hat3.png", "hat4.png", "hat5.png", "hat-ending.png", "mosca_dead.png", "face2.png", "face5.png", "G3.png"];

  var DivImg = new Array();  
  function precargarImg(){
    var k = 0;
    while(k < Images.length){
      DivImg[k] = new Image();
      DivImg[k].src = "img/"+Images[k];
      k++;
    };
  }
  precargarImg();
  

  /* CREAR AUDIOS */
  var AUD_laser_SF = document.createElement("audio");
  AUD_laser_SF.src = "audio/laser_SF.mp3";
  var AUD_laser_TF = document.createElement("audio");
  AUD_laser_TF.src = "audio/laser_TF.mp3";
  
  var AUD_ovni_IN = document.createElement("audio");
  AUD_ovni_IN.src = "audio/ovni_IN.mp3";
  var AUD_ovni_OUT = document.createElement("audio");
  AUD_ovni_OUT.src = "audio/ovni_OUT.mp3";

  
  /* getElementBy... */
  var container = document.getElementById("container");
  var backGround = document.getElementById("backGround");
  var laser_gun = document.querySelector(".Laser-gun");
  var top_Bar = document.getElementById("top_Bar");
  var scorer_num = document.getElementById("scorer_num");
  var scorer_bar = document.getElementById("scorer_bar");
  var life_count = document.getElementById("life_count");

    /* Control Buttons */
  // var BttC = document.getElementsByClassName("BttC");
    /* btts */
  var Btts_Sound = document.getElementsByClassName("btt_sound");  
  // var Btts_Mode = document.getElementsByClassName("btt_Mode");
  var Btts_mControls = document.getElementsByClassName("btt_mControls");
  var Btts_mEnemies = document.getElementsByClassName("btt_mEnemies");
  var Btts_mLevel = document.getElementsByClassName("btt_mLevel");
  var Btts_mDif = document.getElementsByClassName("btt_mDif");
  var BttsLevel = document.getElementsByClassName("btt_level");
  var BttStart = document.getElementById("btt_start");
  
  var BttMenu = document.getElementById("btt_menu");
  var BttResume = document.getElementById("btt_resume");
  var BttsRestart = document.getElementsByClassName("btt_restart");
  var BttsBack = document.getElementsByClassName("btt_back");

    /* containers */
  var menu_main = document.getElementById("menu_main");
  var menu_controls = document.getElementById("menu_controls");
  var menu_enemies = document.getElementById("menu_enemies");
  var menu_level = document.getElementById("menu_level");
  var show_level_menu = document.getElementById("show_level_menu");

  var menu_pause = document.getElementById("menu_pause");
  var level_sign = document.getElementById("level_sign");
  // var rotate_sign = document.getElementById("rotate_sign");
  var notouch_sign = document.getElementById("notouch_sign");
  var gameOver = document.getElementById("gameover");
  var ending_sign = document.getElementById("ending_sign");
  
  var hat = document.getElementById("hat");
  var pajarita = document.getElementById("pajarita");
  
  /* others */
  // var MODE = "keyboard";
  var LEVEL = 1;
  var DIFF = "EASY";
  // var DIFF = "HARD";

  var PAUSE_ACTIVE = false;
  var PAUSE_ON = false;
  var ENDING = false;
  var CONTROLS_ON = true;
  var SOUND_ON = true;
  var loop_ITRV;
  var loop_TO;
  var OVNI_MOVEMENT = 5;
  var LASER_Reloading = false;
  var LASER_NormalReload = 1000;
  var LASER_FastReload = 300;
  var LASER_ReloadTime = LASER_NormalReload;
  var LASER_TripleON = false;
  var itemRF_TO;
  var itemTF_TO;
  var ITEM_EXISTS = false;

  var SCORE = 0;
  var LAST_SCORE = SCORE;
  var MAX_SCORE;
  var LIFE = "&hearts; ";
  var LIFE_COUNT = 3;
  
  var BOSS_STAGE = false;
  // var BOSS_STAGE = true;
  var BOSS_ON = false;
  
  /* Screen Sizes */
  var wind_W = window.innerWidth;
  var wind_H = window.innerHeight;
  var maxX = backGround.offsetWidth;
  var maxY = backGround.offsetHeight;

  /* Arrays n Objects */
  var Controller = {};
  var Boss = {};
  var Lasers = [];
  var Items = [];
  var Enemies = [];
  

  /* initial MODE */
  // if(wind_H >= wind_W || wind_W <= 600) MODE = "touch";
  // else MODE = "keyboard";

  /* TOUCH_SCREEN */
  var TOUCH_SCREEN;
  if(Modernizr.touchevents) TOUCH_SCREEN = true;
  else TOUCH_SCREEN = false;

  if(TOUCH_SCREEN && wind_W < 1000){
    notouch_sign.classList.remove("d_none");
  }
  


/* CONSTRUCTOR - Sprite() */
  function Sprite(elementId, x, y, w, h){
    this.element = document.getElementById(elementId);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  /* setOvniSize() */
  function setOvniSize(id, x, y, w, h, desface){
    // if(wind_H <= 430){
    //   w =  w * 0.7;
    //   h =  h * 0.7;
    //   desface = desface * 0.7;
    // }
    var element = new Sprite(id, x, y, w, h);
    element.desface = desface;
    element.OVNI_ON = false;
    //audio
    element.audio1 = document.createElement("audio");
    element.audio1.src = "audio/ovni_hit1.mp3";
    element.audio2 = document.createElement("audio");
    element.audio2.src = "audio/ovni_hit2.mp3";

    return element;
  }
  
  var ovni = setOvniSize("ovni", 20, maxY*0.3, 100, 50, 26);

  

  /* createLaser() */
  function createLaser(type, reloadTime){
    var difX = 20;
    var difY = 16;
    // var difX = (wind_H > 430) ? 20 : 10;
    // var difY = (wind_H > 430) ? 16 : 11;
    var laserName = type+getRandom(1000);
    var laserX = ovni.x - (difX - ovni.w);
    var laserY = ovni.y + difY;

    var laser = new Sprite(laserName, laserX, laserY, 20, 3);
    //element
    var element = document.createElement("div");
    element.id = laserName;
    element.className = type;
    if(reloadTime == LASER_FastReload) element.className = type+" Color_rapid_fire";
    backGround.prepend(element);
    //laser
    laser.remove = function(){
      laser.element.parentElement.removeChild(laser.element);
      Lasers.splice(Lasers.indexOf(laser), 1);
    }
    Lasers[Lasers.length] = laser;
    laser.element = document.getElementById(laserName);
    setTimeout(function() {
      LASER_Reloading = false;
    }, reloadTime);
  }

  /* SimpleLaser() */
  function SimpleLaser(reloadTime){
    if(!LASER_Reloading){
      LASER_Reloading = true;
      createLaser("laser", reloadTime);
      if(SOUND_ON) AUD_laser_SF.play();
    }
  }
  /* TripleLaser() */
  function TripleLaser(reloadTime){
    if(!LASER_Reloading){
      LASER_Reloading = true;
      for(let i=0; i<3; i++){
        createLaser("triple", reloadTime);
        Lasers[Lasers.length-1].bullet = i+1;
      }
      if(SOUND_ON) AUD_laser_TF.play();
    }
  }
  
  /* createItem() */
  function createItem(type, font_size){ 
    if(!ITEM_EXISTS){
      ITEM_EXISTS = true;
      var itemName = "item"+getRandom(1000);
      wnh = 35;
      // if(wind_H <= 430){
      //   wnh = wnh * 0.8;
      //   font_size = font_size * 0.8;
      // } 
      var item = new Sprite(itemName, maxX, getRandom(maxY), wnh, wnh);
      // element
      var element = document.createElement("div");
      element.id = itemName;
      element.className = "item "+type;
      element.style.width = wnh+"px";
      element.style.height = wnh+"px";
      element.style.fontSize = font_size+"px";
      backGround.appendChild(element);
      //audio
      item.audio = document.createElement("audio");
      item.audio.src = "audio/item-"+type+".mp3";
      //item
      item.typeName = type;
      if(type == "life_UP") element.innerHTML = LIFE;
      if(type == "rapid_fire") element.innerHTML = "&starf;";
      if(type == "triple_fire") element.innerHTML = "x3";
      // item.activate()
      item.activate = function(){
        if(type == "life_UP"){
          if(LIFE_COUNT<5){LIFE_COUNT++; printLife();}
        }
        else if(type == "rapid_fire"){
          clearTimeout(itemRF_TO);
          LASER_ReloadTime = LASER_FastReload;
          ovni.element.classList.add("Color_rapid_fire");
          itemRF_TO = setTimeout(function(){
            LASER_ReloadTime = LASER_NormalReload;
            ovni.element.classList.remove("Color_rapid_fire");
          }, 7000);
        }
        else if(type == "triple_fire"){
          clearTimeout(itemTF_TO);
          LASER_TripleON = true;
          laser_gun.classList.add("Triple-gun");
          itemTF_TO = setTimeout(function() {
            LASER_TripleON = false;
            laser_gun.classList.remove("Triple-gun");
          }, 7000);
        }
        if(SOUND_ON) item.audio.play();
        item.remove();
      } 
      // item.remove()
      item.remove = function(){
        item.element.parentElement.removeChild(item.element);
        Items.splice(Items.indexOf(item), 1);
        ITEM_EXISTS = false;
      }
      Items[Items.length] = item;
      item.element = document.getElementById(itemName);
    }
  }

  /* createEnemy() */
  function createEnemy(w, h, type, categ, life, y_maxMov){
    // if(wind_H <= 430){
    //   w = w * 0.7; h = h * 0.7;
    // }
    var elementName = type+categ+"_"+getRandom(1000000000);
    var enemy = new Sprite(elementName, maxX, getRandom(maxY), w, h);
    //element
    enemy.element = document.createElement("div");
    enemy.element.id = elementName;
    enemy.element.className = "enemy "+type+categ;
    enemy.element.style.width = w+"px";
    enemy.element.style.height = h+"px";
    backGround.appendChild(enemy.element);
    //audio
    enemy.audio = document.createElement("audio");
    enemy.audio.src = "audio/"+type+"_hit.mp3";
    //enemy
    enemy.type = type;
    enemy.categ = categ;
    enemy.y = (enemy.y<30) 
              ? 30 : (enemy.y+enemy.h>maxY-y_maxMov-15) 
              ? maxY-y_maxMov-15-enemy.h : enemy.y;
    enemy.Y_anchor = enemy.y;
    enemy.y_maxMov = y_maxMov;
    enemy.Y_move = "down";
    enemy.VD = getRandom(4)+1;
    enemy.life = life;
    // enemy.loseALife()
    enemy.loseALife = function(){
      enemy.life--;
      enemy.getHit();
      if(enemy.life <= 0) enemy.score_n_Remove();
    }
    // enemy.getHit()
    enemy.getHit = function(){
      if(type == "face") imgChange(enemy.element, type);
      else{enemy.element.animate([
        {opacity: "1"},{opacity: "0"}], 150);
      }  
      if(SOUND_ON) enemy.audio.play();
    }
    // enemy.score_n_Remove()
    enemy.score_n_Remove = function(){
      (enemy.life <= 0) ? changeScore(enemy.categ, true) : changeScore(enemy.categ, false);
      if(enemy.element.parentElement){
        enemy.element.parentElement.removeChild(enemy.element);
        Enemies.splice(Enemies.indexOf(enemy), 1);
      }
      
    }
    // enemy.remove()
    enemy.remove = function(){
      enemy.element.parentElement.removeChild(enemy.element);
      Enemies.splice(Enemies.indexOf(enemy), 1);
    }
    Enemies[Enemies.length] = enemy;
  }

/* createBOSS() */
  function createBOSS(w, h, type, categ, life, y_maxMov){
    // if(wind_H <= 430){
    //   w = w * 0.6; 
    //   h = h * 0.6;
    //   y_maxMov = y_maxMov * 0.6;
    // }
    var elementName = type+categ;
    var boss = new Sprite(elementName, maxX, maxY/2-h/2, w, h);
    //element
    boss.element = document.createElement("div");
    boss.element.id = elementName;
    boss.element.className = "boss "+type+categ;
    boss.element.style.width = w+"px";
    boss.element.style.height = h+"px";
    backGround.appendChild(boss.element);
    boss.bossBar = document.createElement("div");
    boss.bossBar.className = "Boss_bar";
    boss.element.appendChild(boss.bossBar);
    boss.lifeBar = document.createElement("div");
    boss.lifeBar.id = "Boss_life";
    boss.bossBar.appendChild(boss.lifeBar);
    //audio
    boss.audio_hit = document.createElement("audio");
    boss.audio_hit.src = "audio/"+type+"BOSS_hit.mp3";
    boss.audio_dead = document.createElement("audio");
    boss.audio_dead.src = "audio/"+type+"BOSS_dead.mp3";
    //boss 
    boss.type = type;
    boss.categ = categ;
    boss.X_move = "front";
    boss.Y_anchor = boss.y;
    boss.y_maxMov = y_maxMov;
    boss.Y_move = "down";
    
    boss.BOSS_in = false;
    boss.BOSS_attack = false;
    //life
    boss.life = life;
    boss.maxLife = life;
    boss.lifePerc = 100;
    // boss.loseALife()
    boss.loseALife = function(){
      boss.life--;
      boss.lifePerc = boss.life * 100/ boss.maxLife;
      boss.lifeBar.style.width = boss.lifePerc+"%";
      boss.getHit();
      if(boss.life <= 0 && !boss.isDead){
        ovni.Y_anchor = ovni.y;
        boss.element.removeChild(boss.bossBar);
        Boss.element.classList.remove("faceSwing");
        boss.element.classList.add(boss.type+boss.categ+"_dead");
        boss.isDead = true;
        CONTROLS_ON = false;
        if(SOUND_ON) AUD_ovni_OUT.play();
        setTimeout(function(){
          if(LEVEL < 5) nextLevel();
          else if(LEVEL == 5){
            endingGame();
          }
        }, 6000);
      }
    }
    // boss.getHit()
    boss.getHit = function(){
      if(type == "face") imgChange(boss.element, type);
      if(type == "cat") imgChange(boss.element, type);
      else{boss.element.animate([
        {opacity: "1"},{opacity: "0"}], 150);
      }  
      if(SOUND_ON){
        if(boss.life >= 1) boss.audio_hit.play();
        else if(boss.life === 0) boss.audio_dead.play();
      }  
    }
    // boss.upnDown()
    boss.upnDown = function(v_y, frec_l, frec_r){
      if(boss.y <= 25 ) boss.Y_move = "down";
      else if(boss.y + boss.h >= maxY-15) boss.Y_move = "up";
      if(boss.Y_move == "down") boss.y += v_y;
      else if(boss.Y_move == "up") boss.y -= v_y;
      if((boss.lifePerc > 40) ? getRandom(frec_l) === 0 : getRandom(frec_r) === 0){//attack
        var dir = getRandom(2);
        if(dir === 0 && boss.y < maxY - boss.y_maxMov-boss.h 
          || dir === 1 && boss.y > boss.y_maxMov){
            boss.BOSS_attack = true;
          boss.BOSS_attack_dir = dir;
          boss.Y_anchor = boss.y;
        }
      } 
    }
    // boss.backnForth()
    boss.backnForth = function(v_l, v_r){
      if(boss.x <= 25 ) boss.X_move = "back";
      else if(boss.x >= maxX-15-boss.w){
        boss.X_move = "front";
        boss.BOSS_attack = false;
      }  
      if(boss.X_move == "front") (boss.lifePerc > 40) ? boss.x -= v_l : boss.x -= v_r;
      else if(boss.X_move == "back") (boss.lifePerc > 40) ? boss.x += v_l : boss.x += v_r;
    }
    Boss = boss;
  }

  /* imgChange() */
  function imgChange(element, type){
    element.classList.add(type+"Hit");
    setTimeout(function(){
      element.classList.remove(type+"Hit");
    }, 200);
  }

  /* oscillateRegular() */
  function oscillateRegular(sprite, v_x, v_down, v_up, attk=0){
    if(v_x !== "no") sprite.x -= v_x;
    // console.log(attk);
    if(attk === 0){
      if(sprite.y < sprite.Y_anchor || sprite.y <= 25) sprite.Y_move = "down";
      else if(sprite.y >= sprite.Y_anchor+sprite.y_maxMov || sprite.y + sprite.h >= maxY-15) sprite.Y_move = "up";
    }else{
      if(sprite.y > sprite.Y_anchor 
      || sprite.y + sprite.h >= maxY-15) sprite.Y_move = "up";
      else if(sprite.y <= sprite.Y_anchor-sprite.y_maxMov
      || sprite.y <= 25) sprite.Y_move = "down";
    }
    if(sprite.Y_move == "down") sprite.y += v_down;
    else if(sprite.Y_move == "up") sprite.y += v_up;
  }
  
  


  
  /* addEnemiesAndItems() */
  function addEnemiesAndItems(){
    // Enemies
  /* DIFFICULTY *** E A S Y *** */  
    if(DIFF == "EASY"){
      if(LEVEL === 1){
        if(!BOSS_STAGE){
          if(getRandom(40) == 0) createEnemy(33, 30, "mosca", "S", 1, 10);
          if(getRandom(200) == 0) createEnemy(55, 50, "mosca", "M", 2, 10);
        }
        else if(BOSS_STAGE && !BOSS_ON){
          boss_in();  
          createBOSS(168, 150, "mosca", "BOSS", 30, 10);
        }
      } 
      if(LEVEL === 2){
        if(!BOSS_STAGE){
          if(getRandom(40) == 0) createEnemy(50, 30, "dragon", "S", 1, 40);
          if(getRandom(200) == 0) createEnemy(79, 50, "dragon", "M", 2, 40);
        }
        else if(BOSS_STAGE && !BOSS_ON){
          boss_in();  
          createBOSS(240, 150, "dragon", "BOSS", 35, 60);
        }
      }
      if(LEVEL === 3){
        if(!BOSS_STAGE){
          if(getRandom(40) == 0) createEnemy(61, 50, "cupid", "S", 1, 60);
          if(getRandom(200) == 0) createEnemy(86, 70, "cupid", "M", 2, 60);
        }  
        else if(BOSS_STAGE && !BOSS_ON){
          boss_in();  
          createBOSS(257, 210, "cupid", "BOSS", 40, 80);
        }
      }
      if(LEVEL === 4){
        if(!BOSS_STAGE){
          if(getRandom(60) == 0) createEnemy(45, 71, "face", "S", 2, 80);
          if(getRandom(200) == 0) createEnemy(65, 100, "face", "M", 3, 80);
        }
        else if(BOSS_STAGE && !BOSS_ON){
          boss_in();  
          createBOSS(130, 200, "face", "BOSS", 45, 80);
        } 
      }
      if(LEVEL === 5){
        if(!BOSS_STAGE){
          if(getRandom(40) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(33, 30, "mosca", "S", 1, 10)
            : (num === 1) ? createEnemy(50, 30, "dragon", "S", 1, 40)
            : (num === 2) ? createEnemy(61, 50, "cupid", "S", 1, 60)
            : createEnemy(45, 71, "face", "S", 2, 80);
          }
          else if(getRandom(200) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(55, 50, "mosca", "M", 2, 10)
            : (num === 1) ? createEnemy(79, 50, "dragon", "M", 2, 40)
            : (num === 2) ? createEnemy(86, 70, "cupid", "M", 2, 60)
            : createEnemy(65, 100, "face", "M", 3, 80);
          }
        }
        else if(BOSS_STAGE && !BOSS_ON){
          boss_in();  
          createBOSS(140, 140, "cat", "BOSS", 50, 80);
        } 
      }
    }

  /* DIFFICULTY ***  H A R D *** */
    else if(DIFF == "HARD"){
      if(LEVEL === 1){
        if(!BOSS_STAGE){
          if(getRandom(35) == 0) createEnemy(33, 30, "mosca", "S", 1, 10);
          if(getRandom(120) == 0) createEnemy(55, 50, "mosca", "M", 2, 10);
        }
        else if(BOSS_STAGE){
          if(!BOSS_ON){
            boss_in(); 
            createBOSS(168, 150, "mosca", "BOSS", 40, 10);
          }
          if(getRandom(70) == 0) createEnemy(33, 30, "mosca", "S", 1, 10);
          if(getRandom(200) == 0) createEnemy(55, 50, "mosca", "M", 2, 10);
        }
      } 

      if(LEVEL === 2){
        if(!BOSS_STAGE){
          if(getRandom(35) == 0) createEnemy(50, 30, "dragon", "S", 1, 40);
          if(getRandom(120) == 0) createEnemy(79, 50, "dragon", "M", 2, 40);
        }
        else if(BOSS_STAGE){
          if(!BOSS_ON){
            boss_in();
            createBOSS(240, 150, "dragon", "BOSS", 45, 60);
          }  
          if(getRandom(70) == 0) createEnemy(50, 30, "dragon", "S", 1, 40);
          if(getRandom(200) == 0) createEnemy(79, 50, "dragon", "M", 2, 40);
        }
      }

      if(LEVEL === 3){
        if(!BOSS_STAGE){
          if(getRandom(35) == 0) createEnemy(61, 50, "cupid", "S", 1, 60);
          if(getRandom(120) == 0) createEnemy(86, 70, "cupid", "M", 2, 60);
        }  
        else if(BOSS_STAGE){
          if(!BOSS_ON){
            boss_in();
            createBOSS(257, 210, "cupid", "BOSS", 50, 80);
          }
          if(getRandom(70) == 0) createEnemy(61, 50, "cupid", "S", 1, 60);
          if(getRandom(200) == 0) createEnemy(86, 70, "cupid", "M", 2, 60);
        }
      }

      if(LEVEL === 4){
        if(!BOSS_STAGE){
          if(getRandom(35) == 0) createEnemy(45, 71, "face", "S", 2, 80);
          if(getRandom(120) == 0) createEnemy(65, 100, "face", "M", 3, 80);
        }
        else if(BOSS_STAGE){
          if(!BOSS_ON){
            boss_in();
            createBOSS(130, 200, "face", "BOSS", 55, 80);
          }  
          if(getRandom(70) == 0) createEnemy(45, 71, "face", "S", 2, 80);
          if(getRandom(200) == 0) createEnemy(65, 100, "face", "M", 3, 80);
        } 
      }

      if(LEVEL === 5){
        if(!BOSS_STAGE){
          if(getRandom(35) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(33, 30, "mosca", "S", 1, 10)
            : (num === 1) ? createEnemy(50, 30, "dragon", "S", 1, 40)
            : (num === 2) ? createEnemy(61, 50, "cupid", "S", 1, 60)
            : createEnemy(45, 71, "face", "S", 2, 80);
          }
          else if(getRandom(120) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(55, 50, "mosca", "M", 2, 10)
            : (num === 1) ? createEnemy(79, 50, "dragon", "M", 2, 40)
            : (num === 2) ? createEnemy(86, 70, "cupid", "M", 2, 60)
            : createEnemy(65, 100, "face", "M", 3, 80);
          }
        }
        else if(BOSS_STAGE){
          if(!BOSS_ON){
            boss_in();
            createBOSS(140, 140, "cat", "BOSS", 60, 80);
          }
          if(getRandom(70) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(33, 30, "mosca", "S", 1, 10)
            : (num === 1) ? createEnemy(50, 30, "dragon", "S", 1, 40)
            : (num === 2) ? createEnemy(61, 50, "cupid", "S", 1, 60)
            : createEnemy(45, 71, "face", "S", 2, 80);
          }
          else if(getRandom(200) == 0){
            let num = getRandom(4);
            (num === 0) ? createEnemy(55, 50, "mosca", "M", 2, 10)
            : (num === 1) ? createEnemy(79, 50, "dragon", "M", 2, 40)
            : (num === 2) ? createEnemy(86, 70, "cupid", "M", 2, 60)
            : createEnemy(65, 100, "face", "M", 3, 80);
          }
        } 
      }
    }  

    // items
    if(LIFE_COUNT > 2){
      if(getRandom(1000) == 0) createItem("life_UP", 34);
    }else{
      if(getRandom(400) == 0) createItem("life_UP", 34);
    }
    if(getRandom(300) == 0) createItem("rapid_fire", 30);
    if(getRandom(300) == 0) createItem("triple_fire", 20);

    // createItem("life_UP", 34);
    // createItem("rapid_fire", 30);
    // createItem("triple_fire", 20);
    // (getRandom(2) == 0) ? createItem("triple_fire", 20) : createItem("rapid_fire", 30);
  }
  
  /* boss_in() */
  function boss_in(){
    BOSS_ON = true;
    MAX_SCORE = 100; SCORE = 100;
    printScore();
  }

  /* getRandom() */
  function getRandom(max){
    return parseInt(Math.random() * max);
  }



/* ------ POSITIONING  ------ */
  /* setPosition() */
  function setPosition(sprite){
    sprite.element.style.left = sprite.x + "px";
    sprite.element.style.top = sprite.y + "px";
  }

  /* showSprites() */ 
  function showSprites(){
    setPosition(ovni);
    for(let i=0; i<Lasers.length; i++){
      setPosition(Lasers[i]);
    }
    for(let i=0; i<Enemies.length; i++){
      setPosition(Enemies[i]);
    }
    for(let i=0; i<Items.length; i++){
      setPosition(Items[i]);
    }
    if(Boss.x) setPosition(Boss);
  }

  /* ensureBounds() */
  function ensureBounds(sprite){
    if(sprite == ovni){
      if(sprite.x <10) sprite.x = 10;
      if(sprite.x + sprite.w > maxX-10) sprite.x = maxX-10 - sprite.w;

      if(sprite.y <10 + sprite.desface) sprite.y = 10 + sprite.desface;
      if(sprite.y + sprite.h > maxY-10) sprite.y = maxY-10 - sprite.h;
    }
    else{
      if(sprite){
        if(sprite.y <25) sprite.y = 25;
        if(sprite.y + sprite.h > maxY-15) sprite.y = maxY-15 - sprite.h;
      }
    }
  }

  /* updatePositions() */
  function updatePositions(){
  // Lasers
    for(var j=0; j<Lasers.length; j++){
      Lasers[j].x += 12;
      if(Lasers[j].bullet == 1) Lasers[j].y -= 2;
      if(Lasers[j].bullet == 2) Lasers[j].y += 2;   
      //laser OffScreen
      if(Lasers[j].x > maxX 
        || (Lasers[j].bullet === 1 && Lasers[j].y < -(Lasers[j].h)) 
        || (Lasers[j].bullet === 2 && Lasers[j].y > maxY)){
        Lasers[j].remove(); j--;
      }  
    }  
  // Items
    for(var k=0; k<Items.length; k++){
      Items[k].x -= 2; 
      // item OffScreen
      if(Items[k].x < -(Items[k].w)){
        Items[k].remove(); k--;
      }  
      ensureBounds(Items[k]);
    }
  // Enemies
    for(var i=0; i<Enemies.length; i++){
      //mosca
      if(Enemies[i].type == "mosca"){
        Enemies[i].x -= 2;
        Enemies[i].y += getRandom(7) - 3;
      }
      //dragon
      else if(Enemies[i].type == "dragon"){
        oscillateRegular(Enemies[i], 2, 1, -3);
      }
      //cupid
      else if(Enemies[i].type == "cupid"){
        oscillateRegular(Enemies[i], 2, 2, -3);
      }  
      //face
      else if(Enemies[i].type == "face"){
        Enemies[i].x -= 2;
        if(Enemies[i].y < Enemies[i].Y_anchor){
          Enemies[i].Y_move = "down";
          Enemies[i].VD = getRandom(5)+1;
          Enemies[i].VU = undefined;
        }
        else if(Enemies[i].y >= Enemies[i].Y_anchor+80){
          Enemies[i].Y_move = "up";
          Enemies[i].VD = undefined;
          Enemies[i].VU = getRandom(4)+2;
        } 
        if(Enemies[i].Y_move == "down") Enemies[i].y += Enemies[i].VD;
        else if(Enemies[i].Y_move == "up") Enemies[i].y -= Enemies[i].VU;
      }  

      //enemy OffScreen
      if(Enemies[i].x < -(Enemies[i].w)){
        Enemies[i].score_n_Remove(); i--;
      }  
      ensureBounds(Enemies[i]);
    }  
  }


  /* updateBOSS() */
  function updateBOSS(){
    if(Boss.isDead){//BOSS DEAD
      ovniOut();
      if(Boss.y + Boss.h <= maxY-15) Boss.y += 2;
    }
    else{//BOSS ALIVE

  /* BOSS MOSCA */
      if(Boss.type == "mosca"){
        if(Boss.x < maxX-15-Boss.w) Boss.BOSS_in = true;
        if(!Boss.BOSS_in){
          Boss.x -= 3;
          Boss.y += getRandom(7) - 3;
        }
        else{//Boss.BOSS_in == true
          Boss.bossBar.style.display = "block";
          if(!Boss.BOSS_attack){//Boss.BOSS_attack = false
            Boss.upnDown(getRandom(8)-2, 60, 30); 
          }
          else{//Boss.BOSS_attack = true 
            Boss.backnForth(5, 7);

            if(Boss.BOSS_attack_dir === 0){//attack 0
              if(Boss.X_move == "front") Boss.y += getRandom(8) - 5;
              else if(Boss.X_move == "back") Boss.y += getRandom(8) - 2;
            }
            else if(Boss.BOSS_attack_dir === 1){//attack 1
              if(Boss.X_move == "front") Boss.y += getRandom(8) - 2;
              else if(Boss.X_move == "back") Boss.y += getRandom(8) - 5;
            }
          }
        }  
      }

  /* BOSS DRAGON */
      if(Boss.type == "dragon"){
        if(Boss.x < maxX-15-Boss.w) Boss.BOSS_in = true;
        if(!Boss.BOSS_in){
          oscillateRegular(Boss, 3, 2, -3);
        }
        else{//Boss.BOSS_in == true
          Boss.bossBar.style.display = "block";
          if(!Boss.BOSS_attack){//Boss.BOSS_attack = false
            Boss.upnDown(3, 50, 30);
          }
          else{//Boss.BOSS_attack = true 
            Boss.backnForth(6, 8);

            if(Boss.BOSS_attack_dir === 0){//attack 0
              oscillateRegular(Boss, "no", 2, -3);
            }
            else if(Boss.BOSS_attack_dir === 1){//attack 1
              oscillateRegular(Boss, "no", 3, -2, 1);
            }
          }
        }  
      }

  /* BOSS CUPID */
      if(Boss.type == "cupid"){
        if(Boss.x < maxX-15-Boss.w) Boss.BOSS_in = true;
        if(!Boss.BOSS_in){
          oscillateRegular(Boss, 3, 2, -3);
        }
        else{//Boss.BOSS_in == true
          Boss.bossBar.style.display = "block";
          if(!Boss.BOSS_attack){//Boss.BOSS_attack = false
            Boss.upnDown(4, 50, 25);
          }
          else{//Boss.BOSS_attack = true 
            Boss.backnForth(6, 8);

            if(Boss.BOSS_attack_dir === 0){//attack 0
              oscillateRegular(Boss, "no", 4, -4);
            }
            else if(Boss.BOSS_attack_dir === 1){//attack 1
              oscillateRegular(Boss, "no", 4, -4, 1);
            }
          }
        }  
      }
  /* BOSS FACE */
      if(Boss.type == "face"){
        if(Boss.x < maxX-15-Boss.w) Boss.BOSS_in = true;
        if(!Boss.BOSS_in){
          oscillateRegular(Boss, 3, 4, -3);
        }
        else{//Boss.BOSS_in == true
          Boss.bossBar.style.display = "block";
          if(!Boss.BOSS_attack){//Boss.BOSS_attack = false
            Boss.upnDown(getRandom(8), 45, 25);
            Boss.element.classList.remove("faceSwing");
          }
          else{//Boss.BOSS_attack = true 
            Boss.backnForth(10, 10);
            Boss.element.classList.add("faceSwing");

            if(Boss.BOSS_attack_dir === 0){//attack 0
              if(Boss.y <= Boss.Y_anchor || Boss.y <= 25){
                Boss.Y_move = "down";
                Boss.VD = getRandom(5)+1;
                Boss.VU = undefined;
              }
              else if(Boss.y >= Boss.Y_anchor+110 || Boss.y + Boss.h >= maxY-15){
                Boss.Y_move = "up";
                Boss.VD = undefined;
                Boss.VU = getRandom(4)+2;
              } 
              if(Boss.Y_move == "down") Boss.y += Boss.VD;
              else if(Boss.Y_move == "up") Boss.y -= Boss.VU;
            }
            else if(Boss.BOSS_attack_dir === 1){//attack 1
              oscillateRegular(Boss, "no", 4, -4, 1);
            }
          }
        }  
      }
  /* BOSS CAT */
      if(Boss.type == "cat"){
        if(Boss.x < maxX-15-Boss.w) Boss.BOSS_in = true;
        if(!Boss.BOSS_in){
          oscillateRegular(Boss, 3, 4, -3);
        }
        else{//Boss.BOSS_in == true
          Boss.bossBar.style.display = "block";
          if(!Boss.BOSS_attack){//Boss.BOSS_attack = false
            Boss.upnDown(getRandom(10), 40, 20);
          }
          else{//Boss.BOSS_attack = true 
            Boss.backnForth(12, 12);

            if(Boss.BOSS_attack_dir === 0){//attack 0
              Boss.Y_move = "down";
              Boss.VD = getRandom(4)+2;
              Boss.BOSS_attack_dir = false;
            }
            else if(Boss.BOSS_attack_dir === 1){//attack 1
              Boss.Y_move = "up";
              Boss.VU = getRandom(4)+2;
              Boss.BOSS_attack_dir = false;
            }
            if(Boss.y <= 25){
              Boss.Y_move = "down";
              Boss.VD = getRandom(4)+2;
              Boss.VU = undefined;
            }
            else if(Boss.y + Boss.h >= maxY-15){
              Boss.Y_move = "up";
              Boss.VD = undefined;
              Boss.VU = getRandom(4)+2;
            } 
            if(Boss.Y_move == "down") Boss.y += Boss.VD;
            else if(Boss.Y_move == "up") Boss.y -= Boss.VU;
          }
        }  
      }
    }
    ensureBounds(Boss);
  }



/* ----- INTERSECTIONS ------ */
  /* intersects() */
  function intersects(a, b){
    if(a && b){
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }
  }

/* checkCollisions() */
  function checkCollisions(){
  /* Enemies */
    for(var i=0; i<Enemies.length; i++){
      // laser - enemy 
      for(var j=0; j<Lasers.length; j++){
        if(Lasers[j] && Enemies[i]){
          if(intersects(Lasers[j], Enemies[i])){
            Lasers[j].remove();
            Enemies[i].loseALife();
            i--; j--;
          }
        }
      }  
      // ovni - enemy
      if(intersects(ovni, Enemies[i])){
        if(!ovni.inmune) loseALife();
      }
    }
  /* BOSS */
    // laser - Boss
    for(var k=0; k<Lasers.length; k++){
      if(intersects(Lasers[k], Boss) && !Boss.isDead){
        Lasers[k].remove();
        Boss.loseALife();
      }      
    }
    // ovni - Boss
    if(intersects(ovni, Boss)){
      if(!Boss.isDead && !ovni.inmune){
        Boss.X_move = "back";
        loseALife();
      }
    }
  /* Items */
    // ovni - item
    for(let item of Items){
      if(intersects(ovni, item)) {
        if(!ovni.inmune) item.activate();
      }
    }
  }


/* -------- SCORE && LIFE ------- */
  /*  changeScore() */
  function changeScore(categ, add){
    if(LIFE_COUNT > 0){
      if(categ == "S"){(add) ? SCORE += 10 : SCORE -= 10;}
      if(categ == "M"){(add) ? SCORE += 50 : SCORE -= 100;}
      if(SCORE >= MAX_SCORE) SCORE = MAX_SCORE;
    
      printScore();
      if(SCORE < 0){SCORE = 0; loseALife();}  
      else if(SCORE >= MAX_SCORE && !BOSS_STAGE){
        BOSS_STAGE = true;
        resetEnemies();
      }
    }
  }

  /* printScore() */
  function printScore(){
    if(LAST_SCORE > SCORE){
      scorer_bar.classList.add("red");
      setTimeout(function(){scorer_bar.classList.remove("red")}, 300);
    }
    scorer_num.innerHTML = SCORE + "/" + MAX_SCORE;
    var scorePerc = (SCORE>0) ? SCORE * 100 / MAX_SCORE : 0;
    scorer_bar.style.width = scorePerc + "%";
    LAST_SCORE = SCORE;
  }

  /* loseALife() */
  function loseALife(){
    ovni.inmune = true;
    LIFE_COUNT--;
    resetOVNI();
    if(BOSS_STAGE) SCORE = 100;
    printLife();
    if(LIFE_COUNT > 0){
      resetLaser();
      resetItems();
      resetEnemies();
      if(!BOSS_STAGE) resetLOOP();
    }else if(LIFE_COUNT == 0){     
      gameOver.classList.remove("d_none");
    }
    if(SOUND_ON) {
      ovni.audio1.play();
      ovni.audio2.play();
    }  
  }
  
  /* printLife() */
  function printLife(){
    var result = "";
    for(let i=0; i<LIFE_COUNT; i++){result += LIFE;}
    life_count.innerHTML = result;
  }


/* ---- RESET - RESTART ---- */
  /* resetOVNI() */
  function resetOVNI(){ 
    ovni.element.style.display = "none";
    ovni.OVNI_ON = false;
    CONTROLS_ON = false;
    ovni.x = 20;
    ovni.y = maxY*0.3;
    if(LIFE_COUNT > 0){
      setTimeout(function(){
        printScore();
        ovni.element.style.display = "block";
        CONTROLS_ON = true;
        ovni.OVNI_ON = true;
        ovni.inmune = false;
      }, 2000);
    }  
  }
  /* resetLaser() */
  function resetLaser(){
    for(var i=0; i<Lasers.length; i++){Lasers[i].remove(); i--;}
    LASER_ReloadTime = LASER_NormalReload;
    ovni.element.classList.remove("Color_rapid_fire");
    LASER_TripleON = false;
    laser_gun.classList.remove("Triple-gun");
  }
  /* resetItems() */
  function resetItems(){ 
    for(var i=0; i<Items.length; i++){Items[i].remove(); i--;}
    ITEM_EXISTS = false;
  }
  /* resetEnemies() */
  function resetEnemies(){
    for(var i=0; i<Enemies.length; i++){
      Enemies[i].remove(); 
      i--; 
    }
  }
  /* resetBOSS() */
  function resetBOSS(reset_boss_stage = true){
    if(Boss.element) backGround.removeChild(Boss.element);
    Boss = {};
    BOSS_ON = false;
    if(reset_boss_stage) BOSS_STAGE = false;
  }
  /* resetLOOP() */
  function resetLOOP(){
    setTimeout(function(){
      clearInterval(loop_ITRV);
    }, 50);
    loop_TO = setTimeout(function(){
      printScore();
      loop();
    }, 3000);
  }
  
  /* restart() */
  function restart(reset_boss_stage = true){
    if(BOSS_STAGE){
      MAX_SCORE = 100; SCORE = 100;}
    else SCORE = 0; 
    printScore();
    LIFE_COUNT = 3; 
    printLife();
    resetLaser();
    resetItems();
    resetEnemies();
    resetBOSS(reset_boss_stage);
    resetLOOP();
    showLevelSign();
    gameOver.classList.add("d_none");
    menu_main.classList.add("d_none");
    menu_pause.classList.add("d_none");
    PAUSE_ON = false;
    // container.classList.remove("cont-scroll");
  }

/* ----- PAUSE ----- */
  /* pause_resume() */
  function pause_resume(){
    if(PAUSE_ACTIVE){
      if(!PAUSE_ON){
        if(LIFE_COUNT <= 0) gameOver.classList.add("d_none");
        menu_pause.classList.remove("d_none");
        PAUSE_ON = true;
        clearInterval(loop_ITRV);
        clearTimeout(loop_TO);
      }else{
        if(LIFE_COUNT <= 0) gameOver.classList.remove("d_none");
        menu_main.classList.add("d_none");
        menu_pause.classList.add("d_none");
        PAUSE_ON = false;
        loop();
        printScore();
      }
    }
  }


/* ---- SET LEVEL ---- */
  /* setLevelDiffMode() */
  function setLevelDiffMode(lvl, diff){
    // images
    if(lvl <= 5){
      backGround.style.backgroundImage = "url(img/"+Images[lvl-1]+")";
      hat.className = "hat-L"+lvl;
    }
    if(diff === "HARD") pajarita.classList.remove("d_none");
    else pajarita.classList.add("d_none");
    // BttsLevel
    for(let btt of BttsLevel){
      btt.classList.remove("level_selected");
    }
    BttsLevel[lvl-1].classList.add("level_selected");
    BttsLevel[lvl-1].classList.remove("btt_inactive");
    // level menu sign
    show_level_menu.innerHTML = "LEVEL "+ lvl +" - "+ diff;
    // mode
    // if(MODE === "keyboard"){
    //   Btts_Mode[0].classList.add("mode_selected");
    //   for(let btt of BttC){
    //     btt.classList.add("d_none");
    //   }
    // }else{
    //   Btts_Mode[1].classList.add("mode_selected");
    //   for(let btt of BttC){
    //     btt.classList.remove("d_none");
    //   }
    // }  
    
    //score
    if(lvl === 1){
      (diff == "EASY") ? MAX_SCORE = 400 : MAX_SCORE = 700;
    }
    if(lvl === 2){
      (diff == "EASY") ? MAX_SCORE = 500 : MAX_SCORE = 800;
    }
    if(lvl === 3){
      (diff == "EASY") ? MAX_SCORE = 600 : MAX_SCORE = 900;
    }
    if(lvl === 4){
      (diff == "EASY") ? MAX_SCORE = 700 : MAX_SCORE = 1000;
    }
    if(lvl === 5){
      (diff == "EASY") ? MAX_SCORE = 800 : MAX_SCORE = 1200;
    }
  }

  /* nextLevel() */
  function nextLevel(){
    LEVEL++;
    setLevelDiffMode(LEVEL, DIFF);
    SCORE = 0; printScore();
    resetLaser();
    resetItems();
    resetEnemies();
    resetBOSS();
    resetLOOP();
    showLevelSign();
    gameOver.classList.add("d_none");
    menu_pause.classList.add("d_none");
    PAUSE_ON = false;
  }

  /* endingGame() */
  function endingGame(){
    // for(let btt of BttC){
    //   btt.classList.add("d_none");
    // }
    ending_sign.classList.remove("d_none");
    top_Bar.classList.add("d_none");
    backGround.style.backgroundImage = "url(img/pic6.jpeg)";
    backGround.classList.add("backGroundEnding");
    resetItems();
    resetEnemies();
    resetBOSS();
    clearInterval(loop_ITRV);
    ENDING = true;
    PAUSE_ACTIVE = false;
    animationOvni();
  }
  
  /* showLevelSign() */
  function showLevelSign(){
    ovniIN();
    level_sign.firstElementChild.innerHTML = "LEVEL "+ LEVEL +"<br>"+DIFF;
    level_sign.classList.remove("d_none");
    setTimeout(function(){
      ovni.OVNI_ON = true;
      PAUSE_ACTIVE = true;
      level_sign.classList.add("d_none");
    }, 2500);
  }

  /* ovniIN() */
  function ovniIN(){
    ovni.inmune = false;
    ovni.element.style.display = "block";
    ovni.x = 20;
    ovni.y = maxY*0.3;
    ovni.element.classList.add("Ovni_intro");
    setTimeout(function(){
      ovni.element.classList.remove("Ovni_intro");
    }, 5000);
    if(SOUND_ON) AUD_ovni_IN.play();
  }

  /* ovniOut() */
  function ovniOut(){   
    PAUSE_ACTIVE = false;
    ovni.inmune = true;
    ovni.OVNI_ON = false;
    if(ovni.y >= ovni.Y_anchor-80 && ovni.y >= 25){
      ovni.y -= 3;  
    }  
    else if(ovni.x < maxX+ovni.w){
      ovni.x += 13;
    }
  }
  
  /* showRotateSign */
  // window.addEventListener("resize", function(){
  //   wind_W = window.innerWidth;
  //   wind_H = window.innerHeight;
  //   if(menu_main.className.includes("d_none")){
  //     if(wind_H >= wind_W && MODE === "touch"){
  //       rotate_sign.classList.remove("d_none");
  //       if(!PAUSE_ON && !ENDING) pause_resume(); 
  //     }else{
  //       rotate_sign.classList.add("d_none");
  //     }
  //   }
  // });

  


/* ---- Anim OVNI ---- */
  /* animationOvni() */
  function animationOvni(){
    var gato = document.querySelector(".Gato");
    var rayo_ovni = document.querySelector(".Rayo-ovni");
    var sombra_gato = document.querySelector(".Sombra-gato");
    var c8 = document.querySelector(".c8");
    var c9 = document.querySelector(".c9");
    var c10 = document.querySelector(".c10");
    var mojito = document.querySelector(".mojito");
    var animTO;

    var AUD_rayo = document.createElement("audio");
    AUD_rayo.src = "audio/rayo.mp3";
    var AUD_mojito = document.createElement("audio");
    AUD_mojito.src = "audio/mojito.mp3";

    if(ENDING){
      animationEndingSign();
      mojito.classList.remove('d_none');
      hat.className = "hat-ending";

      /*animation Ovni 3s */
      ovni.element.classList.add('Ovni-anim');
      /*a los 3 seg...*/
      animTO = setTimeout(function(){    
        rayo_ovni.classList.add("Rayo-ovni-anim");
        gato.classList.add("Gato-ovni");
        sombra_gato.classList.add("Sombra-gato-ovni");
        c8.classList.add("c8-anim");
        c9.classList.add("c9-anim");
        c10.classList.add("c10-anim");
      }, 3000);    

      /* audio */
      if(SOUND_ON){
          AUD_ovni_OUT.play();
        setTimeout(function(){
          AUD_rayo.play();
        }, 4000);  
        setTimeout(function(){
          AUD_mojito.play();
        }, 17000);  
      }
    }
    else{
      clearTimeout(animTO);
      mojito.classList.add('d_none');
      ovni.element.classList.remove('Ovni-anim');
      rayo_ovni.classList.remove("Rayo-ovni-anim");
      gato.classList.remove("Gato-ovni");
      sombra_gato.classList.remove("Sombra-gato-ovni");
      c8.classList.remove("c8-anim");
      c9.classList.remove("c9-anim");
      c10.classList.remove("c10-anim");  
      // AUD_mojito.pause(); no funciona
    }
  };

  /* animationEndingSign() */
  function animationEndingSign(){
    var ending_P = document.querySelector("#ending_sign p");
    var btt_backEND = document.querySelector("#btt_backEND");

    btt_backEND.classList.add("d_none");
    ending_P.classList.remove("d_none");
    ending_P.classList.add("ending_P-animation");
    ending_P.innerHTML = "CONGRATULATIONS";
    setTimeout(function(){
      ending_P.innerHTML = "You have finished the game";
    }, 3400);
    setTimeout(function(){
      ending_P.innerHTML = "Now relax and enjoy your drink...";
    }, 8000);
    setTimeout(function(){
      ending_P.classList.remove("ending_P-animation");
      ending_P.classList.add("d_none");
      btt_backEND.classList.remove("d_none");
    }, 20000);  
  }
  // endingGame();







/* ----- BUTTONS ----- */
  /* BttStart */
  BttStart.addEventListener("click", function(e){
    e.preventDefault();
    restart(true);
    // restart(false);
  });

  /* Btt_mControls */
  for(let btt of Btts_mControls){
    btt.addEventListener("click", function(e){
      e.preventDefault();
      menu_controls.classList.toggle("d_none");
    });
  }
  /* Btt_mEnemies */
  for(let btt of Btts_mEnemies){
    btt.addEventListener("click", function(e){
      e.preventDefault();
      menu_enemies.classList.toggle("d_none");
    });
  }

  /* Btts_mLevel */
  for(let btt of Btts_mLevel){
    btt.addEventListener("click", function(e){
      e.preventDefault();
      menu_level.classList.toggle("d_none");
    });
  }

  /* BttMenu */
  BttMenu.addEventListener("click", function(e){
    e.preventDefault();
    pause_resume();
  });

  /* BttResume */
  BttResume.addEventListener("click", function(e){
    e.preventDefault();
    pause_resume();
  });

  /* BttsRestart */
  for(let btt of BttsRestart){
    btt.addEventListener("click", function(e){
      e.preventDefault();
      restart(false);
    });
  }

  /* BttsBack */
  for(let btt of BttsBack){
    btt.addEventListener("click", function(e){
      e.preventDefault();
      PAUSE_ACTIVE = false;
      // container.classList.add("cont-scroll");
      gameOver.classList.add("d_none");
      menu_pause.classList.add("d_none");
      menu_main.classList.remove("d_none");
      backGround.classList.remove("backGroundEnding");
      ending_sign.classList.add("d_none");
      if(ENDING){
        ENDING = false;
        LEVEL = 1;
        top_Bar.classList.remove("d_none");
        setLevelDiffMode(LEVEL, DIFF); 
        animationOvni();
      }
    });
  }

/* ---- PICK LEVEL ---- */
  /* BttsLevel */
  for(let i=0; i<BttsLevel.length; i++){
    BttsLevel[i].addEventListener("click", function(e){
      for(let btt of BttsLevel){
        btt.classList.remove("level_selected");
      }
      BttsLevel[i].classList.add("level_selected");
      e.preventDefault();
      LEVEL = i+1;
      setLevelDiffMode(LEVEL, DIFF);
    });
  }
  /* Btts_mDif */
  for(let i=0; i<Btts_mDif.length; i++){
    Btts_mDif[i].addEventListener("click", function(e){
      e.preventDefault();
      for(let btt of Btts_mDif){
        btt.classList.remove("dif_selected");
      }
      Btts_mDif[i].classList.add("dif_selected");
      (i === 0) ? DIFF = "EASY": DIFF = "HARD";
      setLevelDiffMode(LEVEL, DIFF);
    });
  }

  /* Btts_Mode */
  // for(let i=0; i<Btts_Mode.length; i++){
  //   Btts_Mode[i].addEventListener("click", function(e){
  //     e.preventDefault();
  //     for(let btt of Btts_Mode){
  //       btt.classList.remove("mode_selected");
  //     }
  //     Btts_Mode[i].classList.add("mode_selected");
  //     (i === 0) ? MODE = "keyboard": MODE = "touch";
  //     setLevelDiffMode(LEVEL, DIFF);
  //   });
  // }
  
  /* BTT_Sound */
  for(let i=0; i<Btts_Sound.length; i++){
    Btts_Sound[i].addEventListener("click", function(e){
      e.preventDefault();
      if(Btts_Sound[i].className.includes("icon-volume-off")){
        SOUND_ON = true;
        for(let j=0; j<Btts_Sound.length; j++){
          Btts_Sound[j].classList.remove("icon-volume-off");
          Btts_Sound[j].classList.add("icon-volume-on");
        }
      }else{
        SOUND_ON = false;
        for(let j=0; j<Btts_Sound.length; j++){
          Btts_Sound[j].classList.remove("icon-volume-on");
          Btts_Sound[j].classList.add("icon-volume-off");
        }
      }
    });
  }  



  /* ---- LOOP() - MAIN FUNCTION ---- */
  function loop(){
    CONTROLS_ON = true;
    loop_ITRV = setInterval(function() {
      maxX = backGround.offsetWidth;
      maxY = backGround.offsetHeight;
      updatePositions();
      if(Boss.x) updateBOSS();
      handleControls();
      checkCollisions();
      addEnemiesAndItems();
      showSprites();
    }, 40);
  }



/* ------ CONTROLS ------ */
  /* handleControls() */
  function handleControls(){
    if(CONTROLS_ON){
      // ovni
      if(Controller.up) ovni.y -= OVNI_MOVEMENT;
      if(Controller.down) ovni.y += OVNI_MOVEMENT;
      if(Controller.left) ovni.x -= OVNI_MOVEMENT;
      if(Controller.right) ovni.x += OVNI_MOVEMENT;
      ensureBounds(ovni);
      //laser
      if(Controller.shoot){
        // if(ovni.OVNI_ON){
          if(LASER_TripleON) TripleLaser(LASER_ReloadTime);
          else SimpleLaser(LASER_ReloadTime);
        // }
        
      }
    }
  }
  
/* ----- KEYS ----- */
  /* toggleKey() */
  function toggleKey(keyCode, isPressed){
    // ovni
    if(keyCode == LEFT_KEY || keyCode == A_KEY){
      Controller.left = isPressed;}
    if(keyCode == UP_KEY || keyCode == W_KEY){
      Controller.up = isPressed;}
    if(keyCode == RIGHT_KEY || keyCode == D_KEY){
      Controller.right = isPressed;}
    if(keyCode == DOWN_KEY || keyCode == S_KEY){
      Controller.down = isPressed;}
    // laser
    if(keyCode == SPACE_KEY || keyCode == CTRL_KEY || keyCode == L_KEY){
      Controller.shoot = isPressed;}
  }

  /* onkeydown() & onkeyup() */
  document.onkeydown = function(evt){
    toggleKey(evt.keyCode, true);
    if(evt.keyCode == ESCAPE_KEY){
      pause_resume();
    }
  }
  document.onkeyup = function(evt){
    toggleKey(evt.keyCode, false);
  }

/* ----- BUTTONS ----- */
/* toggleBtts() */
  // function toggleBtts(id, isPressed){
  //   // ovni
  //   if(id == "btt_Left") Controller.left = isPressed;
  //   if(id == "btt_Up") Controller.up = isPressed;
  //   if(id == "btt_Right") Controller.right = isPressed;
  //   if(id == "btt_Down") Controller.down = isPressed;
  //   // laser
  //   if(id == "btt_Shoot") Controller.shoot = isPressed;
  // }

  // for(let btt of BttC){
  //   btt.addEventListener("touchstart", function(e){
  //     e.preventDefault();
  //     toggleBtts(btt.id, true);
  //   });

  // }
  // for(let btt of BttC){
  //   btt.addEventListener("touchend", function(e){
  //     e.preventDefault();
  //     toggleBtts(btt.id, false);
  //   });
  // }
/* idioma */
var Textos = {
  en: {
    T_1: "The touch screen version of this game is not available yet.",
    T_2: "In order to play, please use a device with a keyboard."
  },
  es: {
    T_1: "La versión para dispositivos táctiles aún no está disponible.",
    T_2: "Para poder jugar utiliza un dispositivo con teclado."
  }
}
/* getUrl() */
const getUrl = () => {
  return window.location.search.substring(1);
}

/* setIdioma() */
const ArrTXT = document.getElementsByClassName("TXT");
const setIdioma = idioma =>{
  idioma = idioma.substring(0,2);
  for(let k=0; k<ArrTXT.length; k++){
    let data_TXT = ArrTXT[k].getAttribute("data-TXT");
    ArrTXT[k].innerHTML = Textos[idioma][data_TXT];
  }
  return idioma
}

let idioma = setIdioma(getUrl());

  
/* ------ CALLING FUNCTIONS ------ */
  setLevelDiffMode(LEVEL, DIFF); 
  // changeScore();
  // printLife();
  // loop();





});