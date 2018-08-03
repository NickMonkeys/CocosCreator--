/**
 * Author： NickLi
 * Create Date：
 *
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class MyGraphics extends cc.Component {

    @property(cc.Graphics)
    private eGraphics: cc.Graphics = null;
    @property(cc.Prefab)
    private ePar: cc.Prefab = null;

    private mStartPoint = null;
    private mPra: cc.Node = null;
    protected onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            let point = event.getLocation();
            this.mStartPoint = point;
            this.mPra = cc.instantiate(this.ePar);
            this.mPra.parent = this.node;
            this.mPra.position = point;
            this.mPra.active = true;
        });
        
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            this.click();
            let point = event.getLocation();
            this.eGraphics.moveTo(this.mStartPoint.x, this.mStartPoint.y);
            this.eGraphics.lineTo(point.x, point.y);
            this.eGraphics.stroke();
            this.mStartPoint = point;
            this.mPra.position = point;
        });
        
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.mPra.getComponent(cc.ParticleSystem).stopSystem();
        });
        this.ePar.active = false;
    }

    public click() {
        this.eGraphics.strokeColor = new cc.Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random());
    }
    public close() {
        this.eGraphics.close();
    }
    public clear() {
        this.eGraphics.clear();
    }

}
