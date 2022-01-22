//-------------fonction de suppression d'article dans le panier grace à son Id avec la methode find---//
function delOneProduct(itemInfo) {
    let basket = JSON.parse(localStorage.getItem("basket"))
    basket = basket.filter(item => item.id != itemInfo)
    localStorage.setItem("basket", JSON.stringify(basket))
    const verify = JSON.parse(localStorage.getItem("basket"))
    if (verify[0] == null) {
        localStorage.clear("basket")
    }
}
//----Fonction qui gère le comportement à adopter si un panier est present on l'affiche et on calcul son total sinon on affiche que le panier 
//----------------------------est vide est on redirige l'utilisateur.
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
        function awaitRedirection() {
            setTimeout(redirection, 3000);
        }
        awaitRedirection();
    }
}
//----------fonction qui permet de Créer le DOM qui servira à afficher les articles trouvé par le forEach 
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
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        sendForm();
    })
}
//fonction gérant le formulaire et l'envois
function sendForm() {
    // variable truc = {} <=  est une maniere de creer un objet de paire clef: valeur
    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };
    let products = [];

    let productTab = JSON.parse(localStorage.getItem('basket'));
    //pour chaque ourson trouver dans le panier on va envoyer l'id dans le tableau products
    productTab.forEach(ourson => {
        products.push(ourson.id);
    })
    let contactItems = JSON.stringify({ contact, products })
    postOrder(contactItems)
};
//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le localeStorage.
//Envoie page "confirmation"
function postOrder(contactItems) {

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        //L'en-tête est là pour que l'application puisse détecter quelles données ont été renvoyées et comment elle doit les gérer.en l'occurence en .json//
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: contactItems
    })
        //on transforme la reponse en format json
        .then((res) => res.json())
        .then((info) => {

            const verifContact = localStorage.getItem('contact')
            const verifOrderId = localStorage.getItem('orderId')
            const verifTotal= localStorage.getItem('total')
            if(verifContact && verifOrderId && verifTotal != undefined){
                localStorage.removeItem('contact', 'orderId', 'total');
            }
            // on recupere les données et on leurs attribut une logique de sauvegarde dans le localStorage
            localStorage.setItem('contact', JSON.stringify(info.contact));
            localStorage.setItem('orderId', JSON.stringify(info.orderId));
            localStorage.setItem('total', JSON.stringify(document.querySelector(".result").innerText));
            console.log("j'arrive jusqu'ici")
            window.location = "/front-end/pages/order.html"
            localStorage.removeItem('basket')
        })
}
getProductsLocaleStorage();