console.log("Hello World");
console.log('Jimmy')

const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const API_URL = 'http://www.omdbapi.com/?apikey=218ed628&s='

const state = {
searchTerm: '',
results: [],
watchLater: [] 

};

input.addEventListener('keyup', () =>{
    state.searchTerm = input.value;
    console.log(state)
})

const resultsSection = document.querySelector("#results");
const watchLaterSection = document.querySelector("#watch-later");



form.addEventListener('submit', formSubmitted);

async function formSubmitted(e) {
    e.preventDefault();
    console.log('form submitted');
    // const searchTerm = input.value;
    try {
      state.results = await getResults(state.searchTerm)
    showResults();
      
    } catch (error) {
      showError(error)
    }
    
}

async function getResults(searchTerm) {
    const url = `${API_URL}${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.Error){
      throw new Error(data.Error);
    }
    const results = data.Search;
    return results;

}

function showResults() {
    resultsSection.innerHTML = state.results.reduce((html, movie) => {
           
          return html + getMovieTemplate(movie, 4);
        

    }, '');

    addButtonListeners();
}

    function addButtonListeners(){
        const watchLaterButtons = document.querySelectorAll('.watch-later-button');
    watchLaterButtons.forEach(button =>{
      button.addEventListener('click', buttonClicked);
    });
    }

    function buttonClicked(e) {
        //destructure, grab the id value of the dataset and set it equal to id
        const { id } = e.target.dataset;
          const movie = state.results.find(movie => movie.imdbID === id );
          state.watchLater.push(movie);
          updateWatchLaterSection();
        //   watchLaterSection.innerHTML = watchLaterSection.innerHTML + getMovieTemplate(movie, 12, false)
        }
        function updateWatchLaterSection(){
           watchLaterSection.innerHTML = state.watchLater.reduce((html, movie) => {
           
                return html + getMovieTemplate(movie, 12, false);

        },'')};

    function getMovieTemplate(movie, cols, button = true){

      if(movie.Poster === 'N/A') {
        return `<div class="card col-${cols}">
      <img src="https://media.gettyimages.com/photos/americanbritish-actress-gillian-anderson-wearing-a-black-trouser-suit-picture-id1249788900?s=612x612" class="card-img-top" alt="${movie.title} width="81.33" height="123.61"">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        ${button ? `<button data-id="${movie.imdbID}"  type="submit" class="btn btn-danger watch-later-button">Watch Later</button>`: ''}

      </div>
    </div>`


    } else {
        
      return `
      <div class="card col-${cols}">
      <img src="${movie.Poster} " class="card-img-top" alt="${movie.title}">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        ${button ? `<button data-id="${movie.imdbID}"  type="submit" class="btn btn-danger watch-later-button">Watch Later</button>`: ''}

      </div>
    </div>`;
    }




      
    }


   
  
  function showError(error){
    resultsSection.innerHTML = `<div class="alert alert-danger col" role="alert">${error.message}</div>`
  }