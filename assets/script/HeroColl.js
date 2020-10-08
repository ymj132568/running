// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_HeroAnim:cc.Animation,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		 this.m_Parent = this.node.parent;
	},

    start () {

    },
	ctor()
	{
	    this.CTF_Count = 0;
	    this.m_Dir = HeroDir_Down;
		this.m_CollisionFlag = new Array();
		for (var i = 0; i < 20; i++) {
		    this.m_CollisionFlag[i] = 0;
		}
	},
	
	
	//碰撞开启
	onCollisionEnter(other) {
	    this.m_HeroAnim.node.color = cc.Color.RED;
		 this.m_CollisionFlag[other.tag]++;
	    if( other.tag == CollisionType_Floor)
	    {
	        this.m_Dir = HeroDir_None;
	        this.m_Parent.setPosition(0,-34);
	    }
	    if( other.tag == CollisionType_Death )
	    {
	        g_BaseView.GameOver();
	    }
	
	},
	//碰撞进行
	onCollisionStay(other) {
	    // console.log('on collision stay');
	},
	//碰撞结束
	onCollisionExit(other) {
	    this.m_CollisionFlag[other.tag]--;
	    if (this.m_CollisionFlag[CollisionType_Floor] == 0) {
	        this.m_HeroAnim.node.color = cc.Color.WHITE;
	        this.m_Dir = HeroDir_Down;
	    }
	},
	
	// called every frame, uncomment this function to activate update callback
	update(dt) {
	    // //cc.log(dt);
	    // //s=v*t;
	    // var s = 100*dt;
	    // this.m_Parent.y += s*this.m_Dir;
	},
});
