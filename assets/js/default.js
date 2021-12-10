var comte = document.getElementById('comte');
var  circle = document.querySelector("a.btn-circle");
var perso = document.getElementById('element'); // objet DOM personnage

var para = document.querySelector(".paragraphe");
var findepluie = false;

/* function for refresh page to anchor "#presentationCartes" */
function recharger() {
  var uuidv4 =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  window.location.href = "./index.html?uuidv4="+  uuidv4 + "#presentationCartes";
}

/**
   * reset personnage, button, overflow, localStorage to Arventure
   */
 function resetPers(suiteHistoire=""){
  console.log(`${suiteHistoire.length} == ${comte.innerHTML.length+1}`)
 if(suiteHistoire.length==comte.innerHTML.length+1){
   console.log("fin de l'histoire");
   circle.style.cssText="transform: translateX(0vw) rotate(360deg); -webkit-transition: 1s 500ms;";
   para.style.overflowY = "visible";
   localStorage.setItem("coucou","0");
   findepluie = true;
 }
 perso.style.removeProperty('bottom');
 perso.style.bottom="150px;";
 perso.style.removeProperty('right');
 perso.style.removeProperty('left');
}
//__________________________________________________________récupère la taille de toute les images 
function sizeElements(query){
  var elm = document.getElementsByClassName(query);
  var allSizeElement = new Array();

  for (let i = 0; i < elm.length; i++) {
      allSizeElement[i] = elm[i].getBoundingClientRect(); 
  }
    return allSizeElement;
}

//recupération des informations des images 
function allInformationImg(query){
  var elmts = document.getElementsByClassName(query);
  var allInformation = new Array();
  for (let i = 0; i < elmts.length; i++) {
    
        allInformation[i] = elmts[i].getAttribute("id");
  }
  return allInformation;
}


//__________________________________________________________recupère la taille du personnage 
function sizeElemt(element){
  var elm = document.getElementById(element);
  var sizeElement =elm.getBoundingClientRect();
    return sizeElement;
}

function takeInformation(imgInformation, posPersonnage){

for (let i = 0; i < imgInformation.length; i++) {
      
    var posImg = document.getElementById(imgInformation[i]).getBoundingClientRect();


    if(posPersonnage.x > posImg.x && posPersonnage.x+posPersonnage.width < posImg.x+posImg.width){
      return imgInformation[i];
    }


}
}
//--------------------------------------------------------function gestion des collision : 

function isCollide(pers, img) {
  for (let i = 0; i < img.length; i++) {

    console.log(`img pos top/bottom:  ${img[i].y} , hauteur img: ${img[i].height}`);
    console.log(`img pos right/left:  ${img[i].x} , largeur img: ${img[i].width}`);
    console.log(`pers pos top/bottom:  ${pers.y} , hauteur pers: ${pers.height}`);
    console.log(`pers pos right/left:  ${pers.x} , largeur pers: ${pers.width}`);    
    
    var pad = 75;
    if (pers.y + pers.height + img[i].height - pad < img[i].height) {

      resetPers();

    }else if(pers.y - pad > img[i].height) {

      console.log("en dehors en bas");

    }else if (pers.x + pers.height - pad < img[i].x || pers.x  + pers.width > img[i].x) {
      console.log(takeInformation(allInformationImg('img'), sizeElemt("element")));
      console.log("coucou");
      if(localStorage.getItem("coucou")==0){

        localStorage.setItem("coucou","1");
        let idHistoire = takeInformation(allInformationImg('img'), sizeElemt("element"));
        suiteHistoire(idHistoire);
        // NEW BACKGROUND:
        console.log(typeof document.querySelector(`img#${idHistoire}`));
        if(document.querySelector(`img#${idHistoire}`)){
          var newBackground = document.querySelector(`img#${idHistoire}`).getAttribute("src");
          document.querySelector(".masthead").style.cssText=`background:url(${newBackground}) no-repeat center/cover; background-position:bottom;`;
        }
      }

    } 
  }
}


/*
_____  _     _    _ _____ ______ 
|  __ \| |   | |  | |_   _|  ____|
| |__) | |   | |  | | | | | |__   
|  ___/| |   | |  | | | | |  __|  
| |    | |___| |__| |_| |_| |____ 
|_|    |______\____/|_____|______|
                                                                
*/
function rainFall() {
const waterDrop = document.createElement('i');

if(findepluie==false){
  waterDrop.classList.add('fas');
  waterDrop.classList.add('fa-tint');
  waterDrop.style.left = Math.random() * window.innerWidth + 'px';
  waterDrop.style.animationDuration = Math.random() * 2 + 's';
  waterDrop.style.opacity = Math.random() + 0.4;
  waterDrop.style.fontSize = Math.random() * 15 +'px';
}

document.body.appendChild(waterDrop);

setTimeout(() => {
  waterDrop.remove();
}, 1000)
};

