// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
   extends: cc.Component,
   
   properties: {
       m_FloorBlock:[cc.Prefab],
   },
   
   onLoad: function () {
       this.m_offset_start = 0;
       this.m_offset_end = 0;
   },
   changeFloor:function()
   {
       var starPos = 0;
               for (var i = 0; i < this.m_BaseView.m_Floor.length; i++) {
                   if( this.m_BaseView.m_Floor[i] == this.node && i != 0)
                   {
                       starPos = this.m_BaseView.m_Floor[i-1].x + this.m_BaseView.m_Floor[i-1].width;
                   }
                   
               }
               this.node.x = starPos;
       
               var left = cc.instantiate(this.m_FloorBlock[FloorBlockLeft]);
               this.node.addChild(left);
               left.x = 0;
               var posX = left.width;
       
               var count = this.myRandow(3,10);
               // count = 1;
               for (var i = 0; i < count; i++) {
                   var floor = cc.instantiate(this.m_FloorBlock[FloorBlockMin]);
                   this.node.addChild(floor);
                   floor.x = posX;
                   posX += floor.width;
               }
       
               var right = cc.instantiate(this.m_FloorBlock[FloorBlockRight]);
               this.node.addChild(right);
               right.x = posX;
       
               posX += right.width;
       
               this.node.width = posX+this.myRandow(100,200);
       
             
               var s = this.node.x+this.node.width;
       
               var move = cc.moveTo(s/100,cc.v2(-(this.node.width),0));
               var sql = cc.sequence(move,cc.callFunc(function(){
                   var floor = this.m_BaseView.m_Floor.shift();
                   this.m_BaseView.m_Floor.push(floor);
                   this.changeFloor();
               },this,this.node));
               this.node.runAction(sql);
       
       },
       setBaseView:function(view)
       {
           this.m_BaseView = view;
       },
       myRandow:function(min,max)
       {
           var count = Math.random()*10000;
           count = count%((max-min)+min);
           return count;
       },
   
});
