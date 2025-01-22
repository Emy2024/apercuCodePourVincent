import { fetchDataAPI, imageDelete } from "./fetchPortfolio.js";
const URL_API = "http://localhost:5678/api/works" 
const BTN_TOUSLESITEMS = document.createElement("button")
const BTN_OBJETS = document.createElement("button")
const BTN_APPARTEMENTS = document.createElement("button")
const BTN_HOTELS_RESTAURANTS = document.createElement("button")

//Mon point d'entrée
async function main(){
  let data = await fetchDataAPI(URL_API) 
  await displayGallery(data)
  await displayFilter(data)
  await initEvent(data)
}
main()

async function displayGallery(data){ 
    let galleryParent  = document.querySelector(".gallery")
    galleryParent.innerHTML=""
  
    data.forEach(item => {
      let figureGallery = document.createElement("figure")
      figureGallery.classList.add("figureGallery")
      figureGallery.id = "mainFigure_"+item.id

      let imgGallery = document.createElement("img")
      imgGallery.src = item.imageUrl
   
      let figureCaptionGallery = document.createElement("figure-caption")
      figureCaptionGallery.textContent = item.title

      galleryParent.appendChild(figureGallery)
      figureGallery.appendChild(imgGallery)
      figureGallery.appendChild(figureCaptionGallery)
    })
}  

async function displayFilter(data){
  let dataUniques = [... new Set(data.map(item => item.category.name))]
  const filtreObjet = dataUniques[0]
  const filtreAppartement = dataUniques[1]
  const filtreHotelEtRestaurant = dataUniques[2]

  let filterElement = document.querySelector(".filter")

  BTN_TOUSLESITEMS.innerText="Tous"
  
  BTN_OBJETS.innerText= filtreObjet

  BTN_APPARTEMENTS.innerText=filtreAppartement
  
  BTN_HOTELS_RESTAURANTS.innerText=filtreHotelEtRestaurant

  filterElement.appendChild(BTN_TOUSLESITEMS)
  filterElement.appendChild(BTN_OBJETS)
  filterElement.appendChild(BTN_APPARTEMENTS)
  filterElement.appendChild(BTN_HOTELS_RESTAURANTS)
}

/* function handleUndefinedValue(){
  if (BTN_HOTELS_RESTAURANTS === undefined){
    BTN_HOTELS_RESTAURANTS.innerHTML= "coucou"
  } else {
    BTN_HOTELS_RESTAURANTS.innerText=filtreHotelEtRestaurant
  }
} */


async function filter(data, filterName){
  displayGallery(data.filter(obj => obj.category.name ===filterName))
}

async function initEvent(data){
  BTN_TOUSLESITEMS.addEventListener("click", function() {
    displayGallery(data) 
  })

  BTN_OBJETS.addEventListener("click", function() {
    filter(data, "Objets")
  })

  BTN_APPARTEMENTS.addEventListener("click", function() {
    filter(data, "Appartements")
  })

  BTN_HOTELS_RESTAURANTS.addEventListener("click", function() {
    filter(data, "Hotels & restaurants")
  })
}


