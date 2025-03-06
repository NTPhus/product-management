// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".box-user").classList.add("add");
            const userId = btn.getAttribute("btn-add-friend");
            
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
// Hết Chức năng gửi yêu cầu

// Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".box-user").classList.remove("add");
            const userId = btn.getAttribute("btn-cancel-friend");
            
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
// Hết Chức năng hủy yêu cầu

// Chức năng Từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".box-user").classList.remove("refuse");
            const userId = btn.getAttribute("btn-refuse-friend");
            
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
// Hết Chức năng Từ chối kết bạn

// Chức năng đồng ý kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".box-user").classList.remove("accept");
            const userId = btn.getAttribute("btn-accept-friend");
            
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
    })
}
// Hết Chức năng đồng ý kết bạn