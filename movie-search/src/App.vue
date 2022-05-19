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
                        <div class="card col-4" v-for="movie in results" :key="movie.ID">
                            <template v-if="movie.Poster != 'N/A'">
                                <img :src="movie.Poster" class="card-img-top" :alt="movie.Title">
                                <div class="card-body">
                                    <h5 class="card-title">{{ movie.Title }}</h5>
                                    <p class="card-text">{{ movie.Year }}</p>
                                    <button @click="addToWatchLater(movie)" type="submit" class="btn btn-danger">Watch
                                        Later</button>
                                </div>
                            </template>
                            <template v-else-if="movie.Poster = 'N/A'">
                                <img src="https://media.gettyimages.com/photos/americanbritish-actress-gillian-anderson-wearing-a-black-trouser-suit-picture-id1249788900?s=612x612"
                                    class="card-img-top" :alt="
                                    movie.title" width="81.33" height="123.61">
                                <div class="card-body">
                                    <h5 class="card-title">{{ movie.Title }}</h5>
                                    <p class="card-text">{{ movie.Year }}</p>
                                    <button @click="addToWatchLater(movie)" type="submit" class="btn btn-danger">Watch
                                        Later</button>
                                </div>
                            </template>

                        </div>

                    </section>
                    <section class="mt-2 col-3 row">
                        <h3>Watch Later</h3>
                        <section class="row" id="watch-later">
                            <div class="card col-12" v-for="movie in watchLater" :key="movie.ID">
                                <img :src="movie.Poster" class="card-img-top" :alt="movie.Title">
                                <div class="card-body">
                                    <h5 class="card-title">{{ movie.Title }}</h5>
                                    <p class="card-text">{{ movie.Year }}</p>

                                </div>
                            </div>


                        </section>
                    </section>
                </section>
            </section>



        </main>
    </div>
</template>

<script>

const API_URL = 'http://www.omdbapi.com/?apikey=218ed628&s='

export default {
    name: 'app',
    data: () => ({
        searchTerm: '',
        results: [],
        watchLater: [],
        error: '',
    }),

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
                this.error = '',

                    this.results = data.Search;

            }
        },

        addToWatchLater(movie) {
            this.watchLater.push(movie);

        }
    }

};
</script>


<style>
.movies-area {
    justify-content: space-around;
    align-items: flex-start;
}
</style>
