$(function() {
	let nbrTask = 0; //compteur de tache "en cours"
	let indexTask=0; // pour indexer id de l'imput checkbox
	let $newTask = $('input:text');
	let $listDesTaches = $('#task');
	let nameOfListShow ='all'; //pour gerer les different type d'affiche de list lorsque l'on coche ou décoche une tache

	//ajouter la tache en appuyant sur la touche entrer et incremente le nbr de tache a faire
	$newTask.on('keypress', function (event){
		if(event.which == 13){
			event.preventDefault();
			indexTask++;
			nbrTask++; //on incremente le nbr de tache total "en cours"
			var text = $newTask.val();
			$listDesTaches.prepend('<p class="form-check"><input type="checkbox" class="form-check-input" id="tache'+indexTask+'" name="tache'+indexTask+'"><label for="tache'+indexTask+'" class="form-check-label" >'+text+'</label></p>');
			$newTask.val('');

			//pour ne pas afficher le nouveau item creer si l'on est dans la liste des taches "terminer"
			if(nameOfListShow == 'taskDo'){
				$('#task p:first').hide();
			}

			$('strong').text(nbrTask); //pour afficher le nouveaux nombre de "tache a faire"
		}
	});

	//pour barrer les taches que l'on a fait
	$listDesTaches.on("click", "input", function(){
		var name = $(this).attr('name');

		if($(this).is(':checked')){
			$('[for='+name+']').css("text-decoration", "line-through");

			nbrTask--;//on décrémente le nbr de tache total "en cours"

			//pour gerer la disparition de l'item quand on le coche si on est sur la liste des taches "en cours"
			if(nameOfListShow == 'taskStandBy'){
				$(this).parent().hide();
			}
		}else {
			$('[for='+name+']').css("text-decoration", "none");
			
			nbrTask++;//on recrémente le nbr de tache total "en cours"

			// pour gerer la disparition de l'item quand on le décoche si on est sur la liste des tache "terminer"
			if(nameOfListShow == 'taskDo'){
				$(this).parent().hide()
			}
		}
		$('strong').text(nbrTask); //pour afficher le nouveaux nombre de "tache a faire"
	});

	//pour afficher toutes les taches 
	$('#toutes').on("click", function(){
		nameOfListShow ='all';
		var selector = $(':checkbox')
		selector.parent().each(function(){
			$(this).show();
		});
	});

	//pour n'afficher que les taches "en cours" (donc masquer les tache "terminer")
	$('#enCours').on("click", function(){
		nameOfListShow ='taskStandBy';
		var selector = $(':checkbox');
		selector.each(function(){
			if($(this).is(':checked')){
				$(this).parent().hide();
			}else{
				$(this).parent().show();
			}
		});
	});

	//pour n'afficher que les taches "terminer" (donc masquer les tache "en cours")
	$('#terminer').on("click", function(){
		nameOfListShow ='taskDo';
		var selector = $(':checkbox');
		selector.each(function(){
			if($(this).is(':not(:checked)')){
				$(this).parent().hide();
			}else{
				$(this).parent().show();
			}
		});	
	});
	
	//pour supprimer une tache
	$('#supprimer').on("click", function(){
		$(":checkbox").each(function(){
			if($(this).is(':checked')){
				$(this).parent().remove();
			}
		});
	});

});