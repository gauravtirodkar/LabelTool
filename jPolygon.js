//window.onload = function() {
//    if(!window.location.hash) {
//        window.location = window.location + '#loaded';
//        window.location.reload();
//    }
//}

var major = new Array();

//Source of Image
var source = "";

//Define necessary variables
var perimeter = new Array(); //Saves the coords of of the polygon the user is drawing

var already_created = new Array(); //Saves coords of all the polygons on screen

//Defines the canvas properties and sets the image on refresh
var canvas = document.getElementById("jPolygon");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = source;

canvas.width  = img.naturalWidth;
canvas.height = img.naturalHeight;
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

// To save the previous width and height used during zoom-in and out
var old_width = img.naturalWidth;
var old_height = img.naturalHeight;

//Listener to Upload Image to label
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var chooseFile = document.getElementById('chooseFile');
chooseFile.addEventListener('change', loadFile, false);

//Upload image and save it's source address
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        
        img.src = event.target.result;
        source = event.target.result;
        console.log(img.src);
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            console.log("second");
           // ctx.drawImage(img,0,0,canvas.width,canvas.height);
            zoom(true,0);
        }
    }
    
//    console.log(source);
    reader.readAsDataURL(e.target.files[0]);  
    
}

//Manipulate the dimensions and draw polygons
function correct_dim(){
	//Set blank canvas with Image
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	img = new Image();
    img.src = source;
    console.log(source);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	
	ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.lineCap = "square";
    ctx.beginPath();
    
    //Manipulate Data to fit to current dimensions
    var widthratio = (canvas.width/old_width);
    var heightratio = (canvas.height/old_height);
    for(var j=0;j<already_created.length;j++){
    	for(var i=0; i<already_created[j].length; i++){
    		already_created[j][i]['x'] = Math.floor(already_created[j][i]['x'] * widthratio); //Measures ratio of previous and current canvas size to find relative coordinates
    		already_created[j][i]['y'] = Math.floor(already_created[j][i]['y'] * heightratio);
    	}
    }
    
    //Draw polygons on canvas
    for(var j=0;j<already_created.length;j++){
	    for(var i=0; i<already_created[j].length; i++){
	        if(i==0){
	            ctx.moveTo(already_created[j][i]['x'],already_created[j][i]['y']);
	            true || point(already_created[j][i]['x'],already_created[j][i]['y']);
	        } else {
	            ctx.lineTo(already_created[j][i]['x'],already_created[j][i]['y']);
	            true || point(already_created[j][i]['x'],already_created[j][i]['y']);
	        }
	    }
	    if(true){
	        ctx.lineTo(already_created[j][0]['x'],already_created[j][0]['y']);
	        ctx.closePath();
	        ctx.strokeStyle = 'orange';
	        
	    }
	    ctx.stroke();	
	    }	
}

// Zoom-In and Zoom-Out Function
function zoom(z, scale){
	
	//Zoom-Out max till 1600px only
	if(canvas.width>1600 && z==false){ 
	canvas.width -= scale;
	canvas.height-= scale;
	//Zoom Out
	}else{ 
		if(z==true && canvas.width <5600){ //Zooms maximum till 5600px only
		canvas.width += scale;
		canvas.height+= scale;	
		//Zoom In
		}else{
			// If max zoom limit is reached , system gives an alert about it
			alert('Limit');
			return ;
		}
	}
	console.log("First src " + source);
	//Manipulate the dimensions and draw polygons
	correct_dim();
	
	//Resets values for next zoom
    old_height = canvas.height; 
    old_width = canvas.width;
   
}

//To zoom in and out on scroll
window.addEventListener("wheel", function(event){
	  if(event.altKey){
		  if(event.deltaY>0)
			  zoom(false,100);
		  else
			  zoom(true,100);
	  }
	});

//Check if lines are intersecting or not
function line_intersects(p0, p1, p2, p3) {
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1['x'] - p0['x'];
    s1_y = p1['y'] - p0['y'];
    s2_x = p3['x'] - p2['x'];
    s2_y = p3['y'] - p2['y'];

    var s, t;
    s = (-s1_y * (p0['x'] - p2['x']) + s1_x * (p0['y'] - p2['y'])) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0['y'] - p2['y']) - s2_y * (p0['x'] - p2['x'])) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        return true;
    }
    return false; // No collision
}


//Defines parameters for plotting a point
function point(x, y){
    ctx.fillStyle="green";
    ctx.strokeStyle = "green";
    ctx.fillRect(x-2,y-2,4,4);
    ctx.moveTo(x,y);
}

// Performs UNDO while drawing 
function undo(){
    perimeter = new Array();
    correct_dim();
}

//Clears the entire canvas and refreshes all the values
function clear_canvas(){
	location.reload();
}

function draw(end){
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.lineCap = "square";
    ctx.beginPath();

    //Plots points on the canvas from perimeter array
    for(var i=0; i<perimeter.length; i++){
        if(i==0){
            ctx.moveTo(perimeter[i]['x'],perimeter[i]['y']);
            end || point(perimeter[i]['x'],perimeter[i]['y']);
        } else {
            ctx.lineTo(perimeter[i]['x'],perimeter[i]['y']);
            end || point(perimeter[i]['x'],perimeter[i]['y']);
        }
    }
    
    //Closes the polygon on right click
    if(end){
        ctx.lineTo(perimeter[0]['x'],perimeter[0]['y']);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.strokeStyle = 'blue';
    }
    ctx.stroke();
    
  //On closing the polynomial, saves the coords in already_created variable and displays it in text-box
    if(end){   	
    	already_created.push(perimeter);
    	//Refreshes the arrays for new polygon
    	perimeter = new Array();
    
    }
}

