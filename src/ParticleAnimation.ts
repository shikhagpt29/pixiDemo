/**
 * Created by shikha on 2022-04-09.
 */

import {MainProjectClass} from "./MainProjectClass";
import {Emitter} from "pixi-particles";
import {gsap} from "gsap";

export class ParticleAnimation extends PIXI.Container {
    private _fireParticlesEmitter: Emitter;
    private _fireContainer: PIXI.Container;
    private _elapsed: number = Date.now();
    private _isPlaying: boolean = false;
    /**
     * config to play fire
     */
    private readonly _fireConfig =
        {
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },

            "scale": {
                "start": 0.5,
                "end": 0.8,
                "minimumScaleMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": -15
            },
            "maxSpeed": 100,
            "noRotation": true,
            "startRotation": {
                "min": 90,
                "max": 0
            },
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 15,
                "max": 15
            },
            "frequency": 0.7,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 400,
            },
            "blendMode": "add",
            "addAtBack": true,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 400,
                "h": 400
            }
        };

    constructor() {
        super();
        this._elapsed = Date.now();
        this.initAnimations();
    }

    /**
     * function to start emitting particles
     */
    public playAnimation() {
        this._isPlaying = true;
        this._fireParticlesEmitter.init(MainProjectClass.assetLoader.resources["particles"]!.texture, this._fireConfig);
        this._fireParticlesEmitter.emit = true;
        gsap.ticker.add(() => this.update());
    }

    /**
     * fucniton to stop emitting particle
     */
    public stopAnimation() {
        this._isPlaying = false;
        this._fireParticlesEmitter.cleanup();
        this._fireParticlesEmitter.emit = false;
        gsap.ticker.remove(() => this.update());
    }

    protected initAnimations(): void {
        this._isPlaying = true;
        this._fireContainer = new PIXI.Container();
        const text: PIXI.Text = new PIXI.Text("Show PIXI Particals");
        this._fireContainer.interactive = true;
        this._fireContainer.buttonMode = true;
        this._fireContainer.name = "button";
        this._fireContainer.addChild(text);
        this._fireContainer.name = "fireContainer";
        this.addChild(this._fireContainer);
        this.createFireParticlesAnimationEmitter();
        this._fireContainer.position.set(950, 50);
        this._fireContainer.on('pointertap', () => {
                if (this._isPlaying) {
                    text.text = "Show PIXI Particals";
                    this.stopAnimation();
                } else {
                    text.text = "Hide PIXI Particals";
                    this.playAnimation();
                }
            }
        );
    }

    /**
     * function to create firefly animaiton from right
     */
    private createFireParticlesAnimationEmitter() {
        const ticker: PIXI.Ticker = PIXI.Ticker.shared;
        ticker.autoStart = false;
        ticker.stop();
        this._fireParticlesEmitter = new Emitter(this._fireContainer, MainProjectClass.assetLoader.resources["particles"]!.texture, this._fireConfig);

    }

    private update() {
        let now: number = Date.now();
        this._fireParticlesEmitter.update((now - this._elapsed) * 0.001);
        this._elapsed = now;
    }

}