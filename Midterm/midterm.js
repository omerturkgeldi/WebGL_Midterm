var canvas;
var gl;
var vPosition;
var program;

var letter1vertices, letter2vertices;
var buffer1,buffer2,cBuffer1,cBuffer2;

// TODO: define any global variables you need
var colors= [];
var colors2 = [];

var vColor;
var redValue = 1.0;
var greenValue = 0.0; 
var blueValue = 0.5;
var scaleXValue = 1.0;
var scaleYValue = 1.0;
var posXValue = 0.0;
var posYValue = 0.0;


window.onload = function init()
{
    document.getElementById("redSlider").value = redValue;
    document.getElementById("greenSlider").value = greenValue;
    document.getElementById("blueSlider").value = blueValue;
    colorize(redValue,blueValue,greenValue);
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data


    // TODO: create vertex coordinates for your initial letters instead of these vertices
    
    letter1vertices = [vec2(-0.8, -0.5),
                        vec2(-0.65,-0.5),
                        vec2(-0.8,0.35),
                        vec2(-0.65,0.5),
                        vec2(-0.8,0.5),
                        vec2(-0.8,0.35),
                        vec2(-0.2,0.5),
                        vec2(-0.2,0.35),
                        vec2(-0.2,0.5),
                        vec2(-0.35,0.5),
                        vec2(-0.2,-0.5),
                        vec2(-0.35,-0.5),
                        vec2(-0.2,-0.35),
                        vec2(-0.2,-0.5),
                        vec2(-0.8,-0.5),
                        vec2(-0.8,-0.35),
                        vec2(-0.2,-0.35),
                        ];

    letter2vertices = [vec2(0.1, 0.5),
                        vec2(0.9, 0.5),
                        vec2(0.1, 0.35),
                        vec2(0.9, 0.35),
                        vec2(0.575, 0.5),
                        vec2(0.425, 0.5),
                        vec2(0.575, -0.5),
                        vec2(0.425, -0.5)];

        

function colorize(redValue,greenValue,blueValue){
    colors = [];
    colors2 = [];

    for (let index = 0; index < 17; index++) {   
        colors.push(vec4(redValue,greenValue,blueValue,1.0));
    }

    for (let index = 0; index < 17; index++) {   
        colors2.push(vec4(1-redValue,1-greenValue,1-blueValue,1.0));
    }

    console.log(redValue,greenValue,blueValue);
    var _r = Math.floor((1-redValue)   * 255);
    var _g = Math.floor((1-greenValue) * 255);
    var _b = Math.floor((1-blueValue)  * 255);
    var r = Math.floor((redValue)   * 255);
    var g = Math.floor((greenValue) * 255);
    var b = Math.floor((blueValue)  * 255);
    var col1 = "rgb(" + _r + "," + _g + "," +_b + ")";
    var col2 = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById("redSliderLabel").style.color = col1;
    document.getElementById("greenSliderLabel").style.color = col2;
    document.getElementById("blueSliderLabel").style.color = col1;
}

 
    // Load the data into the GPU		
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );      


	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value

        posXValue = posX.value;
        console.log("posX:" + posXValue);
        document.getElementById("posXLabel").innerHTML = posXValue;

    };    

    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value

        posYValue = posY.value;
        console.log("posY:" + posYValue);
        document.getElementById("posYLabel").innerHTML = posYValue;

    };
    
    
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value

        scaleXValue = scaleX.value;
        console.log("scaleX:" + scaleXValue);
        document.getElementById("scaleXLabel").innerHTML = scaleXValue;

    };

    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value

        scaleYValue = scaleY.value;
        console.log("scaleY:" + scaleYValue);
        document.getElementById("scaleYLabel").innerHTML = scaleYValue;

    };  
    
    
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value

        redValue = Number(redSlider.value);
        console.log("Red: " + redValue);
        colorize(redValue,greenValue,blueValue);          
        document.getElementById("redSliderLabel").innerHTML = redValue;

    };

    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value

        greenValue = Number(greenSlider.value);
        console.log("Green: " + greenValue);
        colorize(redValue,greenValue,blueValue);
        document.getElementById("greenSliderLabel").innerHTML = greenValue;
  
    };

    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value

        blueValue = Number(blueSlider.value);
        console.log("Blue: " + blueValue);
        colorize(redValue,greenValue,blueValue);  
        document.getElementById("blueSliderLabel").innerHTML = blueValue;
 
    };
 
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // TODO: Send necessary uniform variables to shader and perform draw calls for drawing letters

    // -------------------------------------------------------------------------------
    var scaleXLoc = gl.getUniformLocation(program,"scaleXValue");
    gl.uniform1f(scaleXLoc,scaleXValue);
    
    var scaleYLoc = gl.getUniformLocation(program,"scaleYValue");
    gl.uniform1f(scaleYLoc,scaleYValue);

    var posXLoc = gl.getUniformLocation(program,"posXValue");
    gl.uniform1f(posXLoc,posXValue);
    
    var posYLoc = gl.getUniformLocation(program,"posYValue");
    gl.uniform1f(posYLoc,posYValue);
    // -------------------------------------------------------------------------------




    // -------------------------------------------------------------------------------
    cBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);  
     
    vColor = gl.getAttribLocation(program,"vColor"); 
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );    
    // -------------------------------------------------------------------------------
    
    // -------------------------------------------------------------------------------
    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);
    // -------------------------------------------------------------------------------





    // -------------------------------------------------------------------------------
    cBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors2), gl.STATIC_DRAW);  
     
    vColor = gl.getAttribLocation(program,"vColor"); 
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );       
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);
    // -------------------------------------------------------------------------------
 

    window.requestAnimFrame(render);
}
