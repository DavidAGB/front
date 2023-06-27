<template>
  <q-page class="bg-gray-200">
    <div class="mx-auto max-w-8xl py-6 sm:px-6 lg:px-8">
      <div class=" ">
        <div
          class="row no-wrap items-center q-mt-md text-white rounded-borders"
        >
          <q-space />

          <div>
            <q-btn
              color="primary"
              label="Crear registro"
              @click="fixed = true"
            />
          </div>
        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <q-input
              filled
              v-model="search"
              label="buscar"
              @update:model-value="getDataConsecutive"
            />
          </div>
          <div class="sm:col-span-3">
            <div class=" ">
              <q-select
                label="Derechos culturales"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="filter_cultural_rights"
                @update:model-value="getDataConsecutive"
                :options="[
                  {
                    id: 0,
                    name: 'Todos',
                  },
                  ...cultural_rights,
                ]"
                option-label="name"
                option-value="id"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <div class=" ">
              <q-select
                label="NAC"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="filter_nac"
                :options="[
                  {
                    id: 0,
                    name: 'Todos',
                  },
                  ...nacs_data,
                ]"
                option-label="name"
                option-value="id"
                @update:model-value="getDataConsecutive"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <div class=" ">
              <q-select
                @update:model-value="getDataConsecutive"
                filled
                v-model="filter_expertise"
                label="EXPERTICIA"
                transition-show="jump-up"
                transition-hide="jump-up"
                :options="[
                  {
                    id: 0,
                    name: 'Todos',
                  },
                  ...expertises,
                ]"
                option-label="name"
                option-value="id"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <q-input filled v-model="dateRangeText" readonly>
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="filter_date"
                      @update:model-value="getDataConsecutive"
                      range
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <q-table
          v-model:pagination="pagination"
          :rows-per-page-options="[]"
          title="Consecutivo"
          :rows="listData"
          :columns="columnsHeaders"
          class="no-shadow rounded-2xl"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="consecutivo" :props="props">
                {{ props.row.consecutivo }}
              </q-td>
              <q-td key="monitor" :props="props">
                {{ props.row.monitor.name }}
              </q-td>
              <q-td key="nac" :props="props">
                {{ props.row.cultural_rights.name }}
              </q-td>
              <q-td key="nac" :props="props">
                {{ props.row.nac.name }}
              </q-td>
              <q-td key="activity_date" :props="props">
                {{ props.row.activity_date }}
              </q-td>
              <q-td key="start_time" :props="props">
                {{ props.row.start_time }}
              </q-td>
              <q-td key="final_hour" :props="props">
                {{ props.row.final_hour }}
              </q-td>
              <q-td key="expertise" :props="props">
                {{ props.row.expertise.name }}
              </q-td>
              <q-td key="created_at" :props="props">
                {{ props.row.created_at }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog
      v-model="fixed"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Consecutivo</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form @submit="saveData">
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <div
                  class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                  <div class="sm:col-span-3">
                    <label
                      for="first-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >NOMBRE ACTIVIDAD
                    </label>
                    <div class="mt-2">
                      <q-input
                        filled
                        v-model="form.activity_name"
                        label="NOMBRE ACTIVIDAD"
                        hint="NOMBRE ACTIVIDAD"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Por favor, ingrese algo',
                        ]"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >FECHA
                    </label>
                    <div class="mt-2">
                      <q-input
                        filled
                        v-model="form.activity_date"
                        readonly
                        lazy-rules
                        :rules="[
                          (val) =>
                            val !== null || 'Por favor, seleccione una fecha',
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="form.activity_date"
                                mask="YYYY-MM-DD HH:mm"
                                :value="form.activity_date"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="col-span-full">
                    <label
                      for="street-address"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >MONITOR</label
                    >
                    <div class="mt-2">
                      <q-select
                        filled
                        v-model="form.monitor_id"
                        label="Monitor"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options="monitor_data"
                        option-label="name"
                        option-value="id"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Por favor, seleccione un monitor',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >HORA INICIO
                    </label>
                    <div class="mt-2">
                      <q-input filled v-model="form.start_time" mask="time">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="form.start_time"
                                :format24h="false"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >HORA FINAL
                    </label>
                    <div class="mt-2">
                      <q-input
                        filled
                        v-model="form.final_hour"
                        mask="time"
                        lazy-rules
                        :rules="[finalHourRule]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="form.final_hour"
                                :format24h="false"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Derechos culturales
                    </label>
                    <div class="mt-2">
                      <q-select
                        label="Derechos culturales"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        filled
                        v-model="form.cultural_right_id"
                        :options="cultural_rights"
                        style="width: 250px"
                        option-label="name"
                        option-value="id"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Por favor, seleccione un derecho cultural',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >NAC
                    </label>
                    <div class="mt-2">
                      <q-select
                        label="NAC"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        filled
                        v-model="form.nac_id"
                        :options="nacs_data"
                        style="width: 250px"
                        option-label="name"
                        option-value="id"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Por favor, seleccione un NAC',
                        ]"
                      />
                    </div>
                  </div>

                  <div class="col-span-full">
                    <label
                      for="street-address"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >EXPERTICIA</label
                    >
                    <div class="mt-2">
                      <q-select
                        filled
                        v-model="form.expertise_id"
                        label="EXPERTICIA"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        :options="expertises"
                        option-label="name"
                        option-value="id"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') ||
                            'Por favor, seleccione una expertise',
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div align="right">
              <q-btn flat label="CANCELAR" color="red" v-close-popup />
              <q-btn type="submit" flat label="GUARDAR" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, reactive, watch } from "vue";
import { api } from "boot/axios";
import moment from "moment-timezone";

