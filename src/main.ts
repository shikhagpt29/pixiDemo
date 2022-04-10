/**
 * Created by shikha on 2022-04-09.
 */

import * as PIXI from "pixi.js";
declare global {
    interface Window {PIXI:any;}
}
window.PIXI = PIXI;


import {MainProjectClass} from "./MainProjectClass";
const app = new MainProjectClass();


