import * as THREE from "three";

import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Portal from "./Portal.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;

    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    this.modalContentProvider = new ModalContentProvider();

    this.loadEnvironment();
    this.addLights();
    this.addPortals();
  }

  loadEnvironment() {
    // load environment here
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    environmentScene.position.set(0, 0, -18.70);
    environmentScene.rotation.set(0, 0, 0);
    environmentScene.scale.setScalar(0.5);

    const physicalObjects = ['Tree', 'terrain', 'Step', 'Gate', 'Floor', 'Bush', 'portal'];

    const shadowCasters = [
      'Tree',
      'terrain',
      'Step',
      'Gate',
      'Bush'
    ]

    const shadowReceivers = [
      'Floor',
      'terrain'
    ]
    console.log(environmentScene.children);

    for (const child of environmentScene.children) {
      const isPhysicalObject = physicalObjects.some((keyword) => child.name.includes(keyword))
      if (isPhysicalObject) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            this.physics.add(obj, "fixed", "cuboid")
          }
        })
      }

      const isShadowCaster = shadowCasters.some((keyword) => child.name.includes(keyword))
      if (isShadowCaster) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true
          }
        })
      }

      const isShadowReceiver = shadowReceivers.some((keyword) => child.name.includes(keyword))
      if (isShadowReceiver) {
        child.traverse((obj) => {
          if (obj.isMesh) {
            obj.receiveShadow = true
          }
        })
      }
    }
  }


  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0.3, 3.2, 5.4);
    this.directionalLight.shadow.camera.top = 0
    this.directionalLight.shadow.camera.right = 0
    this.directionalLight.shadow.camera.left = -0
    this.directionalLight.shadow.camera.bottom = -0
    this.directionalLight.shadow.bias = -0.002
    this.directionalLight.shadow.normalBias = 0.072
    this.scene.add(this.directionalLight);
  }

  addPortals() {
    const portalMesh1 = this.environment.scene.getObjectByName("portal");
    this.portal1 = new Portal(portalMesh1, this.modalContentProvider.getModalInfo("aboutMe"));
  }

  loop() {
    this.portal1.loop();
  }
}
