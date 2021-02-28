const baseUrl = 'http://localhost:3000/pups/';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#dog-bar").addEventListener('click', loadDogInfo)
    document.querySelector("#good-dog-filter").addEventListener('click', filterDogs)
    getAllDogs
})
getAllDogs()

function filterDogs(e) {
    const button = e.target;
    const changeText = button.innerText.split(" ")
    // console.log(text[text.length-1]);
    if (changeText[changeText.length-1] == "OFF") {
        changeText.pop();
        changeText.push("ON");
    } else {
        changeText.pop()
        changeText.push("OFF")
    }
    console.log(changeText);
    button.innerText = changeText.join(" ")

}

function loadDogInfo(e) {
    if (e.target.nodeName == "SPAN"){
        fetch(baseUrl+e.target.id)
             .then(res => res.json())
             .then(data => renderDog(data))
    }
}

function renderDog(puppy){

    const puppyContainer = document.querySelector("#dog-info")
    puppyContainer.innerHTML = ""

    const puppyCard = document.createElement('div');
    puppyCard.id = "dog-info"

    const puppyImg = document.createElement('img');
    puppyImg.src = puppy.image;
   
    const puppyName = document.createElement('h2');
    puppyName.innerText = puppy.name;

    const puppyIsGood = document.createElement('button');
    // puppyIsGood.className = "isGood-btn"
    puppyIsGood.addEventListener('click', () => {
        patchPuppyGoodness(puppy);
    })
    puppyIsGood.innerText = puppy.isGoodDog ? "Good Dog" : "Bad Good";

    puppyCard.append(puppyImg, puppyName, puppyIsGood);
    puppyContainer.appendChild(puppyCard)

}

function patchPuppyGoodness(pup) {
    const id = pup.id
    const isGood = !pup.isGoodDog

    fetch(baseUrl + id, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          isGoodDog: isGood
        })
    })
}

// Gets all dogs from db
function getAllDogs() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => data.forEach(dog => {
            renderDogName(dog);
        }))

}

// Displays dog
function renderDogName(dog) {
    // If filter is on, filter dogs
    // If filter is off, display all dogs


    const dogBar = document.querySelector('#dog-bar');
    
    let dogSpan = document.createElement('span')
    dogSpan.id = dog.id
    dogSpan.innerText = dog.name


    dogBar.appendChild(dogSpan)
}
   