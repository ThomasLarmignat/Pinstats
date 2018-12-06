function selectionneurCouleur(color , inter){
		var newInter = [];
		for(var i=0; i< inter.length ; i++){
			if(inter[i].couleur == color){
				newInter.push(inter[i]);
			}
		}
		return(newInter);
	    }



  	  function selectionneurTaille(size , inter){
		var newInter = [];
		for(var i=0; i< inter.length ; i++){
			if(inter[i].taille == size){
				newInter.push(inter[i]);
			}
		}
		return(newInter);
	    }



	    function selectionneurBoard(board, inter){
		var newInter = [];
		for(var i=0; i< inter.length ; i++){
			if(inter[i].board == board){
				newInter.push(inter[i]);
			}
		}
		return(newInter);
	    }
