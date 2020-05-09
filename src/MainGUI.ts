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
    let buttonFloor5 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor5", "Floor 5");
    buttonFloor5.width = "80px";
    buttonFloor5.height = "40px";
    buttonFloor5.left = "50px";
    buttonFloor5.top = "150px";
    buttonFloor5.color = "white";
    buttonFloor5.background = "green";
    buttonFloor5.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor5.onPointerClickObservable.add(() => {
      if (this._onFloorChanged) {
        this._onFloorChanged(5);
      }
    });

    let buttonFloor4 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor4", "Floor 4");
    buttonFloor4.width = "80px";
    buttonFloor4.height = "40px";
    buttonFloor4.left = "50px";
    buttonFloor4.top = "200px";
    buttonFloor4.color = "white";
    buttonFloor4.background = "green";
    buttonFloor4.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor4.onPointerClickObservable.add(() => {
      if (this._onFloorChanged) {
        this._onFloorChanged(4);
      }
    });

    let buttonFloor3 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor3", "Floor 3");
    buttonFloor3.width = "80px";
    buttonFloor3.height = "40px";
    buttonFloor3.left = "50px";
    buttonFloor3.top = "250px";
    buttonFloor3.color = "white";
    buttonFloor3.background = "green";
    buttonFloor3.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor3.onPointerClickObservable.add(() => {
      if (this._onFloorChanged) {
        this._onFloorChanged(3);
      }
    });

    let buttonFloor2 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor2", "Floor 2");
    buttonFloor2.width = "80px";
    buttonFloor2.height = "40px";
    buttonFloor2.left = "50px";
    buttonFloor2.top = "300px";
    buttonFloor2.color = "white";
    buttonFloor2.background = "green";
    buttonFloor2.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor2.onPointerClickObservable.add(() => {
      if (this._onFloorChanged) {
        this._onFloorChanged(2);
      }
    });

    let buttonFloor1 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor1", "Floor 1");
    buttonFloor1.width = "80px";
    buttonFloor1.height = "40px";
    buttonFloor1.left = "50px";
    buttonFloor1.top = "350px";
    buttonFloor1.color = "white";
    buttonFloor1.background = "green";
    buttonFloor1.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor1.onPointerClickObservable.add(() => {
      if (this._onFloorChanged) {
        this._onFloorChanged(1);
      }
    });

    this._advancedTexture.addControl(buttonFloor5);
    this._advancedTexture.addControl(buttonFloor4);
    this._advancedTexture.addControl(buttonFloor3);
    this._advancedTexture.addControl(buttonFloor2);
    this._advancedTexture.addControl(buttonFloor1);
  }
}
