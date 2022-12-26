var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var r=50
ctx.canvas.width = window.innerWidth-50;
ctx.canvas.height = window.innerHeight-100;
var penwidth=document.querySelector('#penwidth').value;
var selectcolor=document.querySelector('.selectcolor');



function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

canvas.addEventListener('wheel', preventScroll);


var snapshots = new Array();
var sl=-1;
stdraw=false;
var circledraw=false;
var color='white';
var type='default';
var open=false;
var crsr='default';
var width1=3;
var draw=false;
var touchx,touchy,newtouchx,newtouchy;
var a;
var x;
var y;
var newx;
var touching;
var newy;
function addtext(){
    var s=document.querySelector('.text').value;
    var a=document.querySelector('.xcord').value;
    var b=document.querySelector('.ycord').value;
    var w=document.querySelector('.fwidth').value;
    ctx.font='bold '+parseInt(w)+'px Arial';
    ctx.fillText(s, parseInt(a), parseInt(b));
    snapshots.push(canvas.toDataURL());
    sl+=1;
}
function text(){
    if(document.querySelector('.definetext').hasAttribute('style')){
        document.querySelector('.definetext').removeAttribute('style');
    }
    else{
    document.querySelector('.definetext').setAttribute('style','display:flex;');
}}
function stldraw(){
    canvas.setAttribute('style','cursor:'+'crosshair');
    if(stdraw==false){
        document.querySelector('#stline').setAttribute('style','background-image: url(Ruler.ico);border:solid green;');
        stdraw=true;}
    else{
        document.querySelector('#stline').setAttribute('style','background-image: url(Ruler.ico);border:solid black;');
        stdraw=false;
    }}
    function cirdraw(){
        canvas.setAttribute('style','cursor:cross-hair;');
        if(circledraw==false){
            document.querySelector('#circle').setAttribute('style','background-image: url(circle.png); border:solid green;');
            circledraw=true;}
        else{
            document.querySelector('#circle').setAttribute('style','background-image: url(circle.png); border:solid black;');
            circledraw=false;
        }}

function undo(){
    if(sl>0){
        sl-=1;
        var canvasPic = new Image(canvas.width,canvas.height);
        a=snapshots[sl];
        canvasPic.src = a;
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        canvasPic.onload = function() { ctx.drawImage(canvasPic, 0, 0); }
        // document.querySelector('.test').setAttribute('src',snapshots[sl]);
        // console.log("drawn");
    }}
function redo(){
        if(sl<snapshots.length-1){
            sl+=1;
            var canvasPic = new Image(canvas.width,canvas.height);
            a=snapshots[sl];
            canvasPic.src = a;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvasPic.onload = function() { ctx.drawImage(canvasPic, 0, 0); }
            //  document.querySelector('.test').setAttribute('src',snapshots[sl]);
            //  console.log("drawn");
        }}
function clearboard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
        }
document.querySelector('#pen').addEventListener('click',()=>{
    if(open==false){
        open=true;
        selectcolor.removeAttribute('style');
        document.querySelector('.fathercolor').setAttribute('style','display:unset;')
        selectcolor.setAttribute('style','display:inline-block;');
    }
    else{
       open=false; 
       document.querySelector('.fathercolor').removeAttribute('style');
    selectcolor.removeAttribute('style');
    selectcolor.setAttribute('style','display:none;');}
})
function drawstop(event) {
    touching=false;
    if(stdraw==true){
        ctx.beginPath();
        ctx.lineWidth=width1;
        ctx.lineCap = type;
        ctx.strokeStyle=color;
        ctx.moveTo(x,y); 
        ctx.lineTo(newx,newy);
        ctx.stroke();}
    if(circledraw==true){
        ctx.strokeStyle=color;
        ctx.beginPath();
        ctx.arc(x,y,Math.sqrt((x-newx)*(x-newx)+(y-newy)*(y-newy)),0,(Math.PI)*2);
        ctx.stroke();}
    draw=false;

}
function colorchange(clr){
    color=clr;
    document.querySelector('#pen').setAttribute('style','background-color:'+color+';')
    if(clr=='white'){
        width1=50;
        stdraw=false;
        document.querySelector('#stline').setAttribute('style','background-image: url(Ruler.ico);border:solid black;');
        circledraw=false;
        document.querySelector('#circle').setAttribute('style','background-image: url(circle.png); border:solid black;');
        canvas.setAttribute('style','cursor:'+'url("erase.png"),default;');
    }
    else{
        penwidth=document.querySelector('input').value;
        width1=penwidth;
        canvas.setAttribute('style','cursor:crosshair;');
    }
    if(width1>4){
        type='round';
    }
}

canvas.addEventListener("mousedown", getClickPosition, false);
canvas.addEventListener("touchstart", (ejj)=>{
    touching=true
    if(open==true){
        open=false; 
       document.querySelector('.fathercolor').removeAttribute('style');
    selectcolor.removeAttribute('style');
    selectcolor.setAttribute('style','display:none;');
    }
    x = ejj.touches[0].clientX-canvas.offsetLeft;
    y = ejj.touches[0].clientY-canvas.offsetTop;
    snapshots.push(canvas.toDataURL());
    sl+=1;
    draw=true;
    canvas.addEventListener("touchend",drawstop,false );
    canvas.addEventListener("touchmove",(ejj2)=>{
        
        if(draw==true){
            if(stdraw==false &&circledraw==false){
            console.log("drawing",draw);
            ctx.beginPath();
            ctx.lineWidth=width1;
            ctx.lineCap = type;
            ctx.strokeStyle=color;
            ctx.moveTo(x,y);
            ctx.lineTo((ejj2.touches[0].clientX-canvas.offsetLeft),(ejj2.touches[0].clientY-canvas.offsetTop));
            ctx.stroke();
            x=ejj2.touches[0].clientX-canvas.offsetLeft;
            y=ejj2.touches[0].clientY-canvas.offsetTop;}
        else{
            newx=ejj2.touches[0].clientX-canvas.offsetLeft;
            newy=ejj2.touches[0].clientY-canvas.offsetTop;
        }
        }

    },false);
    
}, false);
function getClickPosition(e) {
    if(open==true){
        open=false; 
       document.querySelector('.fathercolor').removeAttribute('style');
    selectcolor.removeAttribute('style');
    selectcolor.setAttribute('style','display:none;');
    }
    draw=true
    x = e.clientX-canvas.offsetLeft-9;
    y = e.clientY-canvas.offsetTop-9;
    // if (sl < snapshots.length) { snapshots.length = sl; }
    snapshots.push(canvas.toDataURL());
    sl+=1;
    canvas.addEventListener("mouseup",drawstop,false);
    canvas.addEventListener("mousemove",drawstart,false );
    
}
function drawstart(event) {
    if(draw==true){
    if(stdraw==false &&circledraw==false){
    ctx.beginPath();
    ctx.lineWidth=width1;
    ctx.lineCap = type;
    ctx.strokeStyle=color;
    ctx.moveTo(x,y);
    ctx.lineTo((event.clientX-canvas.offsetLeft-9),(event.clientY-canvas.offsetTop-9));
    ctx.stroke();
    x=event.clientX-canvas.offsetLeft-9;
    y=event.clientY-canvas.offsetTop-9;
}
else{
    newx=event.clientX-canvas.offsetLeft-9;
    newy=event.clientY-canvas.offsetTop-9;
}
}

}
