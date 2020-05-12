import * as BABYLON from "babylonjs";
import axios from "axios";
import { MainScene } from "./MainScene";

class Program {
  private static _mainScene: MainScene;

  public static selectionChanged(meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) {
    if (meshInfo) {
      let roomTitle = document.getElementById("roomTitle");
      let roomContent = document.getElementById("roomContent");
      let roomPhotos = document.getElementById("thumbnails");

      axios.get('https://du.baranovskis.dev/api/get/room/' + meshInfo.name)
        .then(function (response) {
          if (roomTitle != null) {
            roomTitle.innerText = response.data.response.title;

            if (roomTitle.innerText == "") {
              roomTitle.innerText = meshInfo.name;
            }
          }

          if (roomContent != null) {
            roomContent.innerHTML = response.data.response.content;

            if (roomContent.innerHTML == "") {
              roomContent.innerHTML =  "NO DATA!";
            }
          }

          if (roomPhotos != null) {
            roomPhotos.innerHTML = "";

            for (var i = 0; i < response.data.response.images.length; i++) {
              let url = response.data.response.images[i];
              //onsole.log(url);

              roomPhotos.innerHTML += `
                <article>
                  <a class="thumbnail" href="#"><img src="${url}" alt="" /></a>
                </article>
              `;
            }
         }
        })
        .catch(function (error) {
          if (roomTitle != null) {
            roomTitle.innerText = "Error";
          }

          if (roomContent != null) {
            roomContent.innerText = error;
          }

          if (roomPhotos != null) {
            roomPhotos.innerHTML = "";
          }
        });

      console.log('Mesh name: ' + meshInfo.name);
      Program.openNav();
    } else {
      Program.closeNav();
    }
  }

  public static Main() {
    this._mainScene = new MainScene("renderCanvas");
    this._mainScene.createScene();
    this._mainScene.doRender();

    this._mainScene.onSelectionChanged = this.selectionChanged;
  }
  
  public static openNav() {
    let body = document.body as HTMLElement;
    let toggle = document.getElementById("toggle") as HTMLElement;
    
    if (body == null) {
      alert(`body is null!`);
      return;
    }

    if (toggle == null) {
      alert(`toggle is null!`);
      return;
    }

    if (!body.classList.contains("fullscreen")) {
      return;
    }
  
    toggle.style.display = "block";
    body.classList.remove("fullscreen");
    this._mainScene.doResize();
  }

  public static closeNav() {
    let body = document.body as HTMLElement;
    let toggle = document.getElementById("toggle") as HTMLElement;

    if (body == null) {
      alert(`body is null!`);
      return;
    } 
    
    if (toggle == null) {
      alert(`toggle is null!`);
      return;
    }

    if (body.classList.contains("fullscreen")) {
      return;
    }
  
    toggle.style.display = "none";
    body.classList.add("fullscreen");
    this._mainScene.doResize();
  } 

}

window.onload = () => {
  Program.Main();

  // handle close button click
  let close = document.getElementById("toggle");

  if (close != null) {
    close.addEventListener("click", (e:Event) => Program.closeNav());
  }
};
