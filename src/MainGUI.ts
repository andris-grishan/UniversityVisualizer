import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class MainGUI {
  private _scene: BABYLON.Scene;
  private _advancedTexture: BABYLON_GUI.AdvancedDynamicTexture;

  private _onFloorChanged: ((floorIndex: number) => void) | undefined;

  set onFloorChanged(floorChanged: ((floorIndex: number) => void) | undefined) {
    this._onFloorChanged = floorChanged;
  }

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;
    this._advancedTexture = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  }
  createGUI() {
    let floor1 = document.getElementById("floor1");

    if (floor1 != null) {
      floor1.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this._onFloorChanged(1);
        }
      });
    }

    let floor2 = document.getElementById("floor2");

    if (floor2 != null) {
      floor2.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this._onFloorChanged(2);
        }
      });
    }

    let floor3 = document.getElementById("floor3");

    if (floor3 != null) {
      floor3.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this._onFloorChanged(3);
        }
      });
    }

    let floor4 = document.getElementById("floor4");

    if (floor4 != null) {
      floor4.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this._onFloorChanged(4);
        }
      });
    }

    let floor5 = document.getElementById("floor5");

    if (floor5 != null) {
      floor5.addEventListener("click", (e:Event) => {
        if (this._onFloorChanged) {
          this._onFloorChanged(5);
        }
      });
    }
  }
}
