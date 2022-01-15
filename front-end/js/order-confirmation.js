function displayOrderConfirm() {
    const contact = JSON.parse(localStorage.getItem("contact"));
    const orderId = JSON.parse(localStorage.getItem("orderId"));
    const total = JSON.parse(localStorage.getItem('total')); 

    const cardOrderId = document.getElementById("orderId")
    const cardName = document.getElementById("name")
    const cardFirstName = document.getElementById("lastName")
    const cardAdress = document.getElementById("adress")
    const cardCity = document.getElementById("city")
    const cardMail = document.getElementById("email")
    const cardTotal = document.getElementById("total")

    cardOrderId.innerText = orderId
    cardName.innerText = contact.lastName
    cardFirstName.innerText = contact.firstName
    cardAdress.innerText = contact.address
    cardCity.innerText = contact.city
    cardMail.innerText = contact.email
    cardTotal.innerText = total
}
displayOrderConfirm();