
function delOneProduct(itemInfo) {
    let basket = JSON.parse(localStorage.getItem("basket"))
    basket = basket.filter(item => item.id != itemInfo)
    localStorage.setItem("basket", JSON.stringify(basket))
}
function getProductsLocaleStorage() {
    let productPanier = JSON.parse(localStorage.getItem("basket"))
    if (productPanier) {
        let coutTotal = 0;
        productPanier.forEach(ourson => {
            createPanierOurson(document.getElementById("section__produit"), ourson)
            coutTotal += ourson.prix / 100 * ourson.quantité
        });
        const totalPanier = document.querySelector(".result")
        totalPanier.innerHTML = coutTotal + " €"

        const deletePanier = document.getElementById("delete__panier")
        deletePanier.innerHTML = "Vider entièrement mon panier"
        deletePanier.addEventListener("click", () => {
            localStorage.clear()
            document.location.reload()
        })
    } else {
        productPanier = document.getElementById("section__priceAndForm")
        const product = document.getElementById("section__produit")
        const cache = document.getElementById("cache")
        const panierVide = document.createElement("h1")
        const annonce = document.createElement("h2")
        cache.appendChild(panierVide)
        cache.appendChild(annonce)
        panierVide.innerHTML = "Votre panier est vide..."
        annonce.innerHTML = "vous allez être redirigé"
        productPanier.setAttribute("id", "display__none")
        product.setAttribute("id", "display__none")
        function redirection() {
            window.location.replace("../index.html")
        }
        function awaitRedirection(){
            setTimeout(redirection, 3000);
        }
        awaitRedirection();        
    }
}
function createPanierOurson(containerPanierProduct, ourson) {

    //----------Création des elements HTML -------------------------------//
    const groupe = document.createElement("div")
    const productImage = document.createElement("img")
    const productName = document.createElement("span")
    const productPrice = document.createElement("span")
    const productQuantity = document.createElement("span")
    const btnDel = document.createElement("button")

    //liaison de la constante parente qui recois les informations--------------------// 
    groupe.appendChild(productImage)
    groupe.appendChild(productName)
    groupe.appendChild(productPrice)
    groupe.appendChild(productQuantity)
    groupe.appendChild(btnDel)
    containerPanierProduct.appendChild(groupe)
    //----------ciblage des constantes créés pour leur fournir le chemin d'information//
    groupe.setAttribute("class", "groupe__product")
    productImage.src = ourson.image
    productImage.setAttribute("class", "image__product")
    productName.innerHTML = ourson.nom
    productName.setAttribute("class", "name__product")
    productPrice.innerHTML = ourson.prix / 100 + ' €'
    productPrice.setAttribute("class", "price__product")
    productQuantity.innerHTML = "Quantité: " + ourson.quantité
    productQuantity.setAttribute("class", "quantity__product")
    const itemInfo = ourson.id
    btnDel.innerText = "supprimer l'article"
    btnDel.setAttribute("class", "btnDel")
    btnDel.addEventListener("click", () => {
        delOneProduct(itemInfo);
        document.location.reload();
    })
    const form = document.getElementById("Form")
    form.addEventListener("submit", () => {
        sendForm();
    })
}


function sendForm() {
    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    if (localStorage.getItem('order')) {
        let productTab = JSON.parse(localStorage.getItem('order'));

        productTab.forEach(ourson => {
            products.push(ourson._id);
        })
    }

    let contactItems = JSON.stringify({
        contact, products
    })
    postOrder(contactItems);
};
// =====================================================================================

//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le sessionStorage.
//Envoie page "confirmation"
function postOrder(contactItems) {

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: contactItems
    })
        .then((res) => res.json())
        .then(info => {
            localStorage.setItem('contact', JSON.stringify(info.contact));
            localStorage.setItem('orderId', JSON.stringify(info.orderId));
            localStorage.setItem('total', JSON.stringify(document.querySelector(".result").innerText));
            localStorage.removeItem('basket');
            document.location.href = "../pages/order.html";
        })
}


getProductsLocaleStorage();