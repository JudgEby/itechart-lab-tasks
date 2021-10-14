const main = document.querySelector("#main");
const errorButton = document.querySelector("#error");
const warningButton = document.querySelector("#warning");
const successButton = document.querySelector("#success");
const infoButton = document.querySelector("#info");
const modalButton = document.querySelector("#modal");

class PopUp {
  constructor(container = document.querySelector("body")) {
    this.container = container;
  }
  _createNewElement(tagName, id) {
    let newElement = document.createElement(tagName);
    if (id) {
      newElement.id = id;
    }

    newElement.className = [...arguments].join(" ");
    return newElement;
  }
}

class ToastNotifications extends PopUp {
  constructor(container, popUpType = "info") {
    super(container);
    this.popUpType = popUpType;
  }

  _buildPopUp(popUpType, popUpMessage = "Something went wrong") {
    let validPopUpType = popUpType;
    if (
      popUpType !== "error" &&
      popUpType !== "warning" &&
      popUpType !== "success"
    ) {
      validPopUpType = "info";
    }

    const popupWrapper = this._createNewElement(
      "div",
      undefined,
      "popup-wrapper",
      validPopUpType
    );

    const icon = this._createNewElement(
      "div",
      undefined,
      "icon",
      validPopUpType
    );
    popupWrapper.appendChild(icon);

    const popup = this._createNewElement("span");
    popup.innerText = popUpMessage;
    popupWrapper.appendChild(popup);

    const closeButton = this._createNewElement("div", undefined, "cl-btn");
    closeButton.addEventListener("click", function () {
      popupWrapper.remove();
    });
    popupWrapper.appendChild(closeButton);

    return popupWrapper;
  }

  _runTimer(popUpNode, timeToShow) {
    const timeout = setTimeout(function () {
      popUpNode.remove();
      clearTimeout(timeout);
    }, timeToShow);
  }

  show(message, timeToShow = 5000) {
    const popupWrapper = this._buildPopUp(this.popUpType, message);

    let popupBlock = document.getElementById("popup-block");

    if (popupBlock) {
      popupBlock.appendChild(popupWrapper);
    } else {
      popupBlock = this._createNewElement("div", "popup-block", "popup-block");
      popupBlock.id = "popup-block";
      popupBlock.className = "popup-block";
      popupBlock.appendChild(popupWrapper);
      this.container.appendChild(popupBlock);
    }

    this._runTimer(popupWrapper, timeToShow);
  }
}

class ModalWindow extends PopUp {
  constructor(container) {
    super(container);
    this.content = null;
  }
  show(content) {
    this.content =
      content ||
      (function () {
        const defaultContent = document.createElement("div");
        defaultContent.innerText = "Modal";
        return defaultContent;
      })();

    const modalContainer = this._createNewElement(
      "div",
      undefined,
      "modal-container"
    );
    const modalBackground = this._createNewElement(
      "div",
      undefined,
      "modal-background"
    );
    modalBackground.addEventListener("click", () => {
      modalContainer.remove();
    });
    const modalMain = this._createNewElement("div", undefined, "modal-main");

    modalMain.appendChild(this.content);
    modalContainer.appendChild(modalMain);
    modalContainer.appendChild(modalBackground);
    this.container.appendChild(modalContainer);
  }
}

//добавляем события на кнопки
modalButton.addEventListener("click", () => {
  const modal = new ModalWindow(main);
  modal.show();
});

errorButton.addEventListener("click", () => {
  const popup = new ToastNotifications(main, "error");
  popup.show("error awdawd dawdae dqdwqwedadawd eqweq eq dwqeq gwgwgeg");
});
warningButton.addEventListener("click", () => {
  const popup = new ToastNotifications(main, "warning");
  popup.show("warning 7 sec", 7000);
});
successButton.addEventListener("click", () => {
  const popup = new ToastNotifications(main, "success");
  popup.show("success");
});
infoButton.addEventListener("click", () => {
  const popup = new ToastNotifications(main, "info");
  popup.show("info");
});
