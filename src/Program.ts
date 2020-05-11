import * as BABYLON from "babylonjs";
import axios from "axios";
import { MainScene } from "./MainScene";

class Program {
  public static selectionChanged(meshInfo: { id: string; name: string; position: BABYLON.Vector3 } | null) {
    if (meshInfo) {
      // handle close button click
      let roomTitle = document.getElementById("roomTitle");
      let roomContent = document.getElementById("roomContent");
      let roomCover = document.getElementById("roomCover") as HTMLImageElement;

      axios.get('https://du.baranovskis.dev/api/get/cabinet/' + meshInfo.name)
        .then(function (response) {
          if (roomTitle != null) {
            roomTitle.innerText = response.data.list.title;
          }

          if (roomContent != null) {
            roomContent.innerText = response.data.list.content;
          }

          if (roomCover != null) {
            roomCover.src = response.data.list.images[0];
          }

          openNav();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      console.log('Mesh name: ' + meshInfo.name);
      openNav();
    } else {
      closeNav();
      //alert(`selection cleared`);
    }
  }

  public static Main() {
    let mainScene = new MainScene("renderCanvas");
    mainScene.createScene();
    mainScene.doRender();

    mainScene.onSelectionChanged = this.selectionChanged;
  }
}

function openNav() {
  let nav = document.getElementById("mySidenav");

  if (nav == null) {
    alert(`nav is null!`);
    return;
  }
 
  nav.style.display = "block";
}

function closeNav() {
  let nav = document.getElementById('mySidenav');

  if (nav == null) {
    alert(`nav is null!`);
    return;
  }

  nav.style.display = "none";
} 

window.onload = () => {
  Program.Main();

  // handle close button click
  let close = document.getElementById("closeBtn");

  if (close != null) {
    close.addEventListener("click", (e:Event) => closeNav());
  }
};
