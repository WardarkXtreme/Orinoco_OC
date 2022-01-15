function getProducts() {
    fetch ("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((dataProducts) => {
        dataProducts.forEach(ourson => {
            createOurson(document.getElementById("simple__container"), ourson);
        });
    })
}
function createOurson(container, ourson) {   
    //----------Création des elements HTML -------------------------------//
    const groupeProduct = document.createElement("div")
    const productImage = document.createElement("img")
    const productPrice = document.createElement("span")
    const productName = document.createElement("span")
    const productButton = document.createElement("button")
    //liaison de la constante parente qui recois les informations--------------------// 
    groupeProduct.appendChild(productImage)
    groupeProduct.appendChild(productName)
    groupeProduct.appendChild(productPrice)
    groupeProduct.appendChild(productButton)
    container.appendChild(groupeProduct)

    //----------ciblage des constantes créés pour leur fournir le chemin d'information//
    groupeProduct.setAttribute("class", "groupe__info")
    productImage.src = ourson.imageUrl
    productImage.setAttribute("class", "image__index")
    productPrice.innerHTML = ourson.price / 100 + '€'
    productPrice.setAttribute("class", "price__index")
    productName.innerHTML = ourson.name
    productName.setAttribute("class", "name__index")
    productButton.innerHTML = "Afficher " + ourson.name
    productButton.setAttribute("class", "btn")
    //  evenement d'envoie lié au bouton du produit //
    productButton.addEventListener("click" ,() => {    
        let idProduct = ourson._id 
        location.href = './pages/product.html?' + idProduct; 
    })
}
getProducts();

