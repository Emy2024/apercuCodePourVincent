let API_URL_WORKS = "http://localhost:5678/api/works" 
let API_URL_CATEGORIES = "http://localhost:5678/api/categories" 


export async function fetchDataAPI() {
  try {
    const response = await fetch(API_URL_WORKS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Erreur lors du fetch :", error.message);
    return []; 
  }
}


// Fetch pour récupérer les catégories uniques pour la modale
export async function fetchCategoryAPI() {
  try {
    const response = await fetch(API_URL_CATEGORIES);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } 
  catch (error) {
    console.error("Erreur lors du fetch :", error.message);
    return []; 
  }
}




// Fetch delete pour supprimer les images présentes dans l'API
export async function imageDelete(id, container) {
  fetch (`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
     headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('token'),
    } 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP :  ${response.status}`)
    }
  })
  .then(data => {
    console.log(data)
    container.remove()
    console.log(`L'image numéro ${id} a été supprimée`)
  })
  .catch(error => {
    console.log(`L'image numéro ${id} n'a pas été supprimée`, error)
  }) 
}


// Fetch post pour ajouter de nouvelles images dans l'API
export async function sendNewImageInformation() {
  let modaleMainButton = document.getElementById("modaleMainButton")
  modaleMainButton.addEventListener("submit", function (event) {
  event.preventDefault();

  let newImage = {
/*     id: parseInt(event.target.querySelector("[name=id]").value), */
    title: event.target.querySelector("[name=titlePicture]").value,
/*     category: parseInt(event.target.querySelector("[name=utilisateur]").value), */
    image: event.target.querySelector("[name=picture]").value,
  }

  let chargeUtile = JSON.stringify(newImage);

  fetch (`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Authorization': 'Bearer '+ localStorage.getItem('token'),
    },
    body: chargeUtile
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP :  ${response.status}`)
    }
  })
  .then(data => {
    console.log(data)
  }) 
  })
}
