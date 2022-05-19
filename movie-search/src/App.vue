<template>
  <div id="app">
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex ">
            <div class="container-fluid justify-content-center">
                <a class="navbar-brand" href="#">Movie Search</a>
            </div>
        </nav>
    </header>
    <main class="container mt-2">
        <form>


            <fieldset class="form-group">

                <label for="searchTerm">Search </label>
                <input type="text" name="search" id="searchTerm" class="form-control" placeholder="Enter a movie title">

            </fieldset>
            <button type="submit" class="btn btn-primary">Go</button>

        </form>

        <!-- <section>
<section class="row movies-area">
            <section class="mt-2 col-9 row" id="results">
                ${
                    !state.error ?
                    state.results.reduce((html, movie) => {
           
                    return html + getMovieTemplate(movie, 4);
                  
          
                 }, '')
                 : `<div class="alert alert-danger col" role="alert">${state.error}</div>`
                 }

            </section> -->
            <!-- <section class="mt-2 col-3 row">
                <h3>Watch Later</h3>
                <section class="row" id="watch-later">

                ${state.watchLater.reduce((html, movie) => {
           
                    return html + getMovieTemplate(movie, 12, false);
                  
          
                 }, '')
                 }
                </section> -->
        <!-- </section>    
     </section> -->
            
       
        
    </main>
    </div>
</template>

<script>


export default {
  name: 'app',

}
</script>

<style>
.movies-area{
  justify-content:space-around;
   align-items: flex-start;
   }
        
</style>
