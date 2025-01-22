import { fetchDataAPI, fetchCategoryAPI, imageDelete, sendNewImageInformation } from "./fetchPortfolio.js"

let DATA = await fetchDataAPI() 
let DATA_CATEGORY = await fetchCategoryAPI() 

let BTN_LOGIN = document.querySelector(".btn_loginLogout")
let MODALE_OPEN_BUTTON = document.createElement("a")

function main(){
  if (localStorage.getItem("token")) {
    displayAdminLogout()
    createAdminModeEdition()
    createButtonOpenModale()
    toggleDisplayModale("modale_overlay_inactive", "modale_inactive", "modale_overlay_active", "modale_active")
    initEvents()
  }
 else {
  console.log("error")
  }
} 
main()

//C'est ici que j'initialise tous mes évènements.
function initEvents(){
  
  // Clique sur le bouton login et affiche le bouton logout
  BTN_LOGIN.addEventListener("click", function(){
    localStorage.removeItem("token")
    window.open("index.html","_self")
    displayAdminLogout()
  })

  // Clique sur le bouton modale pour ouvrir la modale et afficher son contenu
  MODALE_OPEN_BUTTON.addEventListener("click", function(event){
    event.preventDefault()
    showGalleryModale()
  })

  // Clique sur le bouton principal de la modale pour afficher un nouveau contenu
  let modaleMainButton = document.getElementById("modaleMainButton")
  modaleMainButton.addEventListener("click", function(event){
    event.stopPropagation()
    showEditGalleryModale()
  })

  // Clique sur le bouton Fermé de la modale et cache son contenu
  let modale_close_button = document.getElementById("modaleCloseButton")
  modale_close_button.addEventListener("click", function(event){
    event.stopPropagation()
    toggleDisplayModale("modale_overlay_inactive", "modale_inactive", "modale_overlay_active", "modale_active")
    location.reload()
  })

  // Clicque sur l'overlay de la modale pour fermer la modale et son overlay
/*   let modale_overlay = document.getElementById("modale_overlay")
  modale_overlay.addEventListener("click", function(event){
    event.stopPropagation()
    let modale = document.getElementById("modale")
    modale.classList.add("modale_inactive")
    modale_overlay.classList.add("modale_overlay_inactive")
  })  */

  // Clique sur le bouton "précédent" de la modale et affiche son contenu
  let modale_previous_button = document.getElementById("modalePreviousButton")
  modale_previous_button.addEventListener("click", function(event){
    event.stopPropagation()
    showGalleryModale()
  })
}

// Affiche le contenu du bouton Logout
function displayAdminLogout(){
  BTN_LOGIN.innerHTML = "logout"
  BTN_LOGIN.classList.add("logout")
}

// Créé et affiche l'icône Mode Edition
function createAdminModeEdition(){
  let id_modeEdition = document.querySelector("#divModeEdition")
  let sous_div_modeEdition = document.createElement("div") 
  let icon_modeEdition = document.createElement("i")
  
  icon_modeEdition.classList.add("fa-regular", "fa-pen-to-square")
  sous_div_modeEdition.classList.add("sous_div_modeEdition")

  id_modeEdition.appendChild(sous_div_modeEdition)
  sous_div_modeEdition.appendChild(icon_modeEdition)
}

// Créé et affiche le bouton d'ouverture de la modale
function createButtonOpenModale(){
  let retriveId = document.getElementById("modale_open_button")

  MODALE_OPEN_BUTTON.href='index.html'
  MODALE_OPEN_BUTTON.id = "a_modifier"
  MODALE_OPEN_BUTTON.classList.add("modale_open_button")

  let modifier_icone = document.createElement("i")
  modifier_icone.classList.add("fa-regular", "fa-pen-to-square")

  retriveId.appendChild(MODALE_OPEN_BUTTON)
  MODALE_OPEN_BUTTON.appendChild(modifier_icone)
}

// Affiche la modale et son arrière plan
function toggleDisplayModale(classToAddOverlay, classToAddModale,classToRemoveOverlay,classToRemoveModale){
  let modale_overlay = document.getElementById("modale_overlay")
  let modale = document.getElementById("modale")

  modale_overlay.classList.add(classToAddOverlay)
  modale.classList.add(classToAddModale)

  modale_overlay.classList.remove(classToRemoveOverlay)
  modale.classList.remove(classToRemoveModale)
}

