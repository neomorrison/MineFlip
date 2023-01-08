var amt = 1;
var bombs = [];
var revealed = [];
	
function play(){
	resetGame();
	bombs = loadGame(amt);
}

function changeMines(value){
	amt = value;
}
		
function loadGame(bombs){
	var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
		
	// Disables playing while in progress
	var button = document.getElementById("start");
	button.disabled = true;
	button.innerHTML = '<i class="fa-solid fa-bomb fa-shake"></i>';
	
  	// Shuffle the array
  	numbers.sort(() => Math.random() - 0.5);

  	// Pick the first 'num' elements from the shuffled array
  	var pickedNumbers = numbers.slice(0, bombs);

  	// Return the picked numbers
  	return pickedNumbers;
}
		
		
	
function flip(id){
	revealed.push(id);
	var win = new Audio('files/win.wav');
	var loss = new Audio('files/loss.wav');
	var button = document.getElementById(id);
	var icon = button.getElementsByTagName('i')[0];
	
	for(i = 0; i < bombs.length; i++){
		if(bombs[i] == id){
			icon.classList.add('fa-solid', 'fa-bomb', 'fa-shake', 'fa-6x');
			icon.style.setProperty('color', 'red');
			button.style.backgroundColor = '#071725';
			loss.play();
			
			for(i = 1; i <= 25; i++){
				var button = document.getElementById(i);
				button.disabled = true;
			}
			
			revealAll();
			break;
		}
		icon.classList.add('fa-solid', 'fa-gem', 'fa-beat', 'fa-5x');
		icon.style.setProperty('--fa-animation-duration', '2s');
		icon.style.setProperty('color', 'yellow');
		button.style.backgroundColor = '#071725';
		win.play();
		button.disabled = true;
	}
}
		
function revealAll() {
	var intArray = [];
	
	for(p = 0; p < revealed.length; p++){
		intArray.push(parseInt(revealed[p]));
	}
	for(i = 1; i <= 25; i++){
		if(!intArray.includes(i)){
			var button = document.getElementById(i);
			var icon = button.getElementsByTagName('i')[0];
					
			if(bombs.includes(i)){
				icon.classList.add('fa-solid', 'fa-bomb', 'fa-shake', 'fa-2xl');
				icon.style.setProperty('color', 'darkred');
				button.style.backgroundColor = '#071725';
			}else{
				icon.classList.add('fa-solid', 'fa-gem', 'fa-beat', 'fa-xl');
				icon.style.setProperty('--fa-animation-duration', '2s');
				icon.style.setProperty('color', '#0A5C1C');
				button.style.backgroundColor = '#071725';
			}
		}
	}
			
	var button = document.getElementById("start");
	button.disabled = false;
	button.innerHTML = "PLAY";
}
		
function resetGame(){
	revealed = [];
	for (var i = 1; i <= 25; i++) {
		// Get the button element
		var button = document.getElementById(i.toString());
		button.style.backgroundColor = "#304453";
		button.disabled = false;

		// If the button exists, remove the icon
		if (button) {
			// Get the first child element of the button
			var firstChild = button.children[0];

			// If the first child element is an icon, remove it
			if (firstChild.tagName === 'I') {
				button.removeChild(firstChild);
			}
		}
		const icon = document.createElement('i');
		button.appendChild(icon);
	}
}
