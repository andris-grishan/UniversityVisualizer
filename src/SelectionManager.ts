import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class SelectionManager {
  private _scene: BABYLON.Scene;
  private _highlightLayer!: BABYLON.HighlightLayer;

  private _onSelectionChanged:
    | ((meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) => void)
    | undefined;

  set onSelectionChanged(
    selectionChanged: ((meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) => void) | undefined
  ) {
    this._onSelectionChanged = selectionChanged;
  }

  private _selectedMesh: BABYLON.Mesh | null;

  get selectedMesh(): BABYLON.Mesh | null {
    return this._selectedMesh;
  }

  private _pointerMoving = false;
  private _pointerDown = false;

  constructor(scene: BABYLON.Scene, highlightLayer: BABYLON.HighlightLayer) {
    this._scene = scene;
    this._highlightLayer = highlightLayer;

    this._selectedMesh = null;

    this._scene.onPointerMove = () => {
      this._pointerMoving = this._pointerDown;
    };

    this._scene.onPointerDown = () => {
      this._pointerDown = true;
    };

    this._scene.onPointerUp = (evt, pickResult) => {
      if (
        !this._pointerMoving &&
        pickResult &&
        pickResult.hit &&
        pickResult.pickedMesh &&
        this._onSelectionChanged &&
        pickResult.pickedMesh.name.startsWith("room_")
      ) {
        if (this._selectedMesh) {
          this._highlightLayer.removeMesh(this._selectedMesh);
        }

        this._selectedMesh = pickResult.pickedMesh as BABYLON.Mesh;
        this._highlightLayer.addMesh(this._selectedMesh, BABYLON.Color3.FromHexString("#00d3b7"));

        let meshName = pickResult.pickedMesh.name;
        if (meshName.indexOf(".") >= 0) {
          meshName = meshName.substr(0, meshName.indexOf("."));
        }

        this._onSelectionChanged({
          id: pickResult.pickedMesh.id,
          name: meshName,
          position: pickResult.pickedMesh.position,
        });
      }

      this._pointerDown = false;
    };
  }

  clearSelection() {
    if (this._selectedMesh) {
      this._highlightLayer.removeMesh(this._selectedMesh);
      this._selectedMesh = null;
      if (this._onSelectionChanged) {
        this._onSelectionChanged(null);
      }
    }
  }
}
