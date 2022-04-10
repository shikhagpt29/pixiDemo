/**
 * Created by shikha on 2022-04-09.
 */

import {Application} from "./Application";
import {CardDeck} from "./CardDeck";
import {MixedTextTool} from "./MixedTextTool";
import {ParticleAnimation} from "./ParticleAnimation";
import {gsap, TweenMax} from "gsap";

export class MainProjectClass extends Application {
    public static cardDeck: CardDeck;
    public static mixedText: MixedTextTool;
    public static assetLoader: PIXI.Loader;
    public static particleCont: ParticleAnimation;
    private fpsText: PIXI.Text;

    constructor() {
        super();
    }

    protected init(): void {
        this.loader.add("star", "../media/example/star.png");
        this.loader.add("ace", "../media/example/ace.png");
        this.loader.add("price2", "../media/example/price2.png");
        this.loader.add("particles", "../media/example/particles.jpg");
        this.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onLoadComplete(loader, resources));
    }


    protected onLoadComplete(loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {
        MainProjectClass.assetLoader = loader;
        MainProjectClass.cardDeck = new CardDeck();
        MainProjectClass.mixedText = new MixedTextTool();
        MainProjectClass.particleCont = new ParticleAnimation();
        this.fpsText = new PIXI.Text("frame");
        this.fpsText.position.set(20, 0);
        this.stage.addChild(this.fpsText);
        this.stage.addChild(MainProjectClass.cardDeck);
        this.stage.addChild(MainProjectClass.mixedText);
        this.stage.addChild(MainProjectClass.particleCont);
        gsap.ticker.fps(30);
        gsap.ticker.add((time, deltaTime, frame) => {
            this.callBackTicker(time, deltaTime, frame)
        });
    }

    private callBackTicker(time: number, deltaTime: number, frame: number): void {
        this.fpsText.text = "fps: " + gsap.ticker.deltaRatio() * 1000 / deltaTime;
    }
}