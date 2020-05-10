import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class CameraManager {
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;

  constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) {
    this._scene = scene;
    this._camera = camera;
  }

  setTargetMesh(mesh: BABYLON.AbstractMesh) {
    BABYLON.Animation.CreateAndStartAnimation(
      "cameraMove",
      this._camera,
      "target",
      30,
      20,
      this._camera.target,
      mesh.position,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
  }
}
