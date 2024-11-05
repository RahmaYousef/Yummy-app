/// <reference types="../@types/jquery" />

let displayMeal = document.getElementById("displayMeal");
let searchInput = document.getElementById("search");
let submit;

function validationInputs() {
  if (
    validationName() &&
    validationEmail() &&
    validationAge() &&
    validationPhone() &&
    validationPassword() &&
    validationRepassword()
  ) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", true);
  }
}
function validationName() {
  var regex = /^[a-zA-Z]+$/;
  var myString = nameInput.value;

  if (regex.test(myString)) {
    document.getElementById("nameAlert").classList.replace("d-block", "d-none");

    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");

    return true;
  } else {
    document.getElementById("nameAlert").classList.replace("d-none", "d-block");

    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");

    return false;
  }
}
function validationEmail() {
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var myString = emailInput.value;

  if (regex.test(myString)) {
    document
      .getElementById("emailAlert")
      .classList.replace("d-block", "d-none");

    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");

    return true;
  } else {
    document
      .getElementById("emailAlert")
      .classList.replace("d-none", "d-block");

    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");

    return false;
  }
}
function validationPhone() {
  var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  var myString = ageInput.value;

  if (regex.test(myString)) {
    document.getElementById("ageAlert").classList.replace("d-block", "d-none");

    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");

    return true;
  } else {
    document.getElementById("ageAlert").classList.replace("d-none", "d-block");

    ageInput.classList.add("is-invalid");
    ageInput.classList.remove("is-valid");

    return false;
  }
}
function validationAge() {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  var myString = phoneInput.value;

  if (regex.test(myString)) {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-block", "d-none");

    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");

    return true;
  } else {
    document
      .getElementById("phoneAlert")
      .classList.replace("d-none", "d-block");

    phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");

    return false;
  }
}
function validationPassword() {
  var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  var myString = passwordInput.value;

  if (regex.test(myString)) {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-block", "d-none");

    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");

    return true;
  } else {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-none", "d-block");

    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");

    return false;
  }
}
function validationRepassword() {
  if (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  ) {
    document
      .getElementById("repasswordAlert")
      .classList.replace("d-block", "d-none");

    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");

    return true;
  } else {
    document
      .getElementById("repasswordAlert")
      .classList.replace("d-none", "d-block");

    repasswordInput.classList.add("is-invalid");
    repasswordInput.classList.remove("is-valid");

    return false;
  }
}

function openNav() {
  $(".side-nav").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  $(".nav-links li").eq(0).animate({ top: 0 }, 500);
  $(".nav-links li").eq(1).animate({ top: 0 }, 600);
  $(".nav-links li").eq(2).animate({ top: 0 }, 700);
  $(".nav-links li").eq(3).animate({ top: 0 }, 800);
  $(".nav-links li").eq(4).animate({ top: 0 }, 900);
}

function closeNav() {
  let navWidth = $(".nav-tab").outerWidth();

  $(".side-nav").animate({ left: -navWidth }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".nav-links li").animate({ top: 300 }, 500);
}
closeNav();

