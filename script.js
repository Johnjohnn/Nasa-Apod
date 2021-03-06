const resultsNav = document.getElementById('resultsNav');
const favoritesNava = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API 
const count = 10;
const apiKey = 'DEMO_KEY'
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = []; 
let Faborites = {};

function showContent () {
    loader.classList.add('hidden')
    window.scrollTo({ top:0, behavior: 'instant'});
}

function createDOMNodes() {
    const currentArray= page === ' results'? resultsArray :Object.values(Faborites);
    currentArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Create a Link 
        const link = document.createElement('a');
        link.href= result.hdurl;
        link.title= 'View Full Image';
        link.target = "_blank";
        // Image
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = "NASA Picture of the Day";
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card Body 
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Save Text 
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results'){
            saveText.textContent = 'Remove  Faborites';
        saveText.setAttribute('onclick',`removeFaborite('${result.url}')` );
        }
        // Card Text 
        const CardText = document.createElement('p');
        CardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Date 
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent= `${copyrightResult}`
        //Append
        footer.append(date,copyright);
        cardBody.append(cardTitle, saveText,CardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    })
}
 
function updateDOM(page) {
// Get Faborites from localstorage
if (localStorage.getItem('nasaFaborite')) {
    favorites = JSON.parse(localStorage.getItem('nasaFaborites'))
}    
   imagesContainer.textContent = "";
    createDOMNodes(page);
    showContent();
}
// Get 10 image from NASA API 
 
async function getNasaPictures () {
    // S
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
      
        updateDOM('results');

    } catch (error){
     // Catch Error
    }
}

// Add result to faborites
function saveFaborite (itemUrl) {
// Loop through Results Array to select Faborite
resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !Faborites[itemUrl]) {
        Faborites [itemUrl] = item;
        // show save confirmation for 2 seconds 
        saveConfirmed.hidden = false;
        setTimeout(() => {
            saveConfirmed.hidden = true;
        }, 2000);
        // Set Faborites in localstorage 
        localStorage.setItem('nasaFaborites', JSON.stringify(Faborites));
    }
})

 }

// Remove itm from Faborites 
function removeFaborite(itemUrl) {
    if (faborites[itemUrl]) {
       delete faborites[itemUrl];
      // Set Faborites in localStorage
        localStorage.setItem('nasaFaborites', JSON.stringify(Faborites));  
        updateDOM('faborites');
    }
}
// On load 
//getNasaPictures();