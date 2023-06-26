import { ref } from "vue";
import { api } from "boot/axios";

const cultural_rights = ref([]);

export const useCulturalRight = () => {
  api.get("/get_cultural").then((response) => {
    cultural_rights.value = response.data.data;
  });

  return { cultural_rights };
};

/*
get_monitor_data
get_nacs
 
 
*/
