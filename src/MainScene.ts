import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class MainScene {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene!: BABYLON.Scene;
  private _camera!: BABYLON.Camera;
  private _light!: BABYLON.Light;
  private _actionManager!: BABYLON.ActionManager;

  private _minimalFloor = 1;
  private _maximalFloor = 5;
  private _currentFloor = 1;

  private _onMeshClicked: ((meshInfo: { id: string; name: string }) => void) | undefined;

  set onMeshClicked(meshClicked: ((meshInfo: { id: string; name: string }) => void) | undefined) {
    this._onMeshClicked = meshClicked;
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

    BABYLON.SceneLoader.LoadAssetContainer("/assets/", "parades.babylon", this._scene, (container) => {
      container.addAllToScene();
      this.addHighlights();
      this.showBuildings(this._currentFloor);
    });

    this.createGUI();

    this._scene.onPointerDown = (evt, pickResult) => {
      if (
        pickResult.hit &&
        pickResult.pickedMesh &&
        this._onMeshClicked &&
        pickResult.pickedMesh.name.startsWith("parades_")
      ) {
        this._onMeshClicked({ id: pickResult.pickedMesh.id, name: pickResult.pickedMesh.name });
      }
    };
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

      if (this._scene.meshes[i].isPickable && this._scene.meshes[i].name.startsWith("parades_")) {
        let mesh = this._scene.meshes[i];
        mesh.outlineColor = BABYLON.Color3.Teal();
        mesh.outlineWidth = 2;
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

  getFloorName(floorIndex: number): string {
    return `parades_floor_${floorIndex}`;
  }

  showFloor(floorIndex: number) {
    let floorName = this.getFloorName(floorIndex);
    for (let i = 0; i < this._scene.meshes.length; i++) {
      if (this._scene.meshes[i].parent?.name == floorName) {
        this._scene.meshes[i].isVisible = true;
      }
    }
  }

  hideFloor(floorIndex: number) {
    let floorName = this.getFloorName(floorIndex);
    for (let i = 0; i < this._scene.meshes.length; i++) {
      if (this._scene.meshes[i].parent?.name == floorName) {
        this._scene.meshes[i].isVisible = false;
      }
    }
  }

  showBuildings(floorIndex: number) {
    for (let i = this._minimalFloor; i <= this._maximalFloor; i++) {
      if (i <= floorIndex) {
        this.showFloor(i);
      } else {
        this.hideFloor(i);
      }
    }
  }

  createGUI() {
    let advancedTexture = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let buttonFloor5 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor5", "Floor 5");
    buttonFloor5.width = "80px";
    buttonFloor5.height = "40px";
    buttonFloor5.left = "50px";
    buttonFloor5.top = "150px";
    buttonFloor5.color = "white";
    buttonFloor5.background = "green";
    buttonFloor5.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor5.onPointerClickObservable.add(() => {
      this.showBuildings(5);
    });
    advancedTexture.addControl(buttonFloor5);

    let buttonFloor4 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor4", "Floor 4");
    buttonFloor4.width = "80px";
    buttonFloor4.height = "40px";
    buttonFloor4.left = "50px";
    buttonFloor4.top = "200px";
    buttonFloor4.color = "white";
    buttonFloor4.background = "green";
    buttonFloor4.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor4.onPointerClickObservable.add(() => {
      this.showBuildings(4);
    });
    advancedTexture.addControl(buttonFloor4);

    let buttonFloor3 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor3", "Floor 3");
    buttonFloor3.width = "80px";
    buttonFloor3.height = "40px";
    buttonFloor3.left = "50px";
    buttonFloor3.top = "250px";
    buttonFloor3.color = "white";
    buttonFloor3.background = "green";
    buttonFloor3.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor3.onPointerClickObservable.add(() => {
      this.showBuildings(3);
    });
    advancedTexture.addControl(buttonFloor3);

    let buttonFloor2 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor2", "Floor 2");
    buttonFloor2.width = "80px";
    buttonFloor2.height = "40px";
    buttonFloor2.left = "50px";
    buttonFloor2.top = "300px";
    buttonFloor2.color = "white";
    buttonFloor2.background = "green";
    buttonFloor2.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor2.onPointerClickObservable.add(() => {
      this.showBuildings(2);
    });
    advancedTexture.addControl(buttonFloor2);

    let buttonFloor1 = BABYLON_GUI.Button.CreateSimpleButton("buttonFloor1", "Floor 1");
    buttonFloor1.width = "80px";
    buttonFloor1.height = "40px";
    buttonFloor1.left = "50px";
    buttonFloor1.top = "350px";
    buttonFloor1.color = "white";
    buttonFloor1.background = "green";
    buttonFloor1.horizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    buttonFloor1.onPointerClickObservable.add(() => {
      this.showBuildings(1);
    });
    advancedTexture.addControl(buttonFloor1);
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