// Affiche la Modale "Gallery" et son contenu
function showGalleryModale(){
  toggleDisplayModale("modale_overlay_active", "modale_active", "modale_overlay_inactive", "modale_inactive")
  displayFixedContentModale()
  displayModaleTitle("Galerie photo")
  createGalleryModale("galleryContainer_modale_active", "galleryContainer_modale_inactive")
  displayModaleCloseButton()
  displayModalePreviousButton()
  displayModaleMainButtonContent()
  createUploadFormModale("upload_modale_form_inactive", "upload_modale_form_active")
}

// Affiche la Modale "Ajout Photo" et son contenu
function showEditGalleryModale(){
  displayModaleTitle("Ajout photo")
  displayModaleMainButtonContent()
  displayModalePreviousButton()
  createGalleryModale("galleryContainer_modale_inactive", "galleryContainer_modale_active")
  createUploadFormModale("upload_modale_form_active", "upload_modale_form_inactive")
}

// Affiche le titre de la modale
function displayModaleTitle(text){
  let modaleTitle = document.getElementById("modaleTitle")
  modaleTitle.innerHTML = text
  modaleTitle.classList.add("modaleTitle")
}

// Affiche ou cache le bouton "fermé" de la modale
function displayModaleCloseButton(){
  let modale = document.getElementById("modale")
  let modale_close_button = document.getElementById("modaleCloseButton")
  if (modale.classList.contains("modale_inactive")){
    modale_close_button.classList.remove("modale_close_button_active")
    modale_close_button.classList.add("modale_close_button_inactive")
  } else {
    modale_close_button.classList.add("modale_close_button_active")
    modale_close_button.classList.remove("modale_close_button_inactive")
  }
}  

// Créé les éléments récurrents de la modale 
function displayFixedContentModale(){
    let modaleMainContent = document.getElementById("modaleMainContent")
    modaleMainContent.classList.add("modaleMainContent")
    
    let modaleLine = document.getElementById("modaleLine")
    modaleLine.classList.add("modaleLine")
    
    let modaleCloseButton = document.getElementById("modaleCloseButton")
    modaleCloseButton.classList.add("modale_close_button_active")
} 

// Créé la Galerie Modale et son contenu
async function createGalleryModale(classToAdd, classToRemove){
    let galleryContainer_modale = document.getElementById("galleryContainer_modale")
    galleryContainer_modale.innerHTML = ""
    galleryContainer_modale.classList.add(classToAdd)
    galleryContainer_modale.classList.remove(classToRemove)
      
    let containerImageModale
    let trashElementModale
    let trashIconModale
    let imageModale
   
    for(let i=0;i <DATA.length;i++){    
      containerImageModale = document.createElement("div")
      containerImageModale.classList.add("containerImageModale") 
      containerImageModale.id = "containerImageModale_"+DATA[i].id
      //console.log("Container image id: ",containerImageModale.id)
      trashElementModale = document.createElement("a")
      trashIconModale = document.createElement("i")
    
      imageModale = document.createElement("img")
      imageModale.src = DATA[i].imageUrl
      imageModale.id = DATA[i].id // tous les id de mes images
      //console.log("Image id: ", imageModale.id)

      imageModale.classList.add("imageModale")  

      trashElementModale.classList.add("trashElementModale") 
      trashIconModale.classList.add("fa-solid", "fa-trash", "trashIconModale") 
      trashIconModale.dataset.id = imageModale.id  //pour chaque icon, met un id et associe-le à un id de l'image
      //console.log("Trash id: ",trashIconModale.dataset.id)

      createDeleteModale(trashElementModale)

      galleryContainer_modale.appendChild(containerImageModale)
      containerImageModale.appendChild(imageModale)
      containerImageModale.appendChild(trashElementModale)
      trashElementModale.appendChild(trashIconModale)
    }
}

