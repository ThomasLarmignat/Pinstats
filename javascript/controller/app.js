var tab ;
var init;
var utilisateur;
var divPrincipale = document.getElementById("container");
var header = document.getElementById("MyHead");
var divVisible =  document.getElementById("invisible");
app = angular.module("MonApp",[]);
loading = document.getElementById("loading");

var couleur = document.getElementById("couleur");
var tailleCombo = document.getElementById("taille");
/*------------Modal-----------------------*/
var span = document.getElementsByClassName("close")[0];//Modal Fermeture
var modal = document.getElementById('myModal');
var infosDesc = document.getElementById('infosDesc');
var infosTaille = document.getElementById('infosTaille');
var infosDate = document.getElementById('infosDate');
var infosRepins = document.getElementById('infosRepins');
var photoModal = document.getElementById("photoModal");





app.controller("demo", function($scope,$timeout){
  var cont = angular.element(document.querySelector('#container'));
  var h = angular.element(document.querySelector('#MyHead'));
  $scope.run = function() {
    if($scope.nomutil!=""){
      divVisible.style.display = "none";
      lanceAppli($scope.nomutil);
      cont.empty();
      h.empty();
      $timeout(function() {
        if(getEtat()!= -1){
          loading.style.visibility = "hidden";
          divVisible.style.display = "inline";
          $("html, body").animate({ scrollTop: $("#divUser").offset().top }, 1500);
          utilisateur = getUser();
          tab = getTabImages();
          run(tabImages);
          addOptionBoards($scope);
          loadCharts(tab,utilisateur);
          loadUserInfos($scope, utilisateur);
        }else{
          $scope.nomutil = null;
        }
      }, 6000);
    }
  };

  $scope.runImages = function(){
    cont.empty();
    h.empty();
    tri($scope);
  }
});


function loadCharts(tab, utilisateur){
  loadChartsColors(tab);
  loadChartsEvol(tab);
  loadChartsAbo(utilisateur.suis,utilisateur.suivis);
}

function loadUserInfos($scope, utilisateur){
  $scope.infosNom = utilisateur.nom;
  $scope.infosPins = utilisateur.pins;
  $scope.infoSuivis = utilisateur.suis;
  $scope.infosSuis = utilisateur.suivis;
  $scope.infoID = utilisateur.indentite;
  $scope.infoDate = "Membre depuis : "+ utilisateur.date;
  $scope.infoUrl = utilisateur.url;
  $scope.infoB = "Bio : " + utilisateur.bio;
  $scope.photoP = utilisateur.image;
  $scope.infoLieu = utilisateur.lieu;
}



  function run(inter){
  	for(var i=0; i<inter.length ; ++i){
  		if(inter[i].cell !="none"){
  			var tuile = document.createElement('div');
  			tuile.className = inter[i].cell;
  			var image = document.createElement('img');
  			image.src = inter[i].url;
			var interDate = inter[i].date.getMonth()+1;
  			image.date =inter[i].date.getDay()+"/"+interDate +"/"+ inter[i].date.getFullYear();
  			image.size =inter[i].largeur + "x" + inter[i].longueur;
  			image.des = inter[i].nom;
  			image.pop = inter[i].popularite;
  			image.addEventListener('click', function(){
          //a refaire
  				photoModal.src = this.src;
  				infosDesc.textContent ="Description : " + this.des;
  				infosTaille.textContent ="Taille : " + this.size;
  				infosDate.textContent	="Date :" + this.date;
  				infosRepins.textContent ="RePins :" + this.pop;
  				modal.style.display = "block";
  				"block";
  			}, true);
  			image.style.width="100%";
  			tuile.appendChild(image);
  			divPrincipale.appendChild(tuile);
  	}
  }
  $("#container").nested({minWidth: 75,
  						animate: true,
  						animationOptions: {
  									speed: 20,
  						}});
  }

  function afficher(inter){
  			for(var i=0; i< inter.length ; i++){
  				var img = document.createElement('img');
  				img.src = inter[i].url;
  				img.style="	width: 150px;height: auto;vertical-align:top;padding:0;margin:0;";
  				header.appendChild(img);
  		}
  }

function addOptionBoards($scope){
    $scope.boards = getTabNames();
    $scope.board = $scope.boards[0];
}



span.onclick = function() {
modal.style.display = "none";
}


window.onclick = function(event) {
if (event.target == modal) {
  modal.style.display = "none";
}
}

function lanceAppli(pseudo){
	loadPseudo(pseudo);
}


function tri($scope) {
var inter =[];
inter = tab;

 if($scope.board != "Choisir un Board"){
   inter = selectionneurBoard($scope.board,inter);
 }
 if(couleur.value != "default"){
   inter = selectionneurCouleur(couleur.value,inter);
 }
 if(tailleCombo.value != "default"){
   inter = selectionneurTaille(tailleCombo.value,inter);
 }
 if($scope.valueTriSize == true){
   inter = triPix(inter);
   $scope.valueTriSize = false;
 }
 if($scope.valueTriDate == true){
   inter = triDateP(inter);
   $scope.valueTriDate = false;
 }
 if($scope.valueTriPop == true){
   inter = triPop(inter);
   $scope.valueTriPop = false;
 }
 if($scope.valueTriDefault == true){
   $scope.valueTriDefault = false;
 }
 if(tailleCombo.value == "Longues" || tailleCombo.value == "Larges"){
    afficher(inter)
 }else{
   run(inter);
 }
}
