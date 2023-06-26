import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  //local : http://localhost:8000/api/rooms-control
  //production :https://laravel.gbmediagroup.com/public/api/rooms-control

  baseURL: "http://localhost:8000/api/consecutives",
  headers: {
    "Content-type": "application/json",
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
