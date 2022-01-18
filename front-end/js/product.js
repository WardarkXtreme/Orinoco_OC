//fonction de sauvegarde du panier
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket))
}
//fonction pour si le panier est creer et gerer la logique de cette question 
function getBasket() {
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return []
    }else {
        return JSON.parse(basket);
    }
}
//fonction pour gerer l'envois de l'article dans le panier
function addBasket(itemInfo) {
    const quantity = document.getElementById('nombre').innerText;
    let basket = getBasket();
    // on regarde si l'article qu'on envois est present dans le panier
    let foundProduct = basket.find(p => p.id == itemInfo.id);
    if(foundProduct != undefined) {
        //s'il est present il ne renverra pas undefini donc on parse les quantité pour pouvoir les additionner
        let value = JSON.parse(quantity)
        let value2 = JSON.parse(foundProduct.quantité)
        console.log(value)
        foundProduct.quantité = (value+value2);
    }else {
        basket.push(itemInfo);
    }
    saveBasket(basket);
}
//fonction qui permet de creer les elements du Dom requis pour notre fenetre de demande de redirection
function Modal() {
    const mainProduct = document.getElementById("mainProduct")
    const groupe = document.createElement("div")
    const infoModal = document.createElement("p")
    const buttonOne = document.createElement("button")
    const buttonTwo = document.createElement("button")
 
    infoModal.innerHTML = "Votre article a été ajouté au panier !"
    infoModal.setAttribute("class", "infoModal")

    buttonOne.innerHTML = "Continuez vos achats"
    buttonOne.setAttribute("class", "btnModal")
    buttonTwo.innerHTML = "Accedez au panier"
    buttonTwo.setAttribute("class", "btnModal")
    groupe.appendChild(infoModal)
    groupe.appendChild(buttonOne)
    groupe.appendChild(buttonTwo)
    groupe.setAttribute("id", "groupeModal")
    mainProduct.appendChild(groupe)

    //permet d'écouter l'évenement click et lui ajoute une logique
    buttonOne.addEventListener("click", ()=> {
        window.location.href = "../index.html"
    })
    buttonTwo.addEventListener("click", ()=> {
        window.location.href = "../pages/panier.html"
    })
};
//fonction qui change l'attribution des id des elements qu'il faut afficher pour que seul la modal soit visible 
function displayModal () {
    const noVisible = document.getElementById("simple__container--product")
    const visible = document.getElementById("groupeModal")
    noVisible.setAttribute("id", "noVisible")
    visible.setAttribute("id", "visible")
};
//fonction pour aller chercher les information de teddy grace a son Id qui a etait prealablement envoyer en parametre dans l'url
function getOneProduct() {
    //methode slice permer de retirer un ou plusieur parametre 
    const idServiable = window.location.search.slice(1);
    fetch("http://localhost:3000/api/teddies/" + idServiable)
    .then((res) => res.json())
    .then((dataOneProduct) => {
        const arrayColor = dataOneProduct.colors;
        arrayColor.forEach(colorOurson => {
            chooseColor(document.getElementById('select__color'), colorOurson)
        });
        createOurson(dataOneProduct)
    })
}
// permet de créer tous les elements du Dom dispensables à l'affichage des articles trouvé par le forEach
function createOurson(ourson) {   
    const containerOneProduct = document.getElementById("simple__container--product")
    const panierBtn = document.querySelector('.btn')
    const groupeProduct = document.createElement("div")
    //----------Création des elements HTML -------------------------------//
    const productImage = document.createElement("img")
    const productName = document.createElement("span")
    const productPrice = document.createElement("span")
    const productDescription = document.createElement("span")
    //liaison de la constante parente qui recois les informations--------------------// 
    groupeProduct.appendChild(productImage)
    groupeProduct.appendChild(productName)
    groupeProduct.appendChild(productPrice)
    groupeProduct.appendChild(productDescription)
    containerOneProduct.appendChild(groupeProduct)
    //----------ciblage des constantes créés pour leur fournir le chemin d'information// 
    groupeProduct.setAttribute("class", "groupe__info")
    productImage.src = ourson.imageUrl
    productImage.setAttribute("alt", "image-Ourson")
    productImage.setAttribute("class", "image__product")
    productName.innerHTML = ourson.name
    productName.setAttribute("class", "name__product")
    productPrice.innerHTML = ourson.price / 100 + '€'
    productPrice.setAttribute("class", "price__product")
    productDescription.innerHTML = ourson.description
    productDescription.setAttribute("class", "description__product")   
    panierBtn.addEventListener('click', () =>{
        const quantity = document.getElementById('nombre').innerText
        const itemInfo = {
            image : ourson.imageUrl,
            nom : ourson.name,
            id : ourson._id,
            prix : ourson.price,
            quantité : quantity
        }
        addBasket(itemInfo);
        displayModal();
    })
}
// permet de creer une selection sur les couleur que renvoi l'article
function chooseColor(container, colorOurson) {
    const selectColor = document.createElement("option")
    container.appendChild(selectColor)
    selectColor.innerHTML = colorOurson
    selectColor.value = colorOurson
}
//permet de gerer la quantité souhaitées d'articles avec un btn + et un btn - 
function btnQuantity() {
    const btnMoins = document.getElementById('btnMoins')
    const btnPlus = document.getElementById('btnPlus')
    const nombre = document.getElementById('nombre')
    let compteur = parseInt(nombre.innerText = 1);
    btnMoins.addEventListener('click',() => {
        compteur = compteur-1
        if(compteur < 1) {
            compteur = 1
        }
        nombre.innerText = compteur;
    }); 
    btnPlus.addEventListener('click',() => {
        compteur = compteur+1
        if(compteur > 10) {
            compteur = 10
        }
        nombre.innerText = compteur;
    });
}
getOneProduct();
btnQuantity();
Modal();