// Créé la Modale delete pour supprimer des photos de la galerie
function createDeleteModale(nameButton){
  nameButton.addEventListener("click", function(event){
    event.stopPropagation()
    let modaleOverlayDivDeletePicture = document.createElement("div")
    modaleOverlayDivDeletePicture.classList.add("modaleOverlayDivDeletePicture")
    let modaleDivDeletePicture = document.createElement("div")
    modaleDivDeletePicture.classList.add("modaleDivDeletePicture")
    let modaleDeleteQuestionTitle = document.createElement("h3")
    modaleDeleteQuestionTitle.innerHTML = "Souhaitez-vous vraiment supprimer cette image ?"
    modaleDeleteQuestionTitle.classList.add("modaleDeleteQuestionTitle")
    let modaleDeleteQuestionParagraph = document.createElement("p")
    modaleDeleteQuestionParagraph.innerHTML="Une fois l'image supprimée, il ne sera plus possible de la récupérer."
    modaleDeleteQuestionParagraph.classList.add("modaleDeleteQuestionParagraph")
    let modaleContainerButtonDeleteAnswer = document.createElement("div")
    modaleContainerButtonDeleteAnswer.classList.add("modaleContainerButtonDeleteAnswer")
    let buttonYesDeleteAnswer = document.createElement("button")
    buttonYesDeleteAnswer.innerHTML = "Oui, supprimer définitivement"
    buttonYesDeleteAnswer.classList.add("buttonYesDeleteAnswer")
    let buttonNoDeleteAnswer = document.createElement("button")
    buttonNoDeleteAnswer.innerHTML = "Non, revenir en arrière"
    buttonNoDeleteAnswer.classList.add("buttonNoDeleteAnswer")

    modale.appendChild(modaleOverlayDivDeletePicture)
    modale.appendChild(modaleDivDeletePicture)
    modaleDivDeletePicture.appendChild(modaleDeleteQuestionTitle)
    modaleDeleteQuestionTitle.appendChild(modaleDeleteQuestionParagraph)
    modaleDeleteQuestionTitle.appendChild(modaleContainerButtonDeleteAnswer)
    modaleContainerButtonDeleteAnswer.appendChild(buttonYesDeleteAnswer)
    modaleContainerButtonDeleteAnswer.appendChild(buttonNoDeleteAnswer)
    
    /*  Je remonte jusqu'au bouton parent le plus proche pour récupérer l'id. Je récupère l'id du trash une fois cliqué*/
    let containerId = event.target.closest('.containerImageModale') 
    let trashId = event.target.dataset.id

    buttonYesDeleteAnswer.addEventListener("click", function(event){
      event.stopPropagation()
      console.log("Si je clique sur le trash, l'id de la photo est : ", trashId)
      console.log("Si je clique sur l'image, l'id du container de l'image est : ", containerId.id)
      imageDelete(trashId, containerId)
      
      modale.removeChild(modaleOverlayDivDeletePicture)
      modale.removeChild(modaleDivDeletePicture)
      modaleDivDeletePicture.removeChild(modaleDeleteQuestionTitle)
      modaleDeleteQuestionTitle.removeChild(modaleDeleteQuestionParagraph)
      modaleDeleteQuestionTitle.removeChild(modaleContainerButtonDeleteAnswer)
      modaleContainerButtonDeleteAnswer.removeChild(buttonYesDeleteAnswer)
      modaleContainerButtonDeleteAnswer.removeChild(buttonNoDeleteAnswer)
    })

    buttonNoDeleteAnswer.addEventListener("click", function(event){
      event.stopPropagation()
      modale.removeChild(modaleOverlayDivDeletePicture)
      modale.removeChild(modaleDivDeletePicture)
      modaleDivDeletePicture.removeChild(modaleDeleteQuestionTitle)
      modaleDeleteQuestionTitle.removeChild(modaleDeleteQuestionParagraph)
      modaleDeleteQuestionTitle.removeChild(modaleContainerButtonDeleteAnswer)
      modaleContainerButtonDeleteAnswer.removeChild(buttonYesDeleteAnswer)
      modaleContainerButtonDeleteAnswer.removeChild(buttonNoDeleteAnswer)
    })
  }) 
}

// Affiche le bouton prinicpal de la modale et son contenu :
function displayModaleMainButtonContent() {
  let modaleMainButton = document.getElementById("modaleMainButton")
  let modaleTitle = document.getElementById("modaleTitle")
  
  if(modaleTitle.innerHTML === "Galerie photo"){
    modaleMainButton.innerHTML = "Ajouter une photo"
    modaleMainButton.classList.remove("modaleMainButton_inactive")
    modaleMainButton.classList.add("modaleMainButton_active")
  } else {
    modaleMainButton.innerHTML = "Valider"
    modaleMainButton.type = "submit" 
    modaleMainButton.classList.remove("modaleMainButton_active")
    modaleMainButton.classList.add("modaleMainButton_inactive")

    /* sendNewImageInformation() */
     modaleMainButton.addEventListener("click", function(event){
      event.stopPropagation()
      console.log(upload_modale_input.value)
      console.log(modaleForm_title_input.value)
      console.log(modaleForm_category_option.value)
    }) 
  }
}
  
