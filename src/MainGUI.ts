import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class MainGUI {
  private _scene: BABYLON.Scene;

  private _floor1! : HTMLElement;
  private _floor2! : HTMLElement;
  private _floor3! : HTMLElement;
  private _floor4! : HTMLElement;
  private _floor5! : HTMLElement;

  private _onFloorChanged: ((floorIndex: number) => void) | undefined;

  set onFloorChanged(floorChanged: ((floorIndex: number) => void) | undefined) {
    this._onFloorChanged = floorChanged;
  }

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;

    this._floor1 = document.getElementById("floor1") as HTMLElement;
    this._floor2 = document.getElementById("floor2") as HTMLElement;
    this._floor3 = document.getElementById("floor3") as HTMLElement;
    this._floor4 = document.getElementById("floor4") as HTMLElement;
    this._floor5 = document.getElementById("floor5") as HTMLElement;
  }

  clearSelected(){
      this._floor1.classList.remove("selected");
      this._floor2.classList.remove("selected");
      this._floor3.classList.remove("selected");
      this._floor4.classList.remove("selected");
      this._floor5.classList.remove("selected");
    }

  setSelected(element: HTMLElement){
    this.clearSelected();
    if (!element.classList.contains("selected")){
      element.classList.add("selected");
    }
  }

  createGUI() {

    if (this._floor1 != null) {
      this._floor1.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this.setSelected(this._floor1);
          this._onFloorChanged(1);
        }
      });
    }

    if (this._floor2 != null) {
      this._floor2.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this.setSelected(this._floor2);
          this._onFloorChanged(2);
        }
      });
    }

    if (this._floor3 != null) {
      this._floor3.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this.setSelected(this._floor3);
          this._onFloorChanged(3);
        }
      });
    }

    if (this._floor4 != null) {
      this._floor4.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this.setSelected(this._floor4);
          this._onFloorChanged(4);
        }
      });
    }

    if (this._floor5 != null) {
      this._floor5.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this.setSelected(this._floor5);
          this._onFloorChanged(5);
        }
      });
    }
  }
}
