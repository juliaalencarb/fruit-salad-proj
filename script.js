const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p')

fruitForm.addEventListener("submit", extractFruit);

let calorieCount = 0;


// fruitList.addEventListener('click', e => {
//     fruitList.remove(e.target)
//     fruitList.removeEventListener('click', e)
// })


function extractFruit(e) {
    e.preventDefault(); //prevents reloading the page when submit
    // console.log(e.target[0].value) // e = object created when the form is submitted, target can be used to access the value passe dby the user
    let fruitInput = e.target.fruitInput.value;
    if (fruitInput) {
        // addFruit(fruitInput);
        fetchFruitData(fruitInput)
    }
    // e.target.fruitInput.value = ''
    e.target.reset()
}
// }   console.log(e.target.fruitInput.value) it's supposed to do the same thing if the id didn't have a dash

function addFruit(fruit) {
    // console.log(fruit)
    // create list item
    const li = document.createElement('li');

    //asign text to list item
    li.textContent = fruit["name"];
    getCalories(fruit)
    li.addEventListener('click', removeFruit, {once: true}); //runs the event listener only once
    // li.removeEventListener('click', removeFruit);

    //append list item to the html list
    fruitList.appendChild(li);
}

function removeFruit(e) {
    e.target.remove();
}

function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        .then(resp => processResponse(resp))
        .then(data => addFruit(data))
        .catch((e) => console.log(e))
}

function getCalories(fruitData) {
    let fruitCalories = fruitData['nutritions']['calories']
    calorieCount += fruitCalories
    document.querySelector("p").innerHTML = `Calorie count: ${calorieCount}`
}

function processResponse(resp) {
    if(resp.ok) {
        return resp.json()
    }
    else {
        throw `Error: HTTP status code = ${resp.status}.`
    }
}