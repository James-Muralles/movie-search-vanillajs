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
            <form @submit.prevent="getResults">


                <fieldset class="form-group">

                    <label for="searchTerm">Search </label>
                    <input v-model="searchTerm" type="text" name="search" id="searchTerm" class="form-control"
                        placeholder="Enter a movie title">

                </fieldset>
                <button type="submit" class="btn btn-primary">Go</button>

            </form>

            <section>
                <section class="row movies-area">
                    <section class="mt-2 col-9 row" id="results">
                        <div v-if="error" class="alert alert-danger col" role="alert">{{ error }}</div>
                        <MovieCom v-for="movie in results" :movie="movie" :key="movie.imdbID"
                            :addToWatchLater="addToWatchLater"
                            :isInWatchLater="isInWatchLater">
                        </MovieCom>

                    </section>
                    <section class="mt-2 col-3 row">
                        <h3>Watch Later</h3>
                        <section class="row" id="watch-later">
                            <MovieCom 
                            class="col-12" 
                            :key="movie.imdbID"
                            v-for="movie in watchLater" 
                            :removeWatchLater="removeWatchLater"
                            :movie="movie">
                            </MovieCom>


                        </section>
                    </section>
                </section>
            </section>



        </main>
    </div>
</template>

<script>

import MovieCom from '@/components/MovieCom';

const API_URL = 'http://www.omdbapi.com/?apikey=218ed628&s='

export default {
    name: 'app',
    data: () => ({
        searchTerm: '',
        results: [],
        watchLater: [],
        error: '',


    }),


    components: {
        MovieCom,
    },

    methods: {
        async getResults() {
            const url = `${API_URL}${this.searchTerm}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.Error) {
                this.results = [];
                this.error = data.Error;

            } else {
                this.results = data.SearchedResults;
                this.error = '';
                this.results = data.Search;

            }
        },

        addToWatchLater(movie) {
            this.watchLater.push(movie);

        },

        isInWatchLater(movie){
            return this.watchLater.some(wl => wl.imdbID === movie.imdbID)
        },

    removeWatchLater(movie){
        const index = this.watchLater.indexOf(movie)
        this.watchLater.splice(index, 1)
    }
    },

};
</script>


<style>
.movies-area {
    justify-content: space-around;
    align-items: flex-start;
}
</style>
