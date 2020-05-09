import { MainScene } from "./MainScene";

class Program {
  public static meshClicked(meshInfo: { id: string; name: string }) {
    alert(`mesh clicked! ${meshInfo.name}`);
  }

  public static Main() {
    let mainScene = new MainScene("renderCanvas");
    mainScene.createScene();
    mainScene.doRender();

    mainScene.onMeshClicked = this.meshClicked;
  }
}

window.onload = () => {
  Program.Main();
};
