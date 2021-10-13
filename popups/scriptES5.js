var main = document.getElementById("main");
var errorButton = document.getElementById("error");
var warningButton = document.getElementById("warning");
var successButton = document.getElementById("success");
var infoButton = document.getElementById("info");
var modalButton = document.getElementById("modal");

function PopUp(container) {
  this.container = container || document.getElementsByTagName("body")[0];
  this._greateNewElement = function (tagName, id) {
    var newElement = document.createElement(tagName);
    if (id) {
      newElement.id = id;
    }

    newElement.className = [].slice.call(arguments).slice(2).join(" ");
    // var a = arrayOfClasses.slice(2);
    //
    // newElement.className = a.join(" ");
    return newElement;
  };
}
//
// PopUp.prototype._greateNewElement = function (tagName, id) {
//   var newElement = document.createElement(tagName);
//   if (id) {
//     newElement.id = id;
//   }
//
//   var arrayOfClasses = new Array(arguments).slice(2);
//
//   newElement.className = arrayOfClasses.join(" ");
//   return newElement;
// };
//
// console.dir(new PopUp());

function ToastNotifications(container, message, timeToShow) {
  PopUp.apply(this, arguments);
  this.message = message || "Something went wrong";
  this.timeToShow = timeToShow || 5000;
}

ToastNotifications.prototype._buildPopUp = function (popUpType) {
  var validPopUpType = popUpType;
  if (
    popUpType !== "error" &&
    popUpType !== "warning" &&
    popUpType !== "success"
  ) {
    validPopUpType = "info";
  }

  var popupWrapper = this._greateNewElement(
    "div",
    undefined,
    "popup-wrapper",
    validPopUpType
  );

  var icon = this._greateNewElement("div", undefined, "icon", validPopUpType);
  popupWrapper.appendChild(icon);

  var popup = this._greateNewElement("span");
  popup.innerText = this.message;
  popupWrapper.appendChild(popup);

  var closeButton = this._greateNewElement("div", undefined, "cl-btn");
  closeButton.addEventListener("click", function () {
    popupWrapper.remove();
  });
  popupWrapper.appendChild(closeButton);

  var popupBlock = document.getElementById("popup-block");

  if (popupBlock) {
    popupBlock.appendChild(popupWrapper);
  } else {
    popupBlock = this._greateNewElement("div", "popup-block", "popup-block");
    popupBlock.appendChild(popupWrapper);
    this.container.appendChild(popupBlock);
  }
};

ToastNotifications.prototype.show = function () {
  var popupWrapper = this._greateNewElement(
    "div",
    undefined,
    "popup-wrapper",
    "error"
  );

  var icon = this._greateNewElement("div", undefined, "icon", "error");
  popupWrapper.appendChild(icon);

  var popup = this._greateNewElement("span");
  popup.innerText = this.message;
  popupWrapper.appendChild(popup);

  var closeButton = this._greateNewElement("div", undefined, "cl-btn");
  closeButton.addEventListener("click", function () {
    popupWrapper.remove();
  });
  popupWrapper.appendChild(closeButton);

  var popupBlock = document.getElementById("popup-block");

  if (popupBlock) {
    popupBlock.appendChild(popupWrapper);
  } else {
    popupBlock = this._greateNewElement("div", "popup-block", "popup-block");
    popupBlock.id = "popup-block";
    popupBlock.className = "popup-block";
    popupBlock.appendChild(popupWrapper);
    this.container.appendChild(popupBlock);
  }

  var timeout = setTimeout(function () {
    popupWrapper.remove();
    clearTimeout(timeout);
  }, this.timeToShow);
};

// console.dir(new ToastNotifications(main, "Error here"));

function ModalWindow(container) {
  PopUp.apply(this, arguments);
  this.content = null;
}
ModalWindow.prototype.show = function (content) {
  this.content =
    content ||
    (function () {
      var defaultContent = document.createElement("div");
      defaultContent.innerText = "Modal";
      return defaultContent;
    })();

  var modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  var modalBackground = document.createElement("div");
  modalBackground.className = "modal-background";
  modalBackground.addEventListener("click", function () {
    modalContainer.remove();
  });
  var modalMain = document.createElement("div");
  modalMain.className = "modal-main";

  modalMain.appendChild(this.content);
  modalContainer.appendChild(modalMain);
  modalContainer.appendChild(modalBackground);
  this.container.appendChild(modalContainer);
};

modalButton.addEventListener("click", function () {
  var modal = new ModalWindow(main);
  modal.show();
});

errorButton.addEventListener("click", function () {
  var popup = new ToastNotifications(main, "Error here");
  popup.show();
});
