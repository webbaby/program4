/**
 * Created by liuwei on 2017/4/26.
 */
var canvas1;
var canvas2;
var ctx1;
var ctx2;
var lastTime;
var deltaTime;   //每两帧之间的时间间隔
var bgPic=new Image();
var canvasWidth;
var canvasHeight;
var ane;
var fruit;
var mom;
var mx;
var my;
var baby;
var babyTail=[];    //放置小鱼尾巴摆动的所有图片的数组
var babyEye=[];
var babyBody=[];
//存放大鱼动画的序列帧图片
var bigTail=[];
var bigEye=[];
var data;  //计数
//大鱼身体有黄色和蓝色两种
var bigBodyOrg=[];
var bigBodyBlue=[];
//给玩家的反馈效果
var wave;
var halo;
var dust;
var dustPic=[];
document.body.onload=game;  //程序入口

function game(){
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameLoop();
}
function init(){
     canvas1=document.getElementById("canvas1");
    canvas1.addEventListener('mousemove',mousemove,false);   //给鼠标添加监听事件
     ctx1=canvas1.getContext('2d');   //draw fish ,fruits...
     canvas2=document.getElementById("canvas2");
     ctx2=canvas2.getContext('2d');   //draw background
     bgPic.src="src/background.jpg";
     canvasWidth=canvas1.width;
    canvasHeight=canvas1.height;
    ane=new aneObj();
    ane.init();
    fruit=new fruitObj();
    fruit.init();
    mom=new momObj();
    mom.init();
    mx=canvasWidth*0.5;
    my=canvasHeight*0.5;
    baby=new babyObj();
    data=new dataObj();
    baby.init();
    wave=new waveObj();
    wave.init();
    halo=new haloObj();
    halo.init();
    dust=new dustObj();
    dust.init();
    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="src/dust"+i+".png";
    }
    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="src/baby/babyTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src='src/baby/babyEye'+i+'.png';
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src='src/baby/babyFade'+i+'.png';
    }
    for(var i=0;i<8;i++){
        bigTail[i]=new Image();
        bigTail[i].src="src/bigTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        bigEye[i]=new Image();
        bigEye[i].src="src/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        bigBodyOrg[i]=new Image();
        bigBodyBlue[i]=new Image();
        bigBodyOrg[i].src="src/bigSwim"+i+".png";
        bigBodyBlue[i].src="src/bigSwimBlue"+i+".png";
    }
    ctx1.fillStyle="white";
    ctx1.font="30px Arial";
    ctx1.textAlign="center";
}
function gameLoop(){
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40){
        deltaTime=40;
    }
    window.requestAnimationFrame(gameLoop);   //循环更新
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canvasWidth,canvasHeight);//画每一帧之前都要将背景之外的内容清除
    mom.draw();
    baby.draw();
    momFruitCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function mousemove(e){
    if(!data.gameOver){
        if(e.offsetX||e.layerX){
            mx=e.offsetX==undefined?e.layerX:e.offsetX;
            my=e.offsetY==undefined?e.layerY:e.offsetY;
        }
    }
    
}