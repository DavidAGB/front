import { ref } from "vue";
import { api } from "boot/axios";

const nacs_data = ref([]);

export const useNac = () => {
  api.get("/get_nacs").then((response) => {
    nacs_data.value = response.data.data;
  });

  return { nacs_data };
};
