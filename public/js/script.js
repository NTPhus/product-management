//Show alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  console.log(showAlert.getAttribute("data-time"));
  const timeAlert = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, timeAlert);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//End show alert