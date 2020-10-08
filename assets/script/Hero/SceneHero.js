// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_HeroAnim:cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
	play(playName){
		if( playName == 'Run')
		{
		    g_UserInfoData.m_CurHAS_State = HAS_Run;
		}
		else  if( playName == 'Jump')
		{
		    g_UserInfoData.m_CurHAS_State = HAS_Jump1;
		}
		else  if( playName == 'button')
		{
		    g_UserInfoData.m_CurHAS_State = HAS_button;
		}
		var name=playName+g_UserInfoData.m_CurSelHeroID
		this.m_HeroAnim.play(name)
	},
	getCurrentClipName(){
		return this.m_HeroAnim.currentClip.name;
	},
	
    // update (dt) {},
});
