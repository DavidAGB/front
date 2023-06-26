import { ref } from "vue";
import { api } from "boot/axios";

const expertises = ref([]);

export const useExpertises = () => {
  api.get("/get_expertises").then((response) => {
    expertises.value = response.data.data;
  });

  return { expertises };
};
