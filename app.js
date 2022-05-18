console.log("Hello World");
console.log('Jimmy')

const form = document.querySelector("form");
const input = document.querySelector("#searchTerm");
const API_URL = 'http://www.omdbapi.com/?apikey=218ed628&s='
const resultsSection = document.querySelector("#results");



form.addEventListener('submit', formSubmitted);

async function formSubmitted(e) {
    e.preventDefault();
    console.log('form submitted');
    const searchTerm = input.value;
    console.log(searchTerm);
    try {
      const results = await getResults(searchTerm)
    showResults(results);
      
    } catch (error) {
      showError(error)
    }
    
}

async function getResults(searchTerm) {
    const url = `${API_URL}${searchTerm}`;
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    if(data.Error){
      throw new Error(data.Error);
    }
    console.log(data);
    const results = data.Search;
    return results;

}

function showResults(results) {
    resultsSection.innerHTML = results.reduce((html, movie) => {
        if (movie.Poster === 'N/A') {
            html += `<div class="card col-4">
          <img src="https://media.gettyimages.com/photos/americanbritish-actress-gillian-anderson-wearing-a-black-trouser-suit-picture-id1249788900?s=612x612" class="card-img-top" alt="${movie.title} width="81.33" height="123.61"">
          <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">${movie.Year}</p>
            <button type="submit" class="btn btn-danger">Watch Later</button>

          </div>
        </div>`
            return html;


        } else {
            html += `<div class="card col-4">
        <img src="${movie.Poster} " class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year}</p>
          <button data-id="${movie.imdbID}"  type="submit" class="btn btn-danger watch-later-button">Watch Later</button>

        </div>
      </div>`
        }
        return html;

    }, '');

    const watchLaterButtons = document.querySelectorAll('.watch-later-button');
    watchLaterButtons.forEach(button =>{
      button.addEventListener('click', (e) =>{
        //destructor, grab the id value of the dataset and set it equal to id
        const { id } = button.dataset;
          const movie = results.find(movie => movie.imdbID === id )
          console.log(movie);
      })
    })

   
  }
  function showError(error){
    resultsSection.innerHTML = `<div class="alert alert-danger col" role="alert">${error.message}</div>`
  }