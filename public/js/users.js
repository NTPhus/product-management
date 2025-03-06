// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.add("add");
      const userId = btn.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// Hết Chức năng gửi yêu cầu

// Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".box-user").classList.remove("add");
      const userId = btn.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// Hết Chức năng hủy yêu cầu

// Chức năng Từ chối kết bạn
const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.remove("refuse");
    const userId = button.getAttribute("btn-refuse-friend");

    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((btn) => {
    refuseFriend(btn);
  });
}
// Hết Chức năng Từ chối kết bạn

// Chức năng đồng ý kết bạn
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.remove("accept");
    const userId = button.getAttribute("btn-accept-friend");

    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};

const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((btn) => {
    acceptFriend(btn);
  });
}
// Hết Chức năng đồng ý kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if (badgeUsersAccept) {
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.lengthAcceptFriends) {
      badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}
// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUsersAccept = document.querySelector("[data-users-accept]");
if (dataUsersAccept) {
  const userId = dataUsersAccept.getAttribute("data-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId == data.userId) {
      //vẽ user ra giao diện
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.innerHTML = `      
          <div class="box-user">
            <div class="inner-avatar">
              <img src="/images/avatar.jfif" alt=${data.infoUserA.fullname}>
            </div>
            <div class="inner-name">
              ${data.infoUserA.fullname}
            </div>
            <div class="inner-buttons">
              <button 
                class="btn btn-sm btn-primary mr-1"
                btn-accept-friend=${data.infoUserA._id}
              >
                Chấp nhận
              </button>
              <button 
                class="btn btn-sm btn-secondary mr-1"
                btn-refuse-friend=${data.infoUserA._id}
              >
                Xóa
              </button>
              <button 
                class="btn btn-sm btn-secondary mr-1"
                btn-deleted-friend=
                disabled
              >
                Đã xóa
              </button>
              <button 
                class="btn btn-sm btn-primary mr-1"
                btn-accepted-friend=
                disabled
              >
                Đã cháp nhận
              </button>
            </div>
          </div>
      `;
      dataUsersAccept.appendChild(div);
      //hết vẽ user ra giao diện

      //Hủy lời mời kết bạn
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);
      //Hết hủy lời mời kết bạn

      // Chấp nhận lời mời kết bạn
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
      // Hết Chấp nhận lời mời kết bạn
    }
  });
}
// End SERVER_RETURN_INFO_ACCEPT_FRIEND
