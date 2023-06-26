import { ref } from "vue";
import { api } from "boot/axios";

const monitor_data = ref([]);

export const useMonitorin = () => {
  api.get("/get_monitor_data").then((response) => {
    monitor_data.value = response.data.data;
  });

  return { monitor_data };
};
