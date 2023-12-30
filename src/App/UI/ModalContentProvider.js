export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
          title: 'About me',
          description: 'Hi! My name is Rhett Harrison. I am a software engineer currently at Axiallon Software. I am a talented full-stack engineer who has recently taken up 3D Web Development as a hobby. I am skilled in Angular2+, SpringBoot, and many flavors of SQL.',
        },
      }
    }
  
    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
  