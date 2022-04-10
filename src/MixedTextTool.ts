/**
 * Created by shikha on 2020-06-24.
 */

import {TimelineLite} from "gsap";
import {MainProjectClass} from "./MainProjectClass";

export class MixedTextTool extends PIXI.Container {

    private _mixedScreen: PIXI.Container;
    private _mixedContainer: PIXI.Container;


    private _randomPattern: string[];

    constructor() {
        super();
        this.createMixedTextScreen();
    }

    private createMixedTextScreen() {
        this._mixedScreen = new PIXI.Container();
        const text: PIXI.Text = new PIXI.Text("Show Mixed Screen");
        this._mixedScreen.interactive = true;
        this._mixedScreen.buttonMode = true;
        this._mixedScreen.name = "button";
        this._mixedScreen.addChild(text);
        this._mixedScreen.on('pointertap', () => {
                this.creatToolToMixUp();
                MainProjectClass.cardDeck.hideCardContainer();
            }
        );
        this._mixedScreen.position.set(550, 50);
        this.addChild(this._mixedScreen);
    }

    private creatToolToMixUp() {
        this._mixedContainer = new PIXI.Container();
        this._randomPattern = ["text", "sprite"];
        this.generateRandomText();
        this._mixedContainer.position.set(100, 100);
        this.addChild(this._mixedContainer);
    }

    private generateRandomText() {
        const tl: TimelineLite = new TimelineLite({
            onComplete: () => {
                this.generateRandomText();
            }
        });
        tl.add(() => {
            this.arrangeShuffledText(this.shuffle(this._randomPattern));
        }, 2);
    }

    private shuffle(array: string[]): PIXI.DisplayObject[] {
        this._mixedContainer.children.length = 0;
        let currentIndex: number = array.length, randomIndex: number;
        let mixArr: PIXI.DisplayObject[] = [];
        for (let index: number = 0; index < 3; index++) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            if (array[randomIndex] == "text") {
                const text: PIXI.Text = new PIXI.Text("some text");
                mixArr[index] = text;
            } else if (array[randomIndex] == "sprite") {
                const sprite: PIXI.Sprite = new PIXI.Sprite(MainProjectClass.assetLoader.resources["price2"]!.texture);
                mixArr[index] = sprite;
            }
            this._mixedContainer.addChild(mixArr[index]);
        }
        return mixArr;
    }

    private arrangeShuffledText(array: PIXI.DisplayObject[]): void {
        const offsetX: number = 10;
        for (let items: number = 0; items < array.length; items++) {
            if (items > 0) {
                array[items].x = offsetX + array[items - 1].x + array[items - 1].getBounds().width;
            } else {
                array[items].x = 0;
            }
        }
        this._mixedContainer.addChild(...array);
        this._mixedContainer.name = "mixed";
    }
    public hideMixContainer(){
        if(this._mixedContainer){
            this._mixedContainer.visible =false;
        }

    }
}