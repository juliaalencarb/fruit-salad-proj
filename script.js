const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');

fruitForm.addEventListener("submit", extractFruit);


// fruitList.addEventListener('click', e => {
//     fruitList.remove(e.target)
//     fruitList.removeEventListener('click', e)
// })


function extractFruit(e) {
    e.preventDefault(); //prevents reloading the page when submit
    // console.log(e.target[0].value) // e = object created when the form is submitted, target can be used to access the value passe dby the user
    let fruitInput = e.target.fruitInput.value;
    if (fruitInput) {
        addFruit(fruitInput);
    }
    // e.target.fruitInput.value = ''
    e.target.reset()
}
// }   console.log(e.target.fruitInput.value) it's supposed to do the same thing if the id didn't have a dash

function addFruit(fruit) {
    // create list item
    const li = document.createElement('li');

    //asign text to list item
    li.textContent = fruit;
    li.addEventListener('click', removeFruit, {once: true}); //runs the event listener only once
    // li.removeEventListener('click', removeFruit);

    //append list item to the html list
    fruitList.appendChild(li);
}

function removeFruit(e) {
    e.target.remove();
}