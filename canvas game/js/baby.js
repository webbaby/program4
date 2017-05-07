/**
 * Created by liuwei on 2017/4/27.
 */
var babyObj=function(){
    this.x;
    this.y;
    this.angle;
    this.babyTailTimer=0;
    this.babyTailCount=0;
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeInterval=1000;//小鱼眼睛眨动的间隔时间
    this.babyBodyTimer=0;
    this.babyBodyCount=0;

};
babyObj.prototype.init=function(){
    this.x=canvasWidth*0.5-50;
    this.y=canvasHeight*0.5-50;
    this.angle=0;


};
babyObj.prototype.draw=function(){
    this.x=lerpDistance(mom.x,this.x,0.98);  //让小鱼的坐标趋近于大鱼.
    this.y=lerpDistance(mom.y,this.y,0.98);
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);
    //对小鱼尾巴计时
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCount=(this.babyTailCount+1)%8;
        this.babyTailTimer%=50;
    }
    //对小鱼眼睛进行计数
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        if(this.babyEyeCount==0){
            this.babyEyeInterval=Math.random()*1500+2000;
        }else{
            this.babyEyeInterval=200;
        }
        this.babyEyeTimer%=this.babyEyeInterval;
    }
    //小鱼身体颜色变化
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;   //计时器归零
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            //game over
            data.gameOver=true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var babyTailCount=this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
    var babyBodyCount=this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    var babyEyeCount=this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();
};