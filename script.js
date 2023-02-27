const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p')
const apiKey = "api-key"

fruitForm.addEventListener("submit", getFruit);

let calorieCount = 0;


// fruitList.addEventListener('click', e => {
//     fruitList.remove(e.target)
//     fruitList.removeEventListener('click', e)
// })

async function fetchFruitData(fruitName) { //creating a asynchronous function
    try {
        const resp = await fetch(`https://fruity-api.onrender.com/fruits/${fruitName}`) //needs to be paired with await
        if (resp.ok) {
            const data = await resp.json()
            addFruit(data)
        }

        else {
            throw `Error: HTTP status code = ${resp.status}.`
        }
    }

    catch(e) {
        console.log(e)
    }

}

async function fetchFruitImage(fruitName) { //creating a asynchronous function
    try {
        const resp = await fetch(`https://pixabay.com/api/?q=${fruitName}+fruit&key=${apiKey}`) //needs to be paired with await
        if (resp.ok) {
            const data = await resp.json()
            let fruitImageURL = data["hits"][0]["previewURL"]
            addFruitPicture(fruitImageURL)
        }

        else {
            throw `Error: HTTP status code = ${resp.status}.`
        }
    }

    catch(e) {
        console.log(e)
    }

}

function getFruit(e) {
    e.preventDefault(); //prevents reloading the page when submit
    // console.log(e.target[0].value) // e = object created when the form is submitted, target can be used to access the value passe dby the user
    let fruitInput = e.target.fruitInput.value;
    if (fruitInput) {
        // addFruit(fruitInput);
        fetchFruitData(fruitInput)
        fetchFruitImage(fruitInput)
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
    li.addEventListener('click', (e) => {
        removeFruit(e), 
        updateCalories(fruit)}, 
        {once: true}); //runs the event listener only once
    // li.removeEventListener('click', removeFruit);

    //append list item to the html list
    fruitList.appendChild(li);
}

function getCalories(fruitData) {
    let fruitCalories = fruitData['nutritions']['calories']
    calorieCount += fruitCalories
    document.querySelector("p").innerHTML = `Calorie count: ${calorieCount}`
}

function removeFruit(e) {
    e.target.remove();
}

function updateCalories(fruitData) {
    let fruitCalories = fruitData['nutritions']['calories']
    calorieCount -= fruitCalories
    document.querySelector("p").innerHTML = `Calorie count: ${calorieCount}`
}

function addFruitPicture(fruitImageURL) {
    try {
        let currentImg = document.querySelector('#nutritionSection img')
        currentImg.src = fruitImageURL
    }

    catch {
        const img = document.createElement('img');
        console.log(fruitImageURL)
        img.src = fruitImageURL;
        document.getElementById('nutritionSection').appendChild(img);
    }
    
}

// function fetchFruitData(fruit) {
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(resp => processResponse(resp))
//         .then(data => addFruit(data))
//         .catch((e) => console.log(e))
// }

// function processResponse(resp) {
//     if(resp.ok) {
//         return resp.json()
//     }
//     else {
//         throw `Error: HTTP status code = ${resp.status}.`
//     }
// }

