<template lang="html">

    <div class="card col-4">

        <template v-if="movie.Poster !== 'N/A'">
            <img :src="movie.Poster" class="card-img-top" :alt="movie.Title">
        </template>
        <template v-else-if="movie.Poster === 'N/A'">
            <img src="https://media.gettyimages.com/photos/americanbritish-actress-gillian-anderson-wearing-a-black-trouser-suit-picture-id1249788900?s=612x612"
                class="card-img-top" :alt="movie.Title">
        </template>
        <div class="card-body">
            <h5 class="card-title">{{ movie.Title }}</h5>
            <p class="card-text">{{ movie.Year }}</p>
            <button 
            v-if="addToWatchLater && !isInWatchLater(movie)" 
            @click="addToWatchLater(movie)"
             type="button"
                class="btn btn-success">Watch
                Later</button>
            <button 
            v-if="removeWatchLater" 
            @click="removeWatchLater(movie)" 
            type="button"
            class="btn btn-danger">Remove</button>
        </div>


    </div>

</template>


<script>
export default {
  props: ['movie', 'addToWatchLater', 'isInWatchLater', 'removeWatchLater'],
};
</script>