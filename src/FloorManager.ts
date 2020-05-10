import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";

export class FloorManager {
  private _scene: BABYLON.Scene;

  private _minimalFloor = 1;
  private _maximalFloor = 5;
  private _currentFloor = 1;

  private _onCurrentFloorChanged: (() => void) | undefined;

  set onCurrentFloorChanged(currentFloorChanged: (() => void) | undefined) {
    this._onCurrentFloorChanged = currentFloorChanged;
  }

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;
  }

  init() {
    this.showBuildings(this._currentFloor);
  }

  getFloorName(floorIndex: number): string {
    return `floor_${floorIndex}`;
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
    if (this._currentFloor !== floorIndex) {
      this._currentFloor = floorIndex;
      if (this._onCurrentFloorChanged) {
        this._onCurrentFloorChanged();
      }
    }

    for (let i = this._minimalFloor; i <= this._maximalFloor; i++) {
      if (i <= floorIndex) {
        this.showFloor(i);
      } else {
        this.hideFloor(i);
      }
    }
  }
}