$(".side-nav i.open-close-icon").on("click", function () {
  if ($(".side-nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

function display(meal) {
  let cartona = "";
  for (let i = 0; i < meal.length; i++) {
    cartona += `  <div class="col-md-3">
          <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-1 cursor-pointer">
            <img class="w-100" src="${meal[i].strMealThumb}" alt="" >
            <div class="meal-layer position-absolute d-flex align-items-center text-black">
                <h3>${meal[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
  }
  displayMeal.innerHTML = cartona;
}
async function getCategories() {
  $(".innerLoadingScreen").fadeIn(500);
  searchInput.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".innerLoadingScreen").fadeOut(500);
}

$(".categories").on("click", function () {
  getCategories();
});
function displayCategories(categ) {
  let cartona = "";
  for (let i = 0; i < categ.length; i++) {
    cartona += `  <div class="col-md-3">
          <div onclick="getCategoriesMeal('${categ[i].strCategory}')" class="meal position-relative overflow-hidden rounded-1 cursor-pointer categ">
            <img class="w-100" src="${categ[i].strCategoryThumb}" alt="" >
            <div class="meal-layer position-absolute text-center text-black">
                <h3>${categ[i].strCategory}</h3>
                <p>${categ[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>`;
  }
  displayMeal.innerHTML = cartona;
}
async function area() {
  $(".innerLoadingScreen").fadeIn(500);

  searchInput.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();

  displayArea(response.meals);
  $(".innerLoadingScreen").fadeOut(500);
}

$(".area").on("click", function () {
  area();
});
function displayArea(area) {
  let cartona = "";
  for (let i = 0; i < area.length; i++) {
    cartona += `  <div class="col-md-3">
          <div onclick="getAreaMeal('${area[i].strArea}')" class=" rounded-1 text-center cursor-pointer ">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area[i].strArea}</h3>
                
        
          </div>
        </div>`;
  }
  displayMeal.innerHTML = cartona;
}
async function integ() {
  $(".innerLoadingScreen").fadeIn(500);

  searchInput.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();

  displayInteg(response.meals);
  $(".innerLoadingScreen").fadeOut(500);
}

$(".integ").on("click", function () {
  integ();
});
function displayInteg(integ) {
  let cartona = "";
  for (let i = 0; i < integ.length; i++) {
    cartona += `  <div class="col-md-3">
          <div onclick="getIngrdMeal('${integ[i].strIngredient}')" class=" rounded-1 text-center cursor-pointer">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>              
          <h3>${integ[i].strIngredient}</h3>
                <p>${integ[i].strDescription}</p>

        
          </div>
        </div>`;
  }
  displayMeal.innerHTML = cartona;
}
async function getCategoriesMeal(category) {
  $(".innerLoadingScreen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  display(response.meals);
  $(".innerLoadingScreen").fadeOut(500);
}
async function getAreaMeal(area) {
  $(".innerLoadingScreen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  display(response.meals);
  $(".innerLoadingScreen").fadeOut(500);
}
async function getIngrdMeal(ingred) {
  $(".innerLoadingScreen").fadeIn(500);

  searchInput.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  response = await response.json();
  display(response.meals);
  $(".innerLoadingScreen").fadeOut(500);
}
async function getMealDetails(mealId) {
  $(".innerLoadingScreen").fadeIn(500);

  searchInput.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  displayMealDetails(response.meals[0]);
  $(".innerLoadingScreen").fadeOut(500);
}
function displayMealDetails(meals) {
  searchInput.innerHTML = "";

  let Ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meals[`strIngredient${i}`]) {
      Ingredients += `<li class="alert alert-info m-1 p-1">${
        meals[`strMeasure${i}`]
      } ${meals[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meals.strTags?.split(",");
  if (!tags) tags = [];
  let tagsS = "";
  for (let i = 0; i < tags.length; i++) {
    tagsS += `<li class="alert alert-danger m-1 p-1">${tags[i]}</li>`;
  }
  let cartona = ` <div class="col-md-4">
        <img class="w-100 rounded-2" src="${meals.strMealThumb}" alt="" >
        <h2>${meals.strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instruction</h2>
        <p>${meals.strInstructions}</p>
        <h4 class="fw-bolder">Area: <span class="lead">${meals.strArea}</span></h4>
        <h4 class="fw-bolder">Category: <span class="lead">${meals.strCategory}</span></h4>
        <h4 class="fw-bolder">Recipes:</h4>
        <ul class="list-unstyled d-flex flex-wrap g-3">
            ${Ingredients}
            
            
        </ul>
        <h4 class="fw-bolder">Tags:</h4>
        <ul class="list-unstyled d-flex flex-wrap g-3">
           ${tagsS}
        </ul>
        <a target="_blank" href="${meals.strSource}" class="btn btn-success" >Source</a>
        <a target="_blank" href="${meals.strYoutube}" class="btn btn-danger" >Youtube</a>
      </div>
     `;
  displayMeal.innerHTML = cartona;
}
$(".search").on("click", function () {
  search();
});
function search() {
  searchInput.innerHTML = `<div class="col-md-6">
                <input type="text" onkeyup="searchByName(this.value)" class="form-control w-75 sear bg-transparent text-white" placeholder="Search By Name" aria-label="Username" aria-describedby="basic-addon1">
    
            </div>
            <div class="col-md-6">
                <input type="text" onkeyup="searchByFirstLetter(this.value)"maxlength="1" class="form-control w-75 sear bg-transparent text-white" placeholder="Search By First Letter" aria-label="Username" aria-describedby="basic-addon1">
    
            </div>`;
  displayMeal.innerHTML = "";
}
async function searchByName(term) {
  $(".innerLoadingScreen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? display(response.meals) : display([]);
  $(".innerLoadingScreen").fadeOut(500);
}
async function searchByFirstLetter(term) {
  $(".innerLoadingScreen").fadeIn(500);

  term == "" ? (term = "r") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? display(response.meals) : display([]);
  $(".innerLoadingScreen").fadeOut(500);
}
$(".contact").on("click", function () {
  contact();
});
function contact() {
  displayMeal.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
<div class="row g-4">
    <div class="col-md-6">
        <input id="nameInput" onkeyup="validationInputs()" type="text" class="form-control " placeholder="Enter Your Name" aria-label="Username" aria-describedby="basic-addon1">
        <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
        Special characters and numbers not allowed

        </div>

    </div>
    <div class="col-md-6">
        <input id="emailInput"  onkeyup="validationInputs()" type="text" class="form-control " placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1">
<div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
Email not valid *exemple@yyy.zzz

</div>

    </div>
    <div class="col-md-6">
        <input id="phoneInput" onkeyup="validationInputs()" type="text" class="form-control " placeholder="Enter Your Phone" aria-label="Username" aria-describedby="basic-addon1">
<div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
Enter valid Phone Number

</div>

    </div>
    <div class="col-md-6">
        <input id="ageInput"  onkeyup="validationInputs()" type="text" class="form-control" placeholder="Enter Your Age" aria-label="Username" aria-describedby="basic-addon1">
<div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
Enter valid age

</div>

    </div>
    <div class="col-md-6">
        <input id="passwordInput" onkeyup="validationInputs()" type="text" class="form-control " placeholder="Enter Your Password" aria-label="Username" aria-describedby="basic-addon1">
<div class="alert alert-danger w-100 mt-2 d-none" id="passwordAlert">
Enter valid password *Minimum eight characters, at least one letter and one number:*

</div>

    </div>
    <div class="col-md-6">
        <input id="repasswordInput"  onkeyup="validationInputs()" type="text" class="form-control " placeholder="Repassword" aria-label="Username" aria-describedby="basic-addon1">
<div class="alert alert-danger w-100 mt-2 d-none" id="repasswordAlert">
Enter valid repassword
</div>

    </div>
</div>
<button id="submit" disabled class="btn btn-outline-danger mt-3 px-2">Submit</button>
    </div>
</div>`;
  submit = document.getElementById("submit");
}

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loadingScreen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
