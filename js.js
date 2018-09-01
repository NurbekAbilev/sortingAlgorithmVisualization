const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MIN_SIZE = 10;
const MAX_SIZE = 100;

let TICK_RATE = 10; 

let arr = [];
let intervalId = 1;

function createRandomArray(size){
	let arr = [];
	for(let i=0;i<size;i++){
		arr.push(i+1);
	}
	
	let lastIndex = arr.length - 1;
	
	while(lastIndex > 0){
		let ind = Math.floor(Math.random()*lastIndex);
		let temp = arr[lastIndex];
		arr[lastIndex] = arr[ind];
		arr[ind] = temp;
		lastIndex--;
	}	
	return arr;
}

function generate(){
	clearInterval(intervalId);
	let size = document.getElementById('arrSize').value;
	size = parseInt(size);
	if(size>MAX_SIZE)
		size = MAX_SIZE;
	if(size<MIN_SIZE)
		size = MIN_SIZE;
	arr = createRandomArray(size);
	draw(arr);
}

function clear(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
}

function draw(arr){
	
	clear();
	
	let size = arr.length;
	let width = WIDTH/size;
	let	height = HEIGHT/size;
	
	ctx.font = "30px Arial";
	
	for(let i=0;i<size;i++){
		ctx.fillStyle = "black";
		ctx.fillRect(i*width,0,width,height*arr[i]);
	}
}

let ind = 0,st = 0;
let swapped = 1;
function bubleSort(){
	clearInterval(intervalId);
	ind = 0;
	st = 0;
	intervalId = setInterval(function(){
		if(arrayIsSorted(arr)){
			clearInterval(intervalId);
			draw(arr);
		}
		if(ind==arr.length-1){
			ind = 0;
		}
		draw(arr);		
		let size = arr.length;
		let width = WIDTH/size;
		let	height = HEIGHT/size;
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(ind*width,0,width,height*arr[ind]);
		ctx.fillRect((ind+1)*width,0,width,height*arr[ind+1]);
		
		
		if(arr[ind]>arr[ind+1]){
			swap(arr,ind,ind+1);
		}
		
		ind++;
		
	}, TICK_RATE);
}

function swap(arr,i,j){
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

function arrayIsSorted(arr){
	for(let i=0;i<arr.length-2;i++){
		if(arr[i]>arr[i+1]){
			return false;
		}
	}
	return true;
}


generate();

document.getElementById('generate').onclick = generate;
document.getElementById('bubbleSort').onclick = bubleSort;







