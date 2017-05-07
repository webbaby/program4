/**
 * Created by liuwei on 2017/4/27.
 */
var momObj=function(){
    this.x;
    this.y;

    this.angle;  //大鱼的旋转角度
    this.bigTailTimer=0;
    this.bigTailCount=0;
    this.bigEyeTimer=0;
    this.bigEyeCount=0;
    this.bigEyeInterval=1000;
    this.bigBodyCount=0;
};
momObj.prototype.init=function(){
    this.x=canvasWidth*0.5;
    this.y=canvasHeight*0.5;
    this.angle=0;
};
momObj.prototype.draw=function(){
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
    this.bigTailTimer+=deltaTime;
    if(this.bigTailTimer>50){
        this.bigTailCount=(this.bigTailCount+1)%8;
        this.bigTailTimer%=50;
    }
    this.bigEyeTimer+=deltaTime;
    if(this.bigEyeTimer>this.bigEyeInterval){
        this.bigEyeCount=(this.bigEyeCount+1)%2;
        this.bigEyeTimer%=this.bigEyeInterval;
        if(this.bigEyeCount==0){
            this.bigEyeInterval=Math.random()*1500+2000;
        }else{
            this.bigEyeInterval=200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var bigEyeCount=this.bigEyeCount;
    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);
    var momBodyCount=this.bigBodyCount;
    if(data.double==2){
        ctx1.drawImage(bigBodyBlue[momBodyCount],-bigBodyBlue[momBodyCount].width*0.5,-bigBodyBlue[momBodyCount].height*0.5);
    }else{
        ctx1.drawImage(bigBodyOrg[momBodyCount],-bigBodyOrg[momBodyCount].width*0.5,-bigBodyOrg[momBodyCount].height*0.5);
    }
    var bigTailCount=this.bigTailCount;
    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);
    ctx1.restore();
};