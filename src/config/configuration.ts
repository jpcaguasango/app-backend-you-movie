export default () => ({
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION
  },
  theMovieDB: {
    baserURLApi: process.env.THE_MOVIE_BASE_URL_API,
    bearerToken: process.env.THE_MOVIE_BEARER_TOKEN
  }
});
