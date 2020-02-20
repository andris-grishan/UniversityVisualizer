import { MainScene } from "./MainScene";

class Program
{
    public static Main()
    {
        // Create the game using the 'renderCanvas'.
        let mainScene = new MainScene('renderCanvas');

        // Create the scene.
        mainScene.createScene();

        // Start render loop.
        mainScene.doRender();
    }
}

window.onload = () =>
{
    Program.Main();
}