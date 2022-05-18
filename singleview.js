console.log("Hello World");
console.log('Jimmy')
const app = document.querySelector('#app');
const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const API_URL = 'http://www.omdbapi.com/?apikey=218ed628&s=';
const resultsSection = document.querySelector("#results");
const watchLaterSection = document.querySelector("#watch-later");

let state = {
searchTerm: '',
results: [],
watchLater: [] ,
error: '',

};

render(state)

function setState(newStateValues){
    state = {...state, ...newStateValues};
    render(state)

}

input.addEventListener('keyup', () =>{
    state.searchTerm = input.value;
    console.log(state)
})




form.addEventListener('submit', formSubmitted);

async function formSubmitted(e) {
    e.preventDefault();
    console.log('form submitted');
    // const searchTerm = input.value;
    try {
      const results = await getResults(state.searchTerm)
      setState({
          results,
          error:'',

      })      
    } catch (error) {
        setState({
            results: [],
            error:error.message,
  
        })      
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


    function buttonClicked(event) {
        //destructure, grab the id value of the dataset and set it equal to id
        const { id } = event.target.dataset;
          const movie = state.results.find(movies => movies.imdbID === id );
          setState({
              watchLater:[...state.watchLater, movie]
          });
        }

    function getMovieTemplate(movie, cols, button = true){

      if(movie.Poster === 'N/A') {
        return `<div class="card col-${cols}">
      <img src="https://media.gettyimages.com/photos/americanbritish-actress-gillian-anderson-wearing-a-black-trouser-suit-picture-id1249788900?s=612x612" class="card-img-top" alt="${movie.title} width="81.33" height="123.61"">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        ${button ? `<button onclick="buttonClicked(event)" data-id="${movie.imdbID}"  type="submit" class="btn btn-danger watch-later-button">Watch Later</button>`: ''}

      </div>
    </div>`


    } else {
        
      return `
      <div class="card col-${cols}">
      <img src="${movie.Poster} " class="card-img-top" alt="${movie.title}">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        ${button ? `<button onclick="buttonClicked(event)" data-id="${movie.imdbID}"  type="submit" class="btn btn-danger watch-later-button">Watch Later</button>`: ''}

      </div>
    </div>`;
    }




      
    }


   
  
  function showError(error){
    resultsSection.innerHTML = ``
  }

  function render(state){
      app.innerHTML= `
      
      <section class="row movies-area">
            <section class="mt-2 col-9 row" id="results">
                ${
                    !state.error ?
                    state.results.reduce((html, movie) => {
           
                    return html + getMovieTemplate(movie, 4);
                  
          
                 }, '')
                 : `<div class="alert alert-danger col" role="alert">${state.error}</div>`
                 }

            </section>
            <section class="mt-2 col-3 row">
                <h3>Watch Later</h3>
                <section class="row" id="watch-later">

                ${state.watchLater.reduce((html, movie) => {
           
                    return html + getMovieTemplate(movie, 12, false);
                  
          
                 }, '')
                 }
                </section>
        </section>    
     </section>
      
      `


  }