// Affiche le bouton précédent en fonction du titre de la modale :
function displayModalePreviousButton(){
  let modalePreviousButton = document.getElementById("modalePreviousButton")
  let modaleTitle = document.getElementById("modaleTitle")
 
  if(modaleTitle.innerHTML === "Galerie photo"){
    modalePreviousButton.classList.remove("fa-solid", "fa-arrow-left")
    modalePreviousButton.classList.remove("modale_previous_button_active")
    modalePreviousButton.classList.add("modale_previous_button_inactive")
  } else {
    modalePreviousButton.classList.add("fa-solid", "fa-arrow-left")
    modalePreviousButton.classList.add("modale_previous_button_active")
    modalePreviousButton.classList.remove("modale_previous_button_inactive")
  }
}

// Créé la partie formulaire d'upload de la modale 
 // input.type="file" va créer automatiquement un bouton Browser.Je dois donc le cacher
let modaleForm_title_input = document.createElement("input")
let upload_modale_input = document.createElement("input")
let modaleForm_category_option = document.createElement("option")
function createUploadFormModale(classToAdd, classToRemove){
  let upload_modale_form = document.getElementById("upload_modale_form")
  upload_modale_form.innerHTML = ""
  upload_modale_form.classList.add(classToAdd) 
  upload_modale_form.classList.remove(classToRemove) 

  let upload_modale_container_picture = document.createElement("div")
  upload_modale_container_picture.classList.add("upload_modale_container_picture_active")

  let upload_modale_sub_container_picture = document.createElement("div")
  upload_modale_sub_container_picture.classList.add("upload_modale_sub_container_picture_active")

  let upload_modale_icon = document.createElement("i")
  upload_modale_icon.classList.add("fa-regular", "fa-image", "upload_modale_icon") 
  
  let upload_modale_button = document.createElement("button")
  upload_modale_button.innerHTML = "+ Ajouter photo"
  upload_modale_button.classList.add("upload_modale_button")

  upload_modale_input.type = "file" 
  upload_modale_input.accept="image/*"
  upload_modale_input.style.display = 'none'
  upload_modale_input.name = "picture" 
 
  createUploadNewPicture(upload_modale_button, upload_modale_input)
  handleNewPicture(upload_modale_input,upload_modale_sub_container_picture, upload_modale_container_picture)

  let upload_modale_paragraph = document.createElement("p")
  upload_modale_paragraph.innerHTML = "jpg, png : 4mo max"
  upload_modale_paragraph.classList.add("upload_modale_paragraph") 

  upload_modale_form.appendChild(upload_modale_container_picture)
  upload_modale_container_picture.appendChild(upload_modale_sub_container_picture)
  upload_modale_sub_container_picture.appendChild(upload_modale_icon)
  upload_modale_sub_container_picture.appendChild(upload_modale_button)
  upload_modale_sub_container_picture.appendChild(upload_modale_input)
  upload_modale_sub_container_picture.appendChild(upload_modale_paragraph)

  let upload_modale_container_subform = document.createElement("div")
  upload_modale_container_subform.classList.add("upload_modale_container_subform")

  let modaleForm_title_label = document.createElement("label")
  modaleForm_title_label.innerHTML= "Titre"
  modaleForm_title_label.classList.add("modaleForm_label")

  modaleForm_title_input.classList.add("modaleForm_input")
  modaleForm_title_input.name="titlePicture"

  let modaleForm_title_category = document.createElement("label")
  modaleForm_title_category.innerHTML= "Catégorie"
  modaleForm_title_category.classList.add("modaleForm_label")

  let modaleForm_selectCategory = document.createElement("select")
  modaleForm_selectCategory.classList.add("modaleForm_input") 

  extractCategoryModaleFORM(modaleForm_selectCategory, modaleForm_category_option)

  modaleForm_selectCategory.addEventListener("click", function(event){
    event.stopPropagation()
  })

  createErrorMessagesModaleTitleFORM(modaleForm_title_input, modaleForm_title_label) 
  createErrorMessagesModaleCategorieFORM(modaleForm_selectCategory, modaleForm_title_category)

  upload_modale_form.appendChild(upload_modale_container_subform)
  upload_modale_container_subform.appendChild(modaleForm_title_label)
  upload_modale_container_subform.appendChild(modaleForm_title_input)
  upload_modale_container_subform.appendChild(modaleForm_title_category)
  upload_modale_container_subform.appendChild(modaleForm_selectCategory) 
}

