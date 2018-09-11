const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const MIN_SIZE = 10;
const MAX_SIZE = 100;
const DEFAULT_COLOR = "black";
const MAX_VALUE = 500;

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

	// return [3,1,2,10,11,12,7,8,9,4,5,6,13,14,15];
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

function insertionSort(){
	reset();
	var ind = 0;
	var st = 0;
	intervalId = setInterval(function(){
		draw(arr);
		fillNthElement(ind);
		fillNthElement(st,"red");
		if(ind==0 || arr[ind]>=arr[ind-1]){
			st++;
			ind = st;
			return;
		}
		if(st==arr.length){
			stop();
			return;
		}
		swap(arr,ind,ind-1);
		ind--;
	},TICK_RATE);
}

function heapSort(){
	reset();
	var colors = [
		"Maroon","Red","Orange",
		"Yellow","Olive","Green",
		"Purple","Teal","Lime",
		"Blue","Aqua","Navy"
	];

	function drawHeap(){
		let powerOfTwo = 1;
		let color = 0,ind = 0;
		for(let i=0;i<arr.length;i++){
			fillNthElement(i,colors[color]);
			ind++;
			if(ind==powerOfTwo){
				color++;
				powerOfTwo*=2;
				ind = 0;
			}
		}
	}

	let n = arr.length-1;
	var st = arr.length-1;
	var ind = st;

	intervalId = setInterval(function createHeap(){
		draw(arr);
		drawHeap();
		fillNthElement(ind,"black");
		let max = ind;
		let r = 2*ind+1;
		let l = 2*ind+2;
		if(l<n && arr[l]>arr[max]){
			max = l;
		}
		if(r<n && arr[r]>arr[max]){
			max = r;
		}
		if(arr[max] == arr[ind]){
			st--;
			ind = st;
			if(st<0){
				stop();
				// TICK_RATE = 500;
				intervalId = setInterval(sortFromHeap,TICK_RATE)
			}
			return; 
		}
		if(max==l){
			swap(arr,ind,l);
			ind = l;
		}
		if(max==r){
			swap(arr,ind,r);
			ind = r;
		}
	},TICK_RATE);

	var last = arr.length-1;
	var i = last;

	function drawHeap2(){
		let powerOfTwo = 1;
		let color = 0,ind = 0;
		for(let i=0;i<last;i++){
			fillNthElement(i,colors[color]);
			ind++;
			if(ind==powerOfTwo){
				color++;
				powerOfTwo*=2;
				ind = 0;
			}
		}
	}

	function sortFromHeap(){
		draw(arr);
		drawHeap2();
		fillNthElement(i);
		if(last<=0){
			stop();
			return;
		}
		let max = i;
		let r = 2*i+1;
		let l = 2*i+2;
		if(l<=last && arr[l]>arr[max]){
			max = l;
		}
		if(r<=last && arr[r]>arr[max]){
			max = r;
		}
		if(i>=last || arr[max]==arr[i]){
			swap(arr,0,last);
			last--;
			i = 0;
			return;
		}
		if(max==l){
			swap(arr,i,l);
			i = l;
		}
		if(max==r){
			swap(arr,i,r);
			i = r;
		}
		

	}
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
	if (e.keyCode == 'I'.charCodeAt(0)) 
		insertionSort();
	if (e.keyCode == 'H'.charCodeAt(0)) 
		heapSort();

}
document.addEventListener('keyup', doc_keyUp, false);

document.getElementById('generate').onclick = generate;
document.getElementById('bubbleSort').onclick = bubleSort;
document.getElementById('selectionSort').onclick = selectionSort;
document.getElementById('insertionSort').onclick = insertionSort;
document.getElementById('heapSort').onclick = heapSort;



document.getElementById('fast').onclick = ()=>{TICK_RATE = 10};
document.getElementById('medium').onclick = ()=>{TICK_RATE = 200};
document.getElementById('slow').onclick = ()=>{TICK_RATE = 1000};

generate();
