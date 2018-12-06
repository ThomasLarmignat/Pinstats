		const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16));


function hexToColor(hex){
		if(hex == null){
			return("none");
		}else{
			var arr = (hexToRgb(hex).toString()).split(",");
			var R = parseInt(arr[0]);
			var G = parseInt(arr[1]);
			var B = parseInt(arr[2]);
			if(R<32 && G<32 && B<32){
				return("Noir");
			}else if(B-R>32 && B-G>32){
				return("Bleu");
			}else if(R-G>32 && R-B>32){
				return("Rouge");
			}else if(R > 223 && G > 223 && B > 223){
				return("Blanc");
			}else if((Math.abs(R-B) < 33) && (Math.abs(R-G) < 33) && (Math.abs(B-G) < 33)){
				return("Gris");
			}else if(G-R>32 && G-B>32 || Math.abs(R-G) < 33){
				return("Vert");
			}else{
				return("none");
			}
		}
	}




	    function convertTaille(largeur,longueur){
			if(longueur<300 && largeur<300){
				return("Petites");
			}else if(longueur<600 && largeur<600){
				return("Moyennes");
			}else if( longueur > largeur*2){
				return("Longues");
			}else if( largeur > longueur*2){
				return("Larges");
			}else{
				return("Grandes");
			}

	    }



		function dectectSizeCase(larg ,long, taille){
			if(larg/long > 0.4 && larg/long <0.6){
				return("box size12")
			}else if(larg/long > 0.6 && larg/long <0.9){
				return("box size23")
			}else if(larg/long > 0.9 && larg/long < 1.3){

				if(taille == "Petites"){
					return("box size11")
				}else if(taille == "Moyennes"){
					return("box size22")
				}else{
					return("box size33")
				}



			}else if(larg/long > 1.3 && larg/long < 1.7){
				return("box size32")
			}else if(larg/long > 1.7 && larg/long < 2.2){
				return("box size21")
			}else{
				return("none");
			}
		}