function createUploadNewPicture(nameButton, nameInput){
  nameButton.addEventListener("click", function(event){
    event.stopPropagation()
    event.preventDefault()
    nameInput.click()
  })
}

// Gère la lecture de la nouvelle photo 
function handleNewPicture(nameInput,  nameSubContainer, nameContainerPicture){
  nameInput.addEventListener("change", function(event){
    event.stopPropagation()
    let file = event.target.files[0];
    if (file) {
      let imageOverview = document.createElement('img')
      let errorSizeImage = document.createElement("p")
      if (file.size > 4 * 1024 * 1024) { 
        errorSizeImage.innerHTML = "L'image est trop volumineuse. Elle ne doit pas dépasser 4mo."
        errorSizeImage.classList.add("errorSizeImage_active")
        nameSubContainer.appendChild(errorSizeImage)
        nameSubContainer.classList.add("upload_modale_sub_container_picture_active")
        nameSubContainer.classList.remove("upload_modale_sub_container_picture_inactive")
        imageOverview.classList.remove("imageOverview")
      } else {
        let reader = new FileReader();
        reader.onload = (event) => {
          imageOverview.src = event.target.result;
          imageOverview.classList.add("imageOverview")
          nameSubContainer.classList.remove("upload_modale_sub_container_picture_active")
          nameSubContainer.classList.add("upload_modale_sub_container_picture_inactive")
          nameContainerPicture.appendChild(imageOverview);
          errorSizeImage.classList.remove("errorSizeImage_active")
          errorSizeImage.classList.add("errorSizeImage_inactive")
        };
        reader.readAsDataURL(file);
      }
    }
  })
}

// Extraits des catégories pour la partie formulaire upload dans la modale (formulaire)
async function extractCategoryModaleFORM(parentElement, nameOption){
  let blankOption = document.createElement("option");
  blankOption.value = "";
  parentElement.appendChild(blankOption);

  for (let i = 0; i < DATA_CATEGORY.length; i++) {
    console.log(DATA_CATEGORY[i].name)
    let nameOption = document.createElement("option")
    nameOption.value = DATA_CATEGORY[i].name
    nameOption.innerHTML = DATA_CATEGORY[i].name 
    nameOption.id = DATA_CATEGORY[i].id 
    parentElement.appendChild(nameOption)
  }
}

// Affiche une erreur si un input du formulaire upload est vide
function createErrorMessagesModaleTitleFORM(inputName, parent){
  let modaleForm_title_input_error = document.createElement("p")
  inputName.addEventListener("click", function(event){
    event.stopPropagation()
    if(inputName.value ===""){
      modaleForm_title_input_error.innerHTML ="Merci de compléter le champ titre."
      modaleForm_title_input_error.classList.add("modaleForm_title_input_error_active")
      modaleForm_title_input_error.classList.remove("modaleForm_title_input_error_inactive")
    } else {
      modaleForm_title_input_error.innerHTML = ""
      modaleForm_title_input_error.classList.remove("modaleForm_title_input_error_active")
      modaleForm_title_input_error.classList.add("modaleForm_title_input_error_inactive")
    }
    parent.appendChild(modaleForm_title_input_error)
  })
}
  
function createErrorMessagesModaleCategorieFORM(inputName, parent){
  let modaleForm_title_input_error = document.createElement("p")
  inputName.addEventListener("click", function(){
    if(inputName.value ===""){
      modaleForm_title_input_error.innerHTML ="Merci de sélectionner une catégorie"
      modaleForm_title_input_error.classList.add("modaleForm_title_input_error_active")
      modaleForm_title_input_error.classList.remove("modaleForm_title_input_error_inactive")
    } else {
      modaleForm_title_input_error.innerHTML = ""
      modaleForm_title_input_error.classList.remove("modaleForm_title_input_error_active")
      modaleForm_title_input_error.classList.add("modaleForm_title_input_error_inactive")
    }
    parent.appendChild(modaleForm_title_input_error)
  })
}







/* 

function errorEmptyFields(){
  const valueEmpty = updateContentForm_input.value
  if (valueEmpty === ""){
    let paragraphErrorEmptyFields = document.createElement("p")
    paragraphErrorEmptyFields.innerHTML = "Merci de compléter tous les champs !"
    paragraphErrorEmptyFields.classList.add("paragraphErrorEmptyFields")
  }
} */

















