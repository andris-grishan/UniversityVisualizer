export class MainScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;

    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 25, new BABYLON.Vector3(0, 0, 4.5), this._scene);
        camera.attachControl(this._canvas, true);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        let cubeMaterial = new BABYLON.StandardMaterial("color", this._scene);
        cubeMaterial.alpha = 1;
        cubeMaterial.diffuseColor = BABYLON.Color3.FromHexString("#6a8dc4");

        // up boxes
        for (let i = -5; i < 5; i++) {
            let box = BABYLON.MeshBuilder.CreateBox(
                "box",
                {
                    height: 0.4, 
                    width: 2, 
                    depth: 2
                }, 
                this._scene
            );

            box.position.y = 0.4;
            box.position.x = 2.01 * i + 1;
            box.position.z = 2;
            box.material = cubeMaterial;
        }

        // lower boxes
        for (let i = -5; i < 5; i++) {
            let box = BABYLON.MeshBuilder.CreateBox("box", { height: 0.4, width: 2, depth: 2 }, this._scene);
            box.position.y = 0.4;
            box.position.x = 2.01 * i + 1;
            box.position.z = -2;
            box.material = cubeMaterial;
        }

        // Create a built-in "ground" shape.
        let ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: 22, height: 6, subdivisions: 2 }, this._scene);

        let groundMaterial = new BABYLON.StandardMaterial("color", this._scene);
        groundMaterial.alpha = 1;
        groundMaterial.diffuseColor = BABYLON.Color3.FromHexString("#86aae3");

        ground.material = groundMaterial;

        // SECOND STYLE

        let cubeMaterial2 = new BABYLON.StandardMaterial("color", this._scene);
        cubeMaterial2.alpha = 1;
        cubeMaterial2.diffuseColor = BABYLON.Color3.FromHexString("#7047a8");

        let secondBaseZ = 10;

        // up boxes
        for (let i = -5; i < 5; i++) {
            let boxLeft = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 0.2, depth: 2 }, this._scene);
            boxLeft.position.y = 0.2;
            boxLeft.position.x = -0.9 + (1.8 * i + 1);
            boxLeft.position.z = 0 + secondBaseZ + 2;
            boxLeft.material = cubeMaterial2;

            let boxRight = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 0.2, depth: 2 }, this._scene);
            boxRight.position.y = 0.2;
            boxRight.position.x = 0.9 + (1.8 * i + 1);
            boxRight.position.z = 0 + secondBaseZ + 2;
            boxRight.material = cubeMaterial2;

            let boxTop = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 2, depth: 0.2 }, this._scene);
            boxTop.position.y = 0.2;
            boxTop.position.x = 0 + (1.8 * i + 1);
            boxTop.position.z = 0.9 + secondBaseZ + 2;
            boxTop.material = cubeMaterial2;

            let boxBottom = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 2, depth: 0.2 }, this._scene);
            boxBottom.position.y = 0.2;
            boxBottom.position.x = 0 + (1.8 * i + 1);
            boxBottom.position.z = -0.9 + secondBaseZ + 2;
            boxBottom.material = cubeMaterial2;
        }

        // lower boxes
        for (let i = -5; i < 5; i++) {
            let boxLeft = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 0.2, depth: 2 }, this._scene);
            boxLeft.position.y = 0.2;
            boxLeft.position.x = -0.9 + (1.8 * i + 1);
            boxLeft.position.z = 0 + secondBaseZ - 2;
            boxLeft.material = cubeMaterial2;

            let boxRight = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 0.2, depth: 2 }, this._scene);
            boxRight.position.y = 0.2;
            boxRight.position.x = 0.9 + (1.8 * i + 1);
            boxRight.position.z = 0 + secondBaseZ - 2;
            boxRight.material = cubeMaterial2;

            let boxTop = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 2, depth: 0.2 }, this._scene);
            boxTop.position.y = 0.2;
            boxTop.position.x = 0 + (1.8 * i + 1);
            boxTop.position.z = 0.9 + secondBaseZ - 2;
            boxTop.material = cubeMaterial2;

            let boxBottom = BABYLON.MeshBuilder.CreateBox("box", { height: 0.2, width: 2, depth: 0.2 }, this._scene);
            boxBottom.position.y = 0.2;
            boxBottom.position.x = 0 + (1.8 * i + 1);
            boxBottom.position.z = -0.9 + secondBaseZ - 2;
            boxBottom.material = cubeMaterial2;
        }

        let ground2 = BABYLON.MeshBuilder.CreateGround('ground2', { width: 19, height: 6, subdivisions: 2 }, this._scene);
        ground2.position.z = secondBaseZ;

        let groundMaterial2 = new BABYLON.StandardMaterial("color", this._scene);
        groundMaterial2.alpha = 1;
        groundMaterial2.diffuseColor = BABYLON.Color3.FromHexString("#8f69c2");

        ground2.material = groundMaterial2;
    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
