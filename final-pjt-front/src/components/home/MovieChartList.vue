<template>
  <div>
    <dl class="container p-0" v-for="(movie, index) in movieList"
      :key="index">
      <dd><span class="movie-rank-idx">{{ index + 1 }}</span></dd>
      <dt>
        <router-link 
          v-if="movie.pk"
          :to="{ name: 'detail', 
          params: { movieId : movie.pk } }"
          class="text-decoration-none text-reset"
        >
          {{ movie.title }}
        </router-link>
      </dt>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'MovieChartList',
  props: {
    movieList:Array
  },
}
</script>

<style>
.container {
  align-items: center;
  display: flex;

  justify-content: space-between;

  border-bottom: 1px solid rgba(182, 182, 182, 0.3);

  /* Spacing */
  margin: 0px;
  padding: 3px 0px;
  width: 150px;
  font-size: 12px;
}

.movie-rank-idx {
  font-size: 14px;
  font-family: 'Arial';
  font-weight: bolder;
}

dl:hover {
  color: #8977ad;
}

</style>