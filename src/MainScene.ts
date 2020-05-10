import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";
import { FloorManager } from "./FloorManager";
import { MainGUI } from "./MainGUI";
import { SelectionManager } from "./SelectionManager";
import { CameraManager } from "./CameraManager";

export class MainScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene!: BABYLON.Scene;
  private _camera!: BABYLON.ArcRotateCamera;
  private _light!: BABYLON.Light;
  private _actionManager!: BABYLON.ActionManager;

  private _mainGUI!: MainGUI;
  private _floorManager!: FloorManager;
  private _selectionManager!: SelectionManager;
  private _cameraManager!:CameraManager;

  set onSelectionChanged(
    selectionChanged: ((meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) => void) | undefined
  ) {
    this._selectionManager.onSelectionChanged = selectionChanged;
  }

  constructor(canvasElement: string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._scene.pointerMovePredicate = function (mesh) {
      return mesh.isPickable && mesh.isVisible && mesh.isReady() && mesh.isEnabled();
    };

    this._camera = new BABYLON.ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      500,
      new BABYLON.Vector3(0, 0, 4.5),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);
    this._camera.maxZ = 100000;

    this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);

    // Skybox
    let skybox = BABYLON.Mesh.CreateBox("skyBox", 100000, this._scene);
    skybox.infiniteDistance = true;
    skybox.isPickable = false;

    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this._scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", this._scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    this._selectionManager = new SelectionManager(this._scene);
    this._mainGUI = new MainGUI(this._scene);
    this._floorManager = new FloorManager(this._scene);
    this._cameraManager = new CameraManager(this._scene, this._camera);

    this._mainGUI.createGUI();

    this._floorManager.onCurrentFloorChanged = () => {
      this._selectionManager.clearSelection();
    };

    this._mainGUI.onFloorChanged = (floorIndex) => {
      this._floorManager.showBuildings(floorIndex);
    };

    BABYLON.SceneLoader.LoadAssetContainer("/assets/", "parades.babylon", this._scene, (container) => {
      container.addAllToScene();
      this.addHighlights();
      this._floorManager.init();
    });
  }

  makeFlatShaded(mesh: BABYLON.Mesh, color: BABYLON.Color3) {
    let colors = mesh.getVerticesData(BABYLON.VertexBuffer.ColorKind);
    if (!colors) {
      colors = [];
      let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
      if (positions) {
        for (let p = 0; p < positions.length / 3; p++) {
          let tint = Math.random() * 0.05;
          for (let i = 0; i < 3; i++) {
            colors.push(color.r + tint, color.g + tint, color.b + tint, 1);
          }
        }
      }
    }

    mesh.material = null;
    mesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
    mesh.useVertexColors = true;
  }

  addHighlights() {
    for (let i = 0; i < this._scene.meshes.length; i++) {
      if (this._scene.meshes[i].name == "ground") {
        let mesh = this._scene.meshes[i] as BABYLON.Mesh;
        if (mesh) {
          this.makeFlatShaded(mesh, BABYLON.Color3.FromHexString("#196b2f"));
        }
      }

      if (this._scene.meshes[i].isPickable && this._scene.meshes[i].name.startsWith("room_")) {
        let mesh = this._scene.meshes[i];
        mesh.outlineColor = BABYLON.Color3.Teal();
        mesh.outlineWidth = 1;
        mesh.actionManager = new BABYLON.ActionManager(this._scene);

        //ON MOUSE ENTER
        mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (ev) {
            mesh.renderOutline = true;
          })
        );

        //ON MOUSE EXIT
        mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (ev) {
            mesh.renderOutline = false;
          })
        );
      }
    }
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
