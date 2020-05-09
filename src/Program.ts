import * as BABYLON from "babylonjs";
import { MainScene } from "./MainScene";

class Program {
  public static selectionChanged(meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) {
    if (meshInfo) {
      alert(`mesh clicked! ${meshInfo.name}`);
    } else {
      alert(`selection cleared`);
    }
  }

  public static Main() {
    let mainScene = new MainScene("renderCanvas");
    mainScene.createScene();
    mainScene.doRender();

    mainScene.onSelectionChanged = this.selectionChanged;
  }
}

window.onload = () => {
  Program.Main();
};
