import * as BABYLON from "babylonjs";

export class MainScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene!: BABYLON.Scene;
  private _camera!: BABYLON.Camera;
  private _light!: BABYLON.Light;

  constructor(canvasElement: string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      25,
      new BABYLON.Vector3(0, 0, 4.5),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);
    this._camera.maxZ = 10000;

    this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);

    // Skybox
    let skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, this._scene);
    skybox.infiniteDistance = true;

    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this._scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", this._scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    BABYLON.SceneLoader.LoadAssetContainer("/models/", "curve_test.babylon", this._scene, function (container) {
        console.log(container);
        container.addAllToScene();
    });
  }

  doRender(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}
