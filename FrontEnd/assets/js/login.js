const FORM = document.getElementById("formLogin")
const SUBMIT = document.getElementById("submit")

// Mon fetch
const URL_DATA_API_USERS = "http://localhost:5678/api/users/login"
const ERROR_MESSAGE_FETCH = "Identifiants invalides."
const FETCH_ID_ERROR = document.getElementById("messageErreurFetch")


// Mon point d'entrée
function main(){
  initEvents()
}
main()


// Quand je clique, il se passe ...
function initEvents(){
FORM.addEventListener("submit", function (event) {
  event.preventDefault(); 
  handleInput()
  postData()
});
}

// Fonction pour chaque input du formulaire :
function handleInput(){
  const mail_id_input = document.getElementById("email") 
  const mail_icon_class_error = document.querySelector(".inputIconMail") 
  const mail_id_error = document.getElementById("messageErreurClientEmail") 
  const mail_error_message = "Merci de renseigner un email valide."
  const mail_error_message_format = "Merci de renseigner un format d'email correct."

  const password_id_input = document.getElementById("password") 
  const password_icon_class_error = document.querySelector(".inputIconPassword")
  const password_id_error = document.getElementById("messageErreurClientPassword")
  const password_error_message = "Merci de renseigner un mot de passe valide."
  const password_error_message_too_short = "Le mot de passe doit contenir 6 caractères minimum."

  let emailValue = mail_id_input.value.trim()
  let passwordValue = password_id_input.value.trim()
  //console.log(emailValue)

  if (emailValue === ""){
    errorInput(mail_icon_class_error, mail_id_input, mail_id_error, mail_error_message)
  } else if (!isMailFormatValid(emailValue)){
    errorInput(mail_icon_class_error, mail_id_input, mail_id_error,mail_error_message_format)
  } else {
    successInput(mail_icon_class_error, mail_id_input, mail_id_error)
  }

  if (passwordValue === ""){
    errorInput(password_icon_class_error, password_id_input, password_id_error, password_error_message)
  } else if (passwordValue.length <6) {
    errorInput(password_icon_class_error, password_id_input, password_id_error, password_error_message_too_short)
  } else {
    successInput(password_icon_class_error, password_id_input, password_id_error)
  }
  return false
}


// Si j'ai une erreur :
function errorInput(icon, placeholder, idError, error){
  icon.classList.remove("hideIcon")
  placeholder.classList.add("placeholderError")
  idError.innerHTML = error
  idError.classList.add("messageErreur") 
}

// Si je n'ai pas d'erreurs :
function successInput(icon, placeholder, idError){
  icon.classList.add("hideIcon")
  placeholder.classList.remove("placeholderError")
  idError.innerHTML = ""
  idError.classList.remove("messageErreur") 
}

// Si j'ai une erreur - fetch uniquement:
function errorInputFetch(idError, error){
  idError.innerHTML = error
  idError.classList.add("messageErreurFetch") 
}


// Mon expression régulière
function isMailFormatValid(emailValue) {
  const regularExpressionPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regularExpressionPattern.test(emailValue)
} 


// Faut-il déplacer cette fonction dans mon fichier fetchPortfolio?
async function postData() {

  let retrieveDataFromForm = 
  {
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim()
  }
    // Ma charge utile que je convertis en JSON :
  const payload = JSON.stringify(retrieveDataFromForm)

  fetch(URL_DATA_API_USERS, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload, 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP :  ${response.status}`)
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    localStorage.setItem("token", data.token)
    window.open("index.html","_self")
  })
  .catch(error => {
    console.error("Erreur", error)
    errorInputFetch(FETCH_ID_ERROR, ERROR_MESSAGE_FETCH)
  })   
}




