/**
 * Created by liuwei on 2017/4/26.
 */
var fruitObj=function(){
    this.alive=[];
    this.x=[];
    this.y=[];
    this.orange=new Image();
    this.blue=new Image();
    this.l=[];
    this.Spd=[];
    this.fruitType=[];
    this.aneNO=[];
};
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
    this.orange.src='src/fruit.png';
    this.blue.src='src/blue.png';


    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.Spd[i]=Math.random()*0.01+0.005;
        this.fruitType[i]='';
        this.aneNO[i]=0;
    }
    
};

fruitObj.prototype.draw=function(){
   for(var i=0;i<this.num;i++){

       if(this.alive[i]) {
           if(this.fruitType[i]=='blue'){
               var pic=this.blue;
           }else{
               var pic=this.orange;
           }
           if (this.l[i] < 14) {
               var NO=this.aneNO[i];
               this.x[i]=ane.headx[NO];
               this.y[i]=ane.heady[NO];
               this.l[i] += this.Spd[i] * deltaTime;    //使效果更平滑

           } else {
               this.y[i] -= this.Spd[i] * 7 * deltaTime;

           }
           ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
       }
       if(this.y[i]<10){
           this.alive[i]=false;
       }
   }
};
fruitObj.prototype.born=function(i){
    this.aneNO[i]=Math.floor(Math.random()*ane.num);//果实长在哪棵海葵上
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.2){
        this.fruitType[i]='blue';
    }else{
        this.fruitType[i]='orange';
    }
};
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
};
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;
    }
    if(num<15){
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}