function check_intersect(x,y){
    if(perimeter.length < 4){
        return false;
    }
    var p0 = new Array();
    var p1 = new Array();
    var p2 = new Array();
    var p3 = new Array();

    p2['x'] = perimeter[perimeter.length-1]['x'];
    p2['y'] = perimeter[perimeter.length-1]['y'];
    p3['x'] = x;
    p3['y'] = y;

    for(var i=0; i<perimeter.length-1; i++){
        p0['x'] = perimeter[i]['x'];
        p0['y'] = perimeter[i]['y'];
        p1['x'] = perimeter[i+1]['x'];
        p1['y'] = perimeter[i+1]['y'];
        if(p1['x'] == p2['x'] && p1['y'] == p2['y']){ continue; }
        if(p0['x'] == p3['x'] && p0['y'] == p3['y']){ continue; }
        if(line_intersects(p0,p1,p2,p3)==true){
            return true;
        }
    }
    return false;
}


//On click executes the function to start plotting points for polygon
function point_it(event) {
    var rect, x, y;
    
    //Attempt to close the polygon 
    if(event.ctrlKey || event.which === 3 || event.button === 2){
        //Will not allow to create a polygon on the first or second click
    	if(perimeter.length <=2){
            alert('You need at least three points for a polygon');
            return false;
        }
    	//Completes polygon on on right click and draws last line to first coord
        x = perimeter[0]['x'];
        y = perimeter[0]['y'];
        
        if(check_intersect(x,y)){
            alert('The line you are drawing intersect another line');
            return false;
        }
        
        //On final click asks for labeling the polygon
        var label = prompt("Label : ","dog");
        perimeter.push(label);
        
        draw(true);
        event.preventDefault(); 
        return false;
    } 
    //Allows to edit on middle mouse button
    else if(event.button===1){
    	 editSides(event);
    }
    else {
    	// Find coordinates with respect to the canvas
        rect = canvas.getBoundingClientRect();
        x = Math.floor(event.clientX - rect.left);
        y = Math.floor(event.clientY - rect.top);
        
        //Zooms in if clicked twice on the same point
        if (perimeter.length>0 && x == perimeter[perimeter.length-1]['x'] && y == perimeter[perimeter.length-1]['y']){
            undo();
            zoom(true,500);
        	return false;
        }
        
        // Pushes the point into array and passes the data to draw function for plotting it on canvas
        perimeter.push({x,y});
        draw(false);
        return false;
    }
}


//Takes the image param and draws the image on canvas
function start(with_draw) {
	console.log(source);
    var img = new Image();
    img.src = source;

    img.onload = function(){
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if(with_draw == true){
            draw(false);
        }
    }
}

//Downloads the polygon coordinates with labels in a JSON file (data.json)
function savecoords(){
	var widthratio = (canvas.width/old_width);
    var heightratio = (canvas.height/old_height);
	for (var j=0;j<already_created.length;j++){
		for(var i=0;i<already_created[j].length;i++){
			already_created[j][i]['x'] = Math.floor(already_created[j][i]['x'] *(img.naturalWidth/canvas.width));
			already_created[j][i]['y'] = Math.floor(already_created[j][i]['y'] *(img.naturalHeight/canvas.height));
		}
	}
	var a = document.createElement("a");
    var file = new Blob([JSON.stringify(already_created)], {type:'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'data.json';
    a.click();
}

// On clicking around a vertex of a polygon this function deletes that particular polygon
 
function editSides(event){
		rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
		for(var j=0;j<already_created.length;j++){
	    for(var i=0; i<already_created[j].length; i++){
	        if(already_created[j][i]['x'] > x-10 && already_created[j][i]['x'] < x+10){
	        	alert('Deleting...');
	        	already_created.splice(j,1);	        	
	        	correct_dim();
	        }
	    } 
	    }

}


// Testing for file upload
function loadFile() {
    var input, file, fr;
    
    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('chooseFile');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]){
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

function receivedText(e) {
  let lines = e.target.result;
  var data = JSON.parse(lines);
  	ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.lineCap = "square";
    ctx.beginPath();

    //If zoomed in or out we need to manipulate the data
    var widthratio = (canvas.width/img.naturalWidth);
    var heightratio = (canvas.height/img.naturalHeight);
    for(var j=0;j<data.length;j++){
    	for(var i=0; i<data[j].length; i++){
    		data[j][i]['x'] = data[j][i]['x'] * widthratio;
    		data[j][i]['y'] = data[j][i]['y'] * heightratio;
    	}
    }
    
    //Draw the polygons 
    for(var j=0;j<data.length;j++){
    	already_created.push(data[j]);
    for(var i=0; i<data[j].length; i++){
        if(i==0){
            ctx.moveTo(data[j][i]['x'],data[j][i]['y']);
            true || point(data[j][i]['x'],data[j][i]['y']);
        } else {
            ctx.lineTo(data[j][i]['x'],data[j][i]['y']);
            true || point(data[j][i]['x'],data[j][i]['y']);
        }
    }

    ctx.lineTo(data[j][0]['x'],data[j][0]['y']);
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.stroke();	
    
    }
    }
}
