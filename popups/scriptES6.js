var main = document.getElementById("main");
var errorButton = document.getElementById("error");
var warningButton = document.getElementById("warning");
var successButton = document.getElementById("success");
var infoButton = document.getElementById("info");
var modalButton = document.getElementById("modal");

class PopUp {
  constructor(container) {
    this.container = container || document.getElementsByTagName("body")[0];
  }
  _createNewElement(tagName, id) {
    var newElement = document.createElement(tagName);
    if (id) {
      newElement.id = id;
    }

    newElement.className = [].slice.call(arguments).slice(2).join(" ");
    return newElement;
  }
}

class ToastNotifications extends PopUp {
  constructor(container, popUpType) {
    super(container);
    this.popUpType = popUpType;
  }

  _buildPopUp(popUpType, message) {
    var validPopUpType = popUpType;
    if (
      popUpType !== "error" &&
      popUpType !== "warning" &&
      popUpType !== "success"
    ) {
      validPopUpType = "info";
    }

    var popUpMessage = message || "Something went wrong";

    var popupWrapper = this._createNewElement(
      "div",
      undefined,
      "popup-wrapper",
      validPopUpType
    );

    var icon = this._createNewElement("div", undefined, "icon", validPopUpType);
    popupWrapper.appendChild(icon);

    var popup = this._createNewElement("span");
    popup.innerText = popUpMessage;
    popupWrapper.appendChild(popup);

    var closeButton = this._createNewElement("div", undefined, "cl-btn");
    closeButton.addEventListener("click", function () {
      popupWrapper.remove();
    });
    popupWrapper.appendChild(closeButton);

    return popupWrapper;
  }

  _runTimer(popUpNode, timeToShow) {
    var timeout = setTimeout(function () {
      popUpNode.remove();
      clearTimeout(timeout);
    }, timeToShow);
  }

  show(message, time) {
    var timeToShow = time || 5000;

    var popupWrapper = this._buildPopUp(this.popUpType, message);

    var popupBlock = document.getElementById("popup-block");

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
        var defaultContent = document.createElement("div");
        defaultContent.innerText = "Modal";
        return defaultContent;
      })();

    var modalContainer = this._createNewElement(
      "div",
      undefined,
      "modal-container"
    );
    var modalBackground = this._createNewElement(
      "div",
      undefined,
      "modal-background"
    );
    modalBackground.addEventListener("click", function () {
      modalContainer.remove();
    });
    var modalMain = this._createNewElement("div", undefined, "modal-main");

    modalMain.appendChild(this.content);
    modalContainer.appendChild(modalMain);
    modalContainer.appendChild(modalBackground);
    this.container.appendChild(modalContainer);
  }
}

//добавляем события на кнопки
modalButton.addEventListener("click", function () {
  var modal = new ModalWindow(main);
  modal.show();
});

errorButton.addEventListener("click", function () {
  var popup = new ToastNotifications(main, "error");
  popup.show("error awdawd dawdae dqdwqwedadawd eqweq eq dwqeq gwgwgeg");
});
warningButton.addEventListener("click", function () {
  var popup = new ToastNotifications(main, "warning");
  popup.show("warning 7 sec", 7000);
});
successButton.addEventListener("click", function () {
  var popup = new ToastNotifications(main, "success");
  popup.show("success");
});
infoButton.addEventListener("click", function () {
  var popup = new ToastNotifications(main, "info");
  popup.show("info");
});
