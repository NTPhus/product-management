import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
import * as FileUploadWithPreview from 'https://cdn.jsdelivr.net/npm/file-upload-with-preview/dist/file-upload-with-preview.esm.js';

//file-upload-with-preview
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
    multiple: true,
    maxFileCount: 6
});
//end file-upload-with-preview

//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    const images = upload.cachedFileArray;
    if (content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      });
      e.target.elements.content.value = "";
      upload.resetPreviewPanel();
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
//end CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

  const div = document.createElement("div");
  let htmlFullName = "";
  let htmlContent = "";
  let htmlImages = "";

  if (myId == data.user_id) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullname}</div>`;
    div.classList.add("inner-comming");
  }

  if(data.content){
    htmlContent = `
    <div class="inner-content">${data.content}</div>
    `
  }

  if(data.images.length > 0){
    htmlImages += `<div class="inner-images">`
      
    for(const image of data.images){
      htmlImages += `<img src"${image}">`
    }
   
    htmlImages += `<div>`;
  }

  div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
    `;

  body.insertBefore(div, boxTyping);
  body.scrollTop = body.scrollHeight;
});
//End SERVER_RETURN_MESSAGE

//Scroll Chat to bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll Chat to bottom

//Show icon chat
//Show Popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
//End Show Popup

// Show Typing
let timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}
// end Show Typing

//Insert icon to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    `.chat .inner-form input[name="content"]`
  );
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;
    
    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();

    showTyping();
  });

  //Input keyup
  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
  //End input keyup
}
//End Insert icon to input
//End show icon chat

//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");

if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    console.log(data);
    if (data.type == "show") {
      const existTyping = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );
      const bodyChat = document.querySelector(".chat .inner-body");

      if (!existTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.user_id);

        boxTyping.innerHTML = `
              <div class="box-typing">
                  <div class="inner-name">${data.fullname}</div>
                  <div class="inner-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
              </div>
          `;

        elementListTyping.appendChild(boxTyping);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );
      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}
//End SERVER_RETURN_TYPING
