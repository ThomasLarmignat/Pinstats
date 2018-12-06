var utilisateur = new Object();
var tabImages = [];
var tabNames = [];
var token = 'AZRK9tp04Ht7hMBA3TlDjMhY053eFR6IYPPlxodEx3kfpsAuxwAAAAA';
var donnees;
var etat;

function getEtat(){
	return etat;
}

function getUser(){
		return utilisateur;
}


function getTabImages(){
		return tabImages;
}

function getTabNames(){
		return tabNames;
}

function profilUser(id_user) {
	var requestURL = 'https://api.pinterest.com/v1/users/'
			+id_user+'/?access_token='
			+token
			+'&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage%2Cusername%2Ccounts%2Ccreated_at%2Caccount_type%2Cbio';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var rep = request.response;
		donnees = rep['data'];
		 utilisateur.image = donnees.image['60x60'].url;
		 utilisateur.nom = donnees.username;
		 utilisateur.pins =donnees.counts.pins;
		 utilisateur.suivis =donnees.counts.followers;
		 utilisateur.suis =donnees.counts.following;
		 utilisateur.indentite = donnees.first_name +" "+donnees.last_name;
		 utilisateur.url =donnees.url;
		 var crea = new Date(donnees.created_at);
		 var mois = crea.getMonth()+1;
		 var jour = crea.getDay()+1;
		 if(mois<10){
			 mois ='0'+mois;
		 }
		 if(jour<10){
			 jour ='0'+jour;
		 }
		 utilisateur.date = jour +"/"+ mois +"/"+crea.getFullYear();

		 if(donnees.bio !=""){
			 utilisateur.bio = donnees.bio;
		 }else{
			 utilisateur.bio ="Rien à afficher"
		 }
	 	}
	}



function Allphotos(url,board) {
	var requestURL = url;
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var rep = request.response;
		donnees = rep['data'];
		var nxt = rep['page'];
		for(var j = 0;((j < donnees.length)); j++) {
			var image = new Object();
			image.url = donnees[j].image.original.url ;
			image.couleur =  hexToColor(donnees[j].color);
			image.board = board;
			image.nom = donnees[j].note;
			image.taille = convertTaille(donnees[j].image.original.width,donnees[j].image.original.height);
			image.cell = dectectSizeCase(donnees[j].image.original.width,donnees[j].image.original.height, image.taille);
			image.popularite = donnees[j].counts.saves;
			image.totalPixel = donnees[j].image.original.width * donnees[j].image.original.height;
			image.date =new Date(donnees[j].created_at) ;
			image.largeur = donnees[j].image.original.width;
			image.longueur = donnees[j].image.original.height;
			tabImages.push(image);
		}

	}
}


function loadPseudo(pseudo){
	tabImages = [];
	tabNames = ["Choisir un Board"];
	ps = pseudo;
	var requestURL = 'https://api.pinterest.com/v3/pidgets/users/'+ps+'/pins/';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var rep = request.response;
		var statut =  rep['status'];
		if(statut == "failure"){
			alert("Utilisateur non trouvé");
			etat = -1;
		}else{
			console.log(rep);
			boards(rep);
		}
	}
}

function boards(jsonObj) {
	var array1 = [];

	donnees = jsonObj['data'];
	
	var tabpin = donnees.pins;
	if(tabpin[0].pinner.location != ""){
		utilisateur.lieu = tabpin[0].pinner.location;
	}else{
		utilisateur.lieu = "Non renseigné";
	}
	
	if(donnees == null || tabpin[0] == undefined){
		alert("Utilisateur non trouvé");
		etat = -1;
	}else{
		loading.style.visibility = "visible";
		etat =1;
		profilUser(tabpin[0].pinner.id);
		for(var j = 0; j< tabpin.length-1 ; j++) {
			if(!array1.includes(tabpin[j].board.url)){
				array1.push(tabpin[j].board.url);
				var url = 'https://api.pinterest.com/v1/boards/'
				+ tabpin[j].board.id
				+'/pins/?access_token='
				+token
				+'&fields=id%2Clink%2Cnote%2Curl%2Cattribution%2Ccreated_at%2Ccounts%2Ccolor%2Cimage';
				tabNames.push(tabpin[j].board.name);
				Allphotos(url,tabpin[j].board.name);
			}

		}
	}
}
