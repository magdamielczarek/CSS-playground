$(document).ready(function(){
	
// R E P L A Y  B U T T O N //

const replay_btn = document.querySelectorAll('.replay');
replay_btn.forEach(function(element){
	
	element.addEventListener('click', function(event){
		let $container = $(this).next();
		$container.find('*').each(function() {
    		$(this).replaceWith($(this).clone(true));
		});
	});	
});



// T O T E M //

const character = document.querySelectorAll('#totem .description span');
const totem_buttons = document.querySelectorAll('#totem .buttons button');
const cubes = document.querySelectorAll('#totem .cube');
const cards = document.querySelectorAll('#totem .card');
const char_button = document.querySelector('#totem .description button');


totem_buttons.forEach(function(element,index){
	let rotation = 0;
	element.addEventListener('click', function(event){
		rotation +=90;
		cubes[index].style.transform = 'rotateY('+ rotation +'deg)';
	});
});



$.ajax({
    type: "GET",   
    url: "totem.json",
    dataType : 'json',
    success: function(data) {
    	let img_src;
    	let negation;
		cubes.forEach(function(element,index){
			element.addEventListener('click',function(event){
				img_src = event.target.getAttribute('src');
				let animal_name = img_src.slice(13,(img_src.indexOf('.')));
				for(let i=0;i<data.animals.length;i++){
					if(animal_name == data.animals[i].name){
						character[index].innerHTML = `<span class="adjective">${data.animals[i].character_positive}</span><br/> as ${animal_name}`;
						character[index].setAttribute('data', data.animals[i].character_negative);
					}
				};
			});
		});
		char_button.addEventListener('click', function(event){
			character.forEach(function(element){
				element.childNodes[0].innerText = element.getAttribute('data');
			});
		});
    },
    error: function() {
        console.log("Wystąpił błąd");
    }
});


}); //end of ready