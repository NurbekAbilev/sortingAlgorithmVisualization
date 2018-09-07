/*function sort(a){
	let minIndex = 0;
    let maxIndex = 0;
    let st = 0;
    let ind = 0;
	for(st = 0;st<a.length-1-st;st++){
		for(let i=st;i<a.length-1-st;i++){
			if(a[i]>a[minIndex]){
				minIndex = st;
			}
			if(a[i]<a[maxIndex]){
				maxIndex = st;
			}
		}
		let temp = a[maxIndex];
		a[maxIndex] = a[st];
		a[st] = temp;

		let d = a.length-1-st;
		temp = a[minIndex];
		a[minIndex] = a[d];
		a[d] = temp;
	}
	return a;
}

let a = sort([1,2,3,1,3,6,1,5,9,6,3]);
console.log(a);

*/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MIN_SIZE = 10;
const MAX_SIZE = 100;
const DEFAULT_COLOR = "black";

let ind = 0,st = 0;

let TICK_RATE = 50;

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
	
	ctx.fillStyle = DEFAULT_COLOR;
	for(let i=0;i<size;i++){
		ctx.fillRect(i*width,0,width,height*arr[i]);
	}
}

function stop(){
	clearInterval(intervalId);
}

function reset(){
	stop();
}
function bubleSort(){
	reset();
	var ind = 1;
	intervalId = setInterval(function(){
		draw(arr);	
		if(arrayIsSorted(arr)){
			stop();
		}
		if(ind==arr.length-1){
			ind = 0;
		}
		
		fillNthElement(ind,"purple");
		fillNthElement(ind+1,"red");
		
		if(arr[ind]>arr[ind+1]){
			swap(arr,ind,ind+1);
		}
		
		ind++;
	}, TICK_RATE);
}

function selectionSort(){
	reset();
	var ind = 0;
	var minIndex = 0;
	var st = 0;
	intervalId = setInterval(function(){
		draw(arr);
		if(arr[minIndex]>arr[ind]){
			minIndex = ind;
		}
		if(ind == arr.length-1){
			swap(arr,minIndex,st);
			st++;
			ind = st;
			minIndex = st;
		}
		if(st==arr.length-1){
			draw(arr);stop();
		}
		
		
		fillNthElement(minIndex,"blue");
		fillNthElement(st,"red");
		fillNthElement(ind);
		ind++;
	},TICK_RATE);
}

function doubleSelectionSort(){
	reset();
	var ind = 0;
	var minIndex = 0;
	var maxIndex = 0;
	intervalId = setInterval(function(){
		draw(arr);
		if(arr[minIndex]>arr[ind]){
			minIndex = ind;
		}
		if(arr[maxIndex]<arr[ind]){
			maxIndex = ind;
		}
		
		if(ind >= arr.length-1-st){
			swap(arr,minIndex,st);
			swap(arr,maxIndex,arr.length-1-st);
			st++;
			ind = st;
			minIndex = st;
			maxIndex = arr.length-1-st;
		}

		if(st>=arr.length-1-st){
			draw(arr);stop();
		}
		
		fillNthElement(st,"red");
		fillNthElement(arr.length-1-st,"red");
		fillNthElement(ind);

		fillNthElement(maxIndex,"orange");
		fillNthElement(minIndex,"blue");

		ind++;
	},TICK_RATE);
	
}

function fillNthElement(n,color = "yellow"){
	let size = arr.length;
	let width = WIDTH/size;
	let	height = HEIGHT/size;
		
	ctx.fillStyle = color;
	ctx.fillRect(n*width,0,width,height*arr[n]);
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

function doc_keyUp(e) {
	if (e.keyCode == 'A'.charCodeAt(0)) 
		document.getElementById('arrSize').focus();
	if (e.keyCode == 'G'.charCodeAt(0)) 
		generate();
    if (e.keyCode == 'B'.charCodeAt(0)) 
		bubleSort();
	if (e.keyCode == 'S'.charCodeAt(0)) 
		selectionSort();
	if (e.keyCode == 'D'.charCodeAt(0)) 
		doubleSelectionSort();

}
document.addEventListener('keyup', doc_keyUp, false);

document.getElementById('generate').onclick = generate;
document.getElementById('bubbleSort').onclick = bubleSort;
document.getElementById('selectionSort').onclick = selectionSort;
document.getElementById('doubleSelectionSort').onclick = doubleSelectionSort;

document.getElementById('fast').onclick = ()=>{TICK_RATE = 10};
document.getElementById('medium').onclick = ()=>{TICK_RATE = 200};
document.getElementById('slow').onclick = ()=>{TICK_RATE = 1000};

generate();

