import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class SelectionManager {
  private _scene: BABYLON.Scene;

  private _onSelectionChanged:
    | ((meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) => void)
    | undefined;

  set onSelectionChanged(
    selectionChanged: ((meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) => void) | undefined
  ) {
    this._onSelectionChanged = selectionChanged;
  }

  private _selectedMesh: BABYLON.AbstractMesh | null;

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;

    this._selectedMesh = null;

    this._scene.onPointerDown = (evt, pickResult) => {
      if (
        pickResult.hit &&
        pickResult.pickedMesh &&
        this._onSelectionChanged &&
        pickResult.pickedMesh.name.startsWith("room_")
      ) {
        this._selectedMesh = pickResult.pickedMesh;
        this._onSelectionChanged({
          id: pickResult.pickedMesh.id,
          name: pickResult.pickedMesh.name,
          position: pickResult.pickedMesh.position,
        });
      }
    };
  }

  clearSelection() {
    if (this._selectedMesh) {
      this._selectedMesh = null;
      if (this._onSelectionChanged) {
        this._onSelectionChanged(null);
      }
    }
  }
}
