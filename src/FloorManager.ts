import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";
import { Vector3 } from "babylonjs";

export class FloorManager {
  private _scene: BABYLON.Scene;

  private _minimalFloor = 1;
  private _maximalFloor = 5;
  private _currentFloor = 1;

  private _onCurrentFloorChanged: (() => void) | undefined;

  private _meshesForAnimation: { mesh: BABYLON.AbstractMesh; positionY: number }[];

  set onCurrentFloorChanged(currentFloorChanged: (() => void) | undefined) {
    this._onCurrentFloorChanged = currentFloorChanged;
  }

  constructor(scene: BABYLON.Scene) {
    this._scene = scene;
    this._meshesForAnimation = [];
  }

  initPositions(meshes: BABYLON.AbstractMesh[]) {
    for (let i = 0; i < meshes.length; i++) {
      this._meshesForAnimation.push({ mesh: meshes[i], positionY: meshes[i].position.y });
    }
  }

  getFloorName(floorIndex?: number): string {
    if (!floorIndex) {
      floorIndex = this._currentFloor;
    }

    return `floor_${floorIndex}`;
  }

  showFloor(floorIndex: number) {
    let floorName = this.getFloorName(floorIndex);
    for (let i = 0; i < this._meshesForAnimation.length; i++) {
      if (this._meshesForAnimation[i].mesh.parent?.name == floorName && !this._meshesForAnimation[i].mesh.isVisible) {
        this._meshesForAnimation[i].mesh.isVisible = true;
        let initialPosition = this._meshesForAnimation[i].positionY;
        
        this.animateMesh(this._meshesForAnimation[i].mesh, -200, () => {
          this._meshesForAnimation[i].mesh.position.y = initialPosition;
        });
      }
    }
  }

  hideFloor(floorIndex: number) {
    let floorName = this.getFloorName(floorIndex);
    for (let i = 0; i < this._meshesForAnimation.length; i++) {
      if (this._meshesForAnimation[i].mesh.parent?.name == floorName && this._meshesForAnimation[i].mesh.isVisible) {
        let initialPosition = this._meshesForAnimation[i].positionY;

        this.animateMesh(this._meshesForAnimation[i].mesh, 200, () => {
          this._meshesForAnimation[i].mesh.isVisible = false;
          this._meshesForAnimation[i].mesh.position.y = initialPosition;
        });
      }
    }
  }

  animateMesh(mesh: BABYLON.AbstractMesh, positionChange: number, onAnimationEnd: (() => void) | undefined) {
    let tint = Math.random() * 10;
    let meshPosition = positionChange < 0 ? mesh.position.y - positionChange : mesh.position.y;
    BABYLON.Animation.CreateAndStartAnimation(
      "animateMesh",
      mesh,
      "position.y",
      30,
      10 + tint,
      meshPosition,
      meshPosition + positionChange,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
      undefined,
      onAnimationEnd
    );
  }

  showBuildings(floorIndex?: number) {
    if (!floorIndex) {
      floorIndex = this._currentFloor;
    }

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

  getParentMeshByFloor(floorIndex?: number): BABYLON.AbstractMesh | null {
    let floorName = this.getFloorName(floorIndex);
    for (let i = 0; i < this._meshesForAnimation.length; i++) {
      if (this._meshesForAnimation[i].mesh.name == floorName) {
        return this._meshesForAnimation[i].mesh;
      }
    }

    return null;
  }
}
