var height = 150;
var width = 150;

var pixels = new Array();

var screenDiv;

var pixelOffValue = 'black';

function init(){


	screenDiv = document.getElementById("screen");

	onkeypress = keypress;

	//initialize pixels to emptiness
	for(var i = 0; i < height; i++){
		//once per column
		pixels[i] = new Array();

		for(var j = 0; j < width; j++){
			pixels[i][j] = 0;
		}
	}

	//generate screen
	for(var i = 0; i < height; i++){
		//once per column
		var d = document.createElement('div');
		d.id = 'r' + i.toString();
		d.style = 'float: top;';
		screenDiv.appendChild(d);

		for(var j = 0; j < width; j++){
			//make columns in each row
			var dd = document.createElement('div');
	//		dd.appendChild(document.createTextNode("d"));
			dd.id = 'r' + i.toString() + 'c' + j.toString();
			dd.style = 'float: left;';
			dd.style.height = '5px';
			dd.style.width = '5px';
			d.appendChild(dd);
			pixels[i][j] = dd;
		}
	}

	clearScreen();

}

//set the color value of a pixel on the screen
function setPixel(_row,_col,_value){
	//check valid pixel range
	if((_row < 0 || _col < 0) || (_row >= height || _col >= width)){
			console.log('Wrote to pixel outside screen at r' + _row.toString() + 'c' + _col.toString());
			return;
	}
	
	if(pixels[_row][_col]){
		

		//if _value is falsy replace with pixelOffValue
		_value = _value ? _value : pixelOffValue;

		//write to the pixel
		pixels[_row][_col].style.backgroundColor = _value;

		return;
	
		
	}
	console.log('Wrote to falsy pixel at r' + _row.toString() + 'c' + _col.toString());
}


function clearScreen(){
	for(var i = 0; i < height; i++){
		//once per row
		for(var j = 0; j < width; j++){
			//once for each pixel in the row
			setPixel(i,j,pixelOffValue);
		}
	}
}

//needs work

// /**
// Draw a line on the screen from r1,c1 to r2,c2
// */
function drawLine(r1,c1,r2,c2,value){
	var slope = (1.00 * c2 - 1.00 * c1)/(1.00 * r2 - 1.00* r1);
	var theta = Math.atan(slope);
	var lineLength = Math.sqrt((r2-r1)**2+(c2-c1)**2);

	console.log("Slope:");
	console.log(slope);

	for(d = 0; d <= lineLength; d++){
		var dx = d*Math.sin(theta);
		var dy = d*Math.cos(theta);
		setPixel(Math.round(r1 + dy),Math.round(c1 + dx),value);
	}
}

/**
Draw a box on the screen

*/
function drawBox(){

	//use drawLine() for borders then optional boolean to fill?

	return;
}

/**
Draw a circle with radius rad centered on row,col with pixel value
*/
function drawCircle(row,col,rad,value){

	var numPlotPoints = rad * 2.0 * Math.PI * 12;
	var dTheta = 2.0*Math.PI*(1.0 / numPlotPoints);

	//spin around cicle setting pixels
	for(th = 0; th < 2.0*Math.PI; th += dTheta){
		var y = rad * Math.sin(th);
		var x = rad * Math.cos(th);

		setPixel(Math.floor(row + x),Math.floor(col + y), value);
	}

	return;
}

/**
Overloaded circle with additional parameter to fill the circle
*/
function drawCircleFill(row,col,rad,value){

	//draw circles all the way down
	for(i = rad; i >= 0; i--){
		drawCircle(row,col,i,value);
	}

}

/** Draw a sprite (matrix of values) starting from top left coordinate
*/
function drawSprite(row,col,sprite){
	for(i = row; i < row + sprite.length; i++){
		for(j = col; j < col + sprite[0].length; j++){
			setPixel(i,j,sprite[i-row][j-col]);
		}
	}
}

function keypress(ke){
	console.log(ke);

	if(ke.code == "KeyC"){
		clearScreen();
		console.log('clearing...');
	}else{

		drawCircleFill(75,75,1.0*ke.key*10,'green');
	}

}

var shipSprite = [
	[null,'blue',null],
	['blue','blue','blue'],
	['blue','blue','blue'],
	['blue',null,'blue'],
]


window.onload = function(){
	init();
	setPixel(9,10,'white');
	drawSprite(3,3,shipSprite);

	setPixel(59,40,'white');
	drawLine(10,10,60,40,'pink');
}