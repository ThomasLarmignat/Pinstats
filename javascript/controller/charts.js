

	function fillcolorData(tab){
		var dataColors = [];
		var bleu = 0;
		var rouge = 0;
		var vert = 0;
		var jaune = 0;
		var gris = 0;
		var noir = 0;
		var blanc = 0;

		var autre = 0;
		for(var i=0; i< tab.length ; i++){
			if(tab[i].couleur == "Bleu"){
				 bleu++;
			}else if(tab[i].couleur == "Rouge"){
				 rouge++;
			}else if(tab[i].couleur == "Vert"){
				 vert++;
			}else if(tab[i].couleur == "Blanc"){
				 blanc++;
			}else if(tab[i].couleur == "Gris"){
				 gris++;
			}else if(tab[i].couleur == "Noir"){
				 noir++;
			}else if(tab[i].couleur == "Jaune"){
				 jaune++;
			}else {
				 autre++;
			}

		}

		if(bleu !=0){
			dataColors.push({ y: bleu, label:"Bleu" });
		}

		if(rouge !=0){
			dataColors.push({ y: rouge, label:"Rouge" });
		}

		if(vert !=0){
			dataColors.push({ y: vert, label:"Vert" });
		}
		if(noir !=0){
			dataColors.push({ y: noir, label:"Noir" });
		}

		if(blanc !=0){
			dataColors.push({ y: blanc, label:"Blanc" });
		}

		if(gris !=0){
			dataColors.push({ y: gris, label:"Gris" });
		}

		if(jaune !=0){
			dataColors.push({ y: jaune, label:"Jaune" });
		}

		if(autre !=0){
			dataColors.push({ y: autre, label:"Autres" });
		}
		return(dataColors);

	}

	function convertStyleColors(tab){
		var arr1 =[];
		for(var i=0; i<tab.length ; i++){
			if(tab[i].label == "Bleu"){
				if(!arr1.includes("blue")){
					arr1.push("blue");
				}
			}else if(tab[i].label == "Rouge"){
				if(!arr1.includes("red")){
					arr1.push("red");
				}
			}else if(tab[i].label == "Vert"){
				if(!arr1.includes("green")){
					arr1.push("green");
				}
			}else if(tab[i].label == "Noir"){
				if(!arr1.includes("black")){
					arr1.push("black");
				}
			}else if(tab[i].label == "Blanc"){
				if(!arr1.includes("white")){
					arr1.push("white");
				}
			}else if(tab[i].label == "Gris"){
				if(!arr1.includes("grey")){
					arr1.push("grey");
				}
			}else if(tab[i].label == "Jaune"){
				if(!arr1.includes("yellow")){
					arr1.push("yellow");
				}
			}else{
				if(!arr1.includes("orange")){
					arr1.push("orange");
				}
			}
		}
		return(arr1);
	}





	function findSixlastsMounths(){
		var maMap = new Map();

		var today = new Date();

		for(var i=4; i>=0 ;i--){

			var last6 = new Date(today.getFullYear(),today.getMonth()-i,0);
			last6.setDate(Math.min(today.getDate(),last6.getDate()));


			maMap.set(last6.getMonth(),0);
		}
		maMap.set(today.getMonth(),0);

		return(maMap);
	}


	function fillDataDate(data, map){
		var today = new Date();
		var tab = [];
		for(var i=0; i<data.length ;i++){
			if(map.get((data[i].date).getMonth()) != undefined && (today.getFullYear() ==  (data[i].date).getFullYear() || today.getFullYear() ==  (data[i].date).getFullYear()+1)){
				map.set((data[i].date).getMonth(), map.get((data[i].date).getMonth())+1);
			}
		}


		for (var [mois, occ] of map) {
				var i = 0;
				if(i>3){
					break;
				}
				if(mois == 0){
					tab.push({ label: "Janvier", y: occ});
				}else if(mois == 1){
					tab.push({ label: "Fevrier", y: occ});
				}else if(mois == 2){
					tab.push({ label: "Mars", y: occ});
				}else if(mois == 3){
					tab.push({ label: "Avril", y: occ});
				}else if(mois == 4){
					tab.push({ label: "Mai", y: occ});
				}else if(mois == 5){
					tab.push({ label: "Juin", y: occ});
				}else if(mois == 6){
					tab.push({ label: "Juillet", y: occ});
				}else if(mois == 7){
					tab.push({ label: "Aout", y: occ});
				}else if(mois == 8){
					tab.push({ label: "Septembre", y: occ});
				}else if(mois == 9){
					tab.push({ label: "Octobre", y: occ});
				}else if(mois == 10){
					tab.push({ label: "Novembre", y: occ});
				}else if(mois == 11){
					tab.push({ label: "Decembre", y: occ});
				}

		}
		return(tab);
	}


	function loadChartsAbo(abonements, abonnes){
		CanvasJS.addColorSet("colors",["grey","#333333"]);
		var chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			colorSet: "colors",
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Abonnés/Abonnements"
			},

			data: [{
				type: "pie",
				startAngle: 25,
				toolTipContent: "<b>{label}</b>: {y}",

				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: [
					{ y: abonements, label:"Abonnements" },
					{ y: abonnes, label:  "Abonnés" },
				]
			}]
		});
		chart.render();

		}



	function loadChartsColors(tab){
		var dataC = fillcolorData(tab);
		var dataStyle = convertStyleColors(dataC);
		 CanvasJS.addColorSet("greenShades",dataStyle);
		var chart = new CanvasJS.Chart("chartContainerColor", {
			theme: "light2",
            		colorSet: "greenShades",

				 // "light1", "light2", "dark1", "dark2"
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Répartition des pins du compte"
			},
			data: [{
				type: "pie",
				startAngle: 25,
				toolTipContent: "<b>{label}</b>: {y} pins",

				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y} pins",
				dataPoints: dataC
			}]

		});
		chart.render();

		}



function loadChartsEvol(data) {
	var mois = findSixlastsMounths();
	var dataEvol = fillDataDate(data, mois);


CanvasJS.addColorSet("greyShades",["#333333"]);
var chart = new CanvasJS.Chart("chartContainerEvol", {
	theme: "light2",
	animationEnabled: true,
	colorSet: "greyShades",
	title: {
		text: "Pins sur les 6 derniers mois"
	},
	axisY: {
		title: "nombre de Pins",
		includeZero: false
	},
	axisX: {
		title: "6 derniers mois"
	},
	data: [{
		type: "column",
		yValueFormatString: "#,##0.0#\"\"",
		dataPoints: dataEvol
	}]
});
chart.render();

}
