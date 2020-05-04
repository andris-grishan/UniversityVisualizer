import { MainScene } from "./MainScene";

class Program {
  public static Main() {
    let mainScene = new MainScene("renderCanvas");
    mainScene.createScene();
    mainScene.doRender();
  }
}

window.onload = () => {
  Program.Main();
};