import { useQuasar } from "quasar";
import { useExpertises } from "../composables/useExpertises";
import { useCulturalRight } from "../composables/useCulturalRight";
import { useMonitorin } from "../composables/useMonitorin";
import { useNac } from "../composables/useNac";

export default {
  name: "IndexPage",
  setup() {
    const $q = useQuasar();

    // Current date and time
    const currentDate = new Date().toISOString().split("T")[0];
    const currentDate2 = moment().tz("America/Bogota");
    const formattedTime = currentDate2.format("hh:mm A");

    // Use composables
    const { expertises } = useExpertises();
    const { cultural_rights } = useCulturalRight();
    const { monitor_data } = useMonitorin();
    const { nacs_data } = useNac();

    // Refs
    const fixed = ref(false);
    const persistent = ref(false);
    const form = ref({
      activity_name: "",
      activity_date: currentDate,
      start_time: formattedTime,
      final_hour: "",
      cultural_right_id: null,
      nac_id: null,
      expertise_id: null,
      monitor_id: null,
    });

    const search = ref("");
    const listData = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 30,
      rowsNumber: 0,
    });
    const filter_monitor = ref("");
    const filter_cultural_rights = ref("Todos");
    const filter_nac = ref("Todos");
    const filter_expertise = ref("Todos");

    const filter_date = ref({ from: null, to: null });
    const dateRangeText = ref("");

    watch(filter_date, (newVal) => {
      let from = newVal.from ? newVal.from : "----/--/--";
      let to = newVal.to ? newVal.to : "----/--/--";

      dateRangeText.value = `${from} / ${to}`;
    });

    // Helper functions
    function showErrorMessage(message) {
      $q.notify({
        type: "negative",
        message: message,
      });
    }

    function showSuccessMessage(message) {
      $q.notify({
        type: "positive",
        message: message,
      });
    }

    const finalHourRule = (value) => {
      // Validar que la hora final sea mayor a la hora inicial
      if (form.value.start_time && value) {
        const startTime = moment(form.value.start_time, "hh:mm A").tz(
          "America/Bogota"
        );
        const finalHour = moment(value, "hh:mm A").tz("America/Bogota");
        return (
          finalHour.isAfter(startTime) ||
          "La hora final debe ser mayor a la hora inicial"
        );
      }
      return true;
    };

    const columnsHeaders = [
      {
        name: "id",
        align: "center",
        label: "#",
        field: "id",
        sortable: true,
      },
      {
        name: "consecutivo",
        align: "center",
        label: "Consecutivo",
        field: "consecutivo",
        sortable: true,
      },
      {
        name: "monitor",
        align: "center",
        label: "Nombre",
        field: "monitor",
        sortable: true,
      },
      {
        name: "cultural_rights",
        align: "center",
        label: "Derecho cultural",
        field: "cultural_rights",
        sortable: true,
      },
      {
        name: "nac",
        align: "center",
        label: "Nac",
        field: "nac",
        sortable: true,
      },
      {
        name: "activity_date",
        align: "center",
        label: "Fecha",
        field: "activity_date",
        sortable: true,
      },
      {
        name: "start_time",
        align: "center",
        label: "Hora inicio",
        field: "start_time",
        sortable: true,
      },
      {
        name: "final_hour",
        align: "center",
        label: "Hora final",
        field: "final_hour",
        sortable: true,
      },
      {
        name: "expertise",
        align: "center",
        label: "Experticia",
        field: "expertise",
        sortable: true,
      },
      {
        name: "created_at",
        align: "center",
        label: "Fecha de carga",
        field: "created_at",
        sortable: true,
      },
    ];

    const saveData = async () => {
      try {
        if (finalHourRule(form.value.final_hour) !== true) {
          return;
        }
        if (form.value.final_hour == "") {
          showErrorMessage("Por favor, seleccione la hora final");
          return;
        }

        const params = {
          activity_name: form.value.activity_name,
          activity_date: form.value.activity_date,
          start_time: form.value.start_time,
          final_hour: form.value.final_hour,
          cultural_right_id: form.value.cultural_right_id
            ? form.value.cultural_right_id.id
            : null,
          nac_id: form.value.nac_id ? form.value.nac_id.id : null,
          expertise_id: form.value.expertise_id
            ? form.value.expertise_id.id
            : null,
          monitor_id: form.value.monitor_id ? form.value.monitor_id.id : null,
        };

        const response = await api.post("/save_consecutives_data", params);

        showSuccessMessage("Consecutiva guardada con éxito");
        getDataConsecutive();
        fixed.value = false;
        form.value.activity_name = "";
        form.value.final_hour = "";
        form.value.cultural_right_id = null;
        form.value.nac_id = null;
        form.value.expertise_id = null;
      } catch (error) {
        showErrorMessage(error.response.data.message);
      }
    };

    const getDataConsecutive = async () => {
      try {
        const params = {
          search: search.value,

          filter_monitor: filter_monitor.value ? filter_monitor.value.id : null,
          filter_cultural_rights: filter_cultural_rights.value
            ? filter_cultural_rights.value.id
            : null,
          filter_nac: filter_nac.value ? filter_nac.value.id : null,
          filter_expertise: filter_expertise.value
            ? filter_expertise.value.id
            : null,
          filter_date: filter_date.value,
        };

        const response = await api.get("/get_consecutive", { params });

        listData.value = response.data.data.data;
      } catch (error) {}
    };

    onMounted(getDataConsecutive);

    return {
      fixed,
      persistent,
      form,
      saveData,
      expertises,
      cultural_rights,
      monitor_data,
      nacs_data,
      finalHourRule,
      search,
      listData,
      pagination,
      columnsHeaders,
      getDataConsecutive,

      filter_cultural_rights,
      filter_nac,
      filter_expertise,

      filter_date,
      dateRangeText,
    };
  },
};
</script>
