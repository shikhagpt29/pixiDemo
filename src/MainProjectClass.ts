/**
 * Created by shikha on 2020-06-24.
 */

import {Application} from "./Application";
import {CardDeck} from "./CardDeck";
import {MixedTextTool} from "./MixedTextTool";
import {ParticleAnimation} from "./ParticleAnimation";

export class MainProjectClass extends Application {
    public static cardDeck: CardDeck;
    public static mixedText: MixedTextTool;
    public static assetLoader: PIXI.Loader;
    public static particleCont: ParticleAnimation;

    constructor() {
        super();
    }

    protected init() {
        this.loader.add("star", "../media/example/star.png");
        this.loader.add("ace", "../media/example/ace.png");
        this.loader.add("price2", "../media/example/price2.png");
        this.loader.add("particles", "../media/example/particles.jpg");
        this.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onLoadComplete(loader, resources));
    }


    protected onLoadComplete(loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) {
        MainProjectClass.assetLoader = loader;
        MainProjectClass.cardDeck= new CardDeck();
        MainProjectClass.mixedText= new MixedTextTool();
        MainProjectClass.particleCont= new ParticleAnimation();
        this.stage.addChild(MainProjectClass.cardDeck);
        this.stage.addChild(MainProjectClass.mixedText);
        this.stage.addChild(MainProjectClass.particleCont);
    }
}