/*
_____  _____   ____  __  __ _____ _______ ______ _    _ _____  
|  __ \|  __ \ / __ \|  \/  |  __ \__   __|  ____| |  | |  __ \ 
| |__) | |__) | |  | | \  / | |__) | | |  | |__  | |  | | |__) |
|  ___/|  _  /| |  | | |\/| |  ___/  | |  |  __| | |  | |  _  / 
| |    | | \ \| |__| | |  | | |      | |  | |____| |__| | | \ \ 
|_|    |_|  \_\\____/|_|  |_|_|      |_|  |______|\____/|_|  \_\
                                                               
                                                               
*/
/* RETOURNE VALEUR RANDOM */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/*
                    _                       _                             _                                  _ _            
                   | |                     | |                      _    | |                                (_) |           
_ __ __ _ _ __   __| | ___  _ __ ___    ___| |_ ___  _ __ _   _   _| |_  | |_ _   _ _ __   _____      ___ __ _| |_ ___ _ __ 
| '__/ _` | '_ \ / _` |/ _ \| '_ ` _ \  / __| __/ _ \| '__| | | | |_   _| | __| | | | '_ \ / _ \ \ /\ / / '__| | __/ _ \ '__|
| | | (_| | | | | (_| | (_) | | | | | | \__ \ || (_) | |  | |_| |   |_|   | |_| |_| | |_) |  __/\ V  V /| |  | | ||  __/ |   
|_|  \__,_|_| |_|\__,_|\___/|_| |_| |_| |___/\__\___/|_|   \__, |          \__|\__, | .__/ \___| \_/\_/ |_|  |_|\__\___|_|   
                                                           __/ |               __/ | |                                      
                                                          |___/               |___/|_|                                      
*/
function genererHistoire(lieu){
  comte.innerHTML = "";
  circle.style.cssText="transform: translateX(-100vw) rotate(360deg); -webkit-transition: 1s 500ms;"; 

  var suiteHistoire = "";
  
  let mechant = new Array("loup","ours"); // mechants éventuellements recontrés
  let mechant2 = mechant[getRandomInt(mechant.length)];
  
  let objetsListe = new Array("le pin's", "le téléphone", "le foulard", "la basket"); // objets trouvés
  let objetsListe2 = objetsListe[getRandomInt(objetsListe.length)];
  
  let directionChemin = new Array("droite", "gauche"); // chemin
  let directionChemin2 = directionChemin[getRandomInt(directionChemin.length)];
  
  let etatFille = new Array("affamée", "saine et sauve"); // etat de la fille
  let etatFille2 = etatFille[getRandomInt(etatFille.length)];
  
  var siAffame = (etatFille2=="affamée") ? " Le petit garçon sorta donc les cookies restants pour lui les donner." : "";

  switch(lieu){
      case 'montagne':
      case 'forêt':
          suiteHistoire += `.<br><br>Le petit garçon courageux décida de se diriger vers la ${lieu}`;
          break;
      case 'tempête':
          suiteHistoire += `malgré la tempête.`;
          break;
      case 'refuge':
          suiteHistoire += `en direction du ${lieu} situé à la pointe de la montagne.`;
          break;
      default:
        resetPers();
  }

  suiteHistoire += `<br><br>Durant le périple le petit garçon rencontra un méchant ${mechant2} qui avait faim. Fort heuresement, le petit garçon a sorti quelques cookies de son sac qu'il jeta en direction de l'animal affamé afin de se sauver discrétement des griffes de cette bête féroce.<br><br>C'est après de longues heures de marche que le petit garçon trouva un indice lui indiquant qu'il était sur le bon chemin. En effet, il trouva ${objetsListe2} de Lyla au sol. Par conséquent, le petit garçon continua son chemin longuement, jusqu'à attérir à une intersection. Un à droite et un à gauche. Le petit garçon choisissa de faire confiance à son intution: il pris le chemin de ${directionChemin2}.`;
      
  switch(lieu){
      case 'montagne':
      case 'forêt':
          suiteHistoire += `<br><br>Perséverant, il décida de continuer malgré la nuit et le froid tombant. C'est grâce à ses efforts qu'il retrouva la petite fille ${etatFille2} sous une cabane de fortune perdu dans la ${lieu}. ${siAffame} Ils décidèrent tous les 2 de passer la nuit sur place, étant donné les vêtements chauds et le kit de survie que Lyla avait emporté.<br><br>C'est au levé du soleil, que les 2 petits aventuriers reprirent le chemin de la maison....`;
          break;
      case 'tempête':
          suiteHistoire += `<br><br>Le petit garçon décide de persister malgré l'arrivée de la tempête. C'est grâce à sa persévérance, que le petit garçon retrouvera la petite fille ${etatFille2} réfugiée dans une grotte. ${siAffame} Ils décidèrent de dormir sur place au chaud, grâce au petit feu que Lyla avait fait à l'aide du kit de secours qu'elle avait emporté.<br><br>C'est au petit matin, vers 6h, que les 2 aventuriers reprirent le chemin de la maison....`;
          break;
      case 'refuge':
          suiteHistoire += `<br><br>Le petit téméraire décida de se mettre à l'abri pour la nuit dans le refuge il qu'il a vu. C'est au moment où il ouvra la porte qu'il retomba sur la pauvre petite fille ${etatFille2}. ${siAffame}<br><br>C'est le lendemain que les 2 petits aventuriers retrouvèrent le chemin de leur domicile....`;
          break;
      default:
        resetPers();
  }

  

  // EFFET MACHINE A ECRIRE
  var str = suiteHistoire,
      i = 0,
      isTag,
      text;

  (function type() {
      text = str.slice(0, ++i);
      if (text === str) return;

      comte.innerHTML = text;
      
      /* ANIMATIONS */
      // déclenchement de la pluie
      var n = text.split(" "); // words array
      if(n[n.length - 1]=="tempête"){
        findepluie = false;
        setInterval(rainFall, 0.5); // déclenchement de la pluie sur le mot tempête
      }
      comte.scrollIntoView({block: "end"}); // descente prompteur
      /* FIN ANIMATIONS */

      var char = text.slice(-1);
      if( char === '<' ) isTag = true;
      if( char === '>' ) isTag = false;

      if (isTag) return type();
      setTimeout(type, 72);

      resetPers(suiteHistoire);
  }());    
  

  
}


