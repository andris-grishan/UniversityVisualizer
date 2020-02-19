import { Game } from "./Game";

class Program
{
    public static Main()
    {
        // Create the game using the 'renderCanvas'.
        let game = new Game('renderCanvas');

        // Create the scene.
        game.createScene();

        // Start render loop.
        game.doRender();
    }
}

window.onload = () =>
{
    Program.Main();
}