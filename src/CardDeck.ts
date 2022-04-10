/**
 * Created by shikha on 2020-06-24.
 */
import {TimelineLite, TweenLite} from "gsap";
import {MainProjectClass} from "./MainProjectClass";

export class CardDeck extends PIXI.Container {
    private _cardsContainer: PIXI.Container;
    private _cardsScreen: PIXI.Container;
    private _numberOfCards: number = 144;
    private _tl: TimelineLite;
    private _isPlaying:boolean =false;
    constructor() {
        super();
        console.log("CardDeck constructor");
        this.createCardScreen();
    }

    public hideCardContainer(): void {
        if (this._cardsScreen) {
            this._cardsScreen.visible = false;
        }
        if (this._cardsContainer) {
            this._cardsContainer.visible = false;
        }
    }

    private reverseDeckClass(): void {
        this._isPlaying= true;
        this._tl = new TimelineLite();
        let count: number = 0;
        for (let i = this._numberOfCards - 1; i >= 0; i--) {
            count++;
            const sprite = this._cardsContainer.children[i] as PIXI.Sprite;
            sprite.scale.set(0.2);
            sprite.position.set(0, i * 5);
            this._cardsContainer.addChild(sprite);
            this._tl.add(new TweenLite(sprite, {
                duration: 2, x: 300, y: 5 * count, onComplete: () => {
                }
            }), count);
        }
    }

    private resetDecks(): void {
        for (let i = 0; i < this._cardsContainer.children.length; i++) {
            const sprite = this._cardsContainer.children[i] as PIXI.Sprite;
            sprite.scale.set(0.2);
            sprite.position.set(0, i * 5);
            if (i === this._numberOfCards - 1) {
                this.reverseDeckClass();
            }
        }
    }

    private createCardButtonsContainer(): void {
        this._cardsContainer = new PIXI.Container();
        const cardsButton: PIXI.Container = new PIXI.Container();
        const text: PIXI.Text = new PIXI.Text("Play Card Animation");
        cardsButton.interactive = true;
        cardsButton.buttonMode = true;
        cardsButton.name = "button";
        cardsButton.addChild(text);
        cardsButton.on('pointertap', () =>{
            if(this._isPlaying){
                text.text = "Play Card Animation";
                this.handleABort()

            }else {
                text.text = "Abort Card Animation";
                this.createDeckClass()
            }
        }
        );
        cardsButton.position.set(100, 100);
        this._cardsScreen.addChild(cardsButton);
    }

    private createCardScreen(): void {
        this._cardsScreen = new PIXI.Container();
        const cardsButton: PIXI.Container = new PIXI.Container();
        const text: PIXI.Text = new PIXI.Text("Show Card Screen");
        cardsButton.interactive = true;
        cardsButton.buttonMode = true;
        cardsButton.name = "button";
        cardsButton.addChild(text);
        cardsButton.on('pointertap', () => {
                this.createCardButtonsContainer();
                this._cardsScreen.visible = true;
                MainProjectClass.mixedText.hideMixContainer();
            }
        );
        cardsButton.position.set(50, 50);
        this.addChild(cardsButton);
        this.addChild(this._cardsScreen);
    }

    private createDeckClass(): void {
        this._cardsContainer.position.set(200, 200);
        if (this._cardsContainer.children.length > 0) {
            this.resetDecks();
        } else {
            for (let i = 0; i < this._numberOfCards; i++) {
                const sprite = new PIXI.Sprite(MainProjectClass.assetLoader.resources["ace"]!.texture);
                sprite.scale.set(0.2);
                sprite.name = "sprite_" + i;
                sprite.position.set(0, i * 5);
                this._cardsContainer.addChild(sprite);
                if (i === this._numberOfCards - 1) {
                    this.reverseDeckClass();
                }
            }
        }
        this.addChild(this._cardsContainer);
    }

    private handleABort(): void {
        this._isPlaying= false;
        if (this._tl) {
            this._tl.progress(1);
        }
    }
}