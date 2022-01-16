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

    buttonOne.addEventListener("click", ()=> {
        window.location.href = "../index.html"
    })
    buttonTwo.addEventListener("click", ()=> {
        window.location.href = "../pages/panier.html"
    })
};
function displayModal () {
    const noVisible = document.getElementById("simple__container--product")
    const visible = document.getElementById("groupeModal")
    noVisible.setAttribute("id", "noVisible")
    visible.setAttribute("id", "visible")
};

function getOneProduct() {
    const recuperationId = window.location.search;
    const idServiable = recuperationId.slice(1);
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
    productImage.setAttribute("class", "image__index")
    productName.innerHTML = ourson.name
    productName.setAttribute("class", "name__index")
    productPrice.innerHTML = ourson.price / 100 + '€'
    productPrice.setAttribute("class", "price__index")
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
        let  produit = JSON.parse(localStorage.getItem("panier"))
        if(produit) {
            produit.push(itemInfo)
            localStorage.setItem("panier", JSON.stringify(produit))
        }
        else{
            produit = []
            produit.push(itemInfo)
            localStorage.setItem("panier", JSON.stringify(produit))
        }
        displayModal()
    })
}
function chooseColor(container, colorOurson) {
    const selectColor = document.createElement("option")
    container.appendChild(selectColor)
    selectColor.innerHTML = colorOurson
    selectColor.value = colorOurson
}
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