function getProductsLocaleStorage() {
    let productPanier = JSON.parse(localStorage.getItem("panier"))
    if (productPanier) {    
        let coutTotal = 0;
        productPanier.forEach(ourson => {
            createPanierOurson(document.getElementById("section__produit"), ourson)
            coutTotal += ourson.prix/100 * ourson.quantité
        });
        const totalPanier = document.querySelector(".result")
        totalPanier.innerHTML = coutTotal + " €"

        const deletePanier = document.getElementById("delete__panier")
        deletePanier.innerHTML = "Vider entièrement mon panier"
        deletePanier.addEventListener("click", () => {
            localStorage.clear()
            document.location.reload()
        }) 
    }else{
        productPanier = document.getElementById("section__priceAndForm")
        const product = document.getElementById("section__produit")
        const cache = document.getElementById("cache")
        const panierVide = document.createElement("h1")
        cache.appendChild(panierVide)
        panierVide.innerHTML = "Votre panier est vide..."
        productPanier.setAttribute("class", "display__none")
        product.setAttribute("class", "display__none")
    }
}
function createPanierOurson(containerPanierProduct, ourson) {
    
    //----------Création des elements HTML -------------------------------//
    const productImage = document.createElement("img")
    const productName = document.createElement("span")
    const productPrice = document.createElement("span")
    const productQuantity = document.createElement("span")
    
    //liaison de la constante parente qui recois les informations--------------------// 
    containerPanierProduct.appendChild(productImage)
    containerPanierProduct.appendChild(productName)
    containerPanierProduct.appendChild(productPrice)
    containerPanierProduct.appendChild(productQuantity)
    //----------ciblage des constantes créés pour leur fournir le chemin d'information//
    productImage.src = ourson.image
    productImage.setAttribute("class", "image__product")
    productName.innerHTML = ourson.nom
    productName.setAttribute("class", "name__product")
    productPrice.innerHTML = ourson.prix / 100 + ' €'
    productPrice.setAttribute("class", "price__product")
    productQuantity.innerHTML = "Quantité:" + ourson.quantité 
    productQuantity.setAttribute("class", "quantity__product")
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
        
        productTab.forEach( ourson => {
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
        mode:'cors',
        body: contactItems
    })
    .then((res) => res.json())
    .then( info => {
        localStorage.setItem('contact', JSON.stringify(info.contact));
        localStorage.setItem('orderId', JSON.stringify(info.orderId));
        localStorage.setItem('total', JSON.stringify(document.querySelector(".result").innerText));
        localStorage.removeItem('panier');
        document.location.href = "../pages/order.html";
    })
}


getProductsLocaleStorage();