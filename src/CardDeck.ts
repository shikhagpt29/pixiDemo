/**
 * Created by shikha on 2022-04-09.
 */
import {TimelineLite, TweenLite} from "gsap";
import {MainProjectClass} from "./MainProjectClass";

export class CardDeck extends PIXI.Container {
    private _animationContainer: PIXI.Container;
    private _cardsScreen: PIXI.Container;
    private _playCardButton: PIXI.Container;
    private _numberOfCards: number = 144;
    private _tl: TimelineLite;
    private _isPlaying: boolean = false;


    constructor() {
        super();
        console.log("CardDeck constructor");
        this.initGraphics();
        this.createCardScreen();
    }

    public hideCardContainer(): void {
        this.handleABort();
        if (this._cardsScreen) {
            this._cardsScreen.visible = false;
        }
    }

    private initGraphics(): void {
        this._animationContainer = new PIXI.Container();
        this._animationContainer.name = "animationContainer";
        this._playCardButton = new PIXI.Container();
        this._playCardButton.name = "playCardButton";
        this._playCardButton.interactive = true;
        this._playCardButton.buttonMode = true;
        const text: PIXI.Text = new PIXI.Text("Play Animation");
        this._playCardButton.addChild(text);
    }

    private reverseDeckClass(): void {
        this._isPlaying = true;
        this._tl = new TimelineLite();
        let count: number = 0;
        for (let i = this._numberOfCards - 1; i >= 0; i--) {
            count++;
            const sprite = this._animationContainer.children[i] as PIXI.Sprite;
            sprite.scale.set(0.2);
            sprite.position.set(0, i * 5);
            this._animationContainer.addChild(sprite);
            this._tl.add(new TweenLite(sprite, {
                duration: 2, x: 150, y: 5 * count, onComplete: () => {
                }
            }), count);
        }
    }

    private resetDecks(): void {
        for (let i = 0; i < this._animationContainer.children.length; i++) {
            const sprite = this._animationContainer.children[i] as PIXI.Sprite;
            sprite.scale.set(0.2);
            sprite.position.set(0, i * 5);
            // if (i === this._numberOfCards - 1) {
            //     this.reverseDeckClass();
            // }
        }
    }

    private createCardButtonsContainer(): void {
        this._playCardButton.on('pointertap', () => {
                if (this._isPlaying) {
                    (this._playCardButton.children[0] as PIXI.Text).text = "Play Animation";
                    this.handleABort();
                    this._animationContainer.visible = true;

                } else {
                    (this._playCardButton.children[0] as PIXI.Text).text = "Abort Animation";
                    this._animationContainer.visible = true;
                    // this.createDeckClass()
                    this.resetDecks();
                    this.reverseDeckClass();
                }
            }
        );
        this._playCardButton.position.set(100, 100);
        this._cardsScreen.addChild(this._playCardButton);

    }

    private createCardScreen(): void {
        this._cardsScreen = new PIXI.Container();
        const cardsButton: PIXI.Container = new PIXI.Container();
        const text: PIXI.Text = new PIXI.Text("Show Card Screen");
        cardsButton.interactive = true;
        cardsButton.buttonMode = true;
        cardsButton.name = "MainButton";
        this._cardsScreen.name = "cardsScreen";
        cardsButton.addChild(text);
        cardsButton.on('pointertap', () => {
                this._cardsScreen.visible = true;
                MainProjectClass.mixedText.hideMixContainer();
            }
        );
        cardsButton.position.set(50, 50);
        this.addChild(cardsButton);
        this.addChild(this._cardsScreen);
        this._cardsScreen.visible = false;
        this._cardsScreen.addChild(this._animationContainer);
        this.createNewDeckClass();
        this.createCardButtonsContainer();
        this._animationContainer.visible = false;
    }

    private createDeckClass(): void {
        this._animationContainer.visible = true;
        // if (this._animationContainer.children.length > 0) {
        this.resetDecks();
        this.reverseDeckClass();
        //} else {
        //     for (let i = 0; i < this._numberOfCards; i++) {
        //         const sprite = new PIXI.Sprite(MainProjectClass.assetLoader.resources["ace"]!.texture);
        //         sprite.scale.set(0.2);
        //         sprite.name = "sprite_" + i;
        //         sprite.position.set(0, i * 5);
        //         this._animationContainer.addChild(sprite);
        //         if (i === this._numberOfCards - 1) {
        //             this.reverseDeckClass();
        //         }
        //     }
        // }

    }

    private createNewDeckClass(): void {
        this._animationContainer.position.set(140, 140);
        for (let i = 0; i < this._numberOfCards; i++) {
            const sprite = new PIXI.Sprite(MainProjectClass.assetLoader.resources["ace"]!.texture);
            sprite.scale.set(0.2);
            sprite.name = "sprite_" + i;
            sprite.position.set(0, i * 5);
            this._animationContainer.addChild(sprite);
        }
    }

    private handleABort(): void {
        this._isPlaying = false;
        if (this._tl) {
            this._tl.progress(1);
            this._tl.clear();
        }
    }
}