/*
          _ _          _     _     _        _          
         (_) |        | |   (_)   | |      (_)         
___ _   _ _| |_ ___   | |__  _ ___| |_ ___  _ _ __ ___ 
/ __| | | | | __/ _ \  | '_ \| / __| __/ _ \| | '__/ _ \
\__ \ |_| | | ||  __/  | | | | \__ \ || (_) | | | |  __/
|___/\__,_|_|\__\___|  |_| |_|_|___/\__\___/|_|_|  \___|
                                                       
called with the keyboards keys (arrows)                                                    
*/
function suiteHistoire(idCarte){
  switch(idCarte){
      case 'carte1':
          genererHistoire("tempête");
          break;

      case 'carte2':
          genererHistoire("montagne");
          break;

      case 'carte3':
          genererHistoire("forêt");
          break;

      case 'carte4':
          genererHistoire("refuge");
          break;
      default:
        recharger();
  }
}


//-------------------------------------------------------gestion d'évènements des touches que l'utilisateur pressent. 

function isCollide2(){
  perso.style.transition = "all 100ms ease-in-out";
  isCollide(sizeElemt('element'),sizeElements('img'));
}

window.addEventListener('load', function(){
  localStorage.setItem("coucou", "0");

   //switch case 
    window.addEventListener("keydown", function(event) {

      //je récupère evenement sur les touches 
      var keyName = event.key;
     
      switch (keyName) {

        case "ArrowDown":
          // Faire quelque chose pour la touche "flèche vers le bas" pressée.
          perso.style.bottom = (parseInt(perso.style.bottom || 150) - 10)+'px';
          isCollide2();
          break;
          
        case "ArrowUp":
          perso.style.bottom = (parseInt(perso.style.bottom || 150) + 10)+'px';
          isCollide2();
          break;
          
        case "ArrowLeft":
          // Faire quelque chose pour la touche "left arrow" pressée.
          perso.style.left = (parseInt(perso.style.left || 0) - 10)+'px';
          isCollide2();
          break;
          
        case "ArrowRight":
          // Faire quelque chose pour la touche "right arrow" pressée.
          perso.style.left = (parseInt(perso.style.left || 0) + 10)+'px';
          isCollide2();
          break;
          
        case "Enter":
          // Faire quelque chose pour les touches "enter" ou "return" pressées.
          break;
        case "Escape":
          // Faire quelque chose pour la touche "esc" pressée.
          break;
        default:
          return; // Quitter lorsque cela ne gère pas l'événement touche.
      }
    
      // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
      event.preventDefault();
    }, true);
})