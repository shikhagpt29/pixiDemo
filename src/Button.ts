export class Button extends PIXI.Container {
    constructor(name:string){
        super();
        this.interactive = true;
        this.buttonMode = true;
        this.name = name;
    }
}