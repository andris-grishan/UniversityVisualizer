import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class CameraManager {
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;

  constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) {
    this._scene = scene;
    this._camera = camera;
  }
}