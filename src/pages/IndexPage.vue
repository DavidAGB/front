<template>
  <q-page class="bg-gray-200">


    <div class="mx-auto max-w-8xl py-6 sm:px-6 lg:px-8">






      <q-table flat bordered ref="tableRef" :class="tableClass" tabindex="0" title="Consecutivo" :rows="listData"
        :columns="columns" row-key="name" selection="single" v-model:selected="selected" v-model:pagination="pagination"
        :filter="filter" @focusin="activateNavigation" @focusout="deactivateNavigation" @keydown="onKey">
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="search" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>



    </div>

    <q-dialog v-model="fixed" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Consecutivo</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-form @submit="saveData">
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">NOMBRE ACTIVIDAD
                    </label>
                    <div class="mt-2">
                      <q-input filled v-model="form.activity_name" label="NOMBRE ACTIVIDAD" hint="NOMBRE ACTIVIDAD"
                        lazy-rules :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese algo']" />

                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">FECHA
                    </label>
                    <div class="mt-2">
                      <q-input filled v-model="form.activity_date" readonly lazy-rules
                        :rules="[(val) => (val !== null) || 'Por favor, seleccione una fecha']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.activity_date" mask="YYYY-MM-DD HH:mm" :value="form.activity_date">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Cerrar" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                    </div>
                  </div>
                  <div class="col-span-full">
                    <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">MONITOR</label>
                    <div class="mt-2">
                      <q-select filled v-model="form.monitor_id" label="Monitor" transition-show="jump-up"
                        transition-hide="jump-up" :options="monitor_data" option-label="name" option-value="id" lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Por favor, seleccione un monitor']" />
                    </div>

                  </div>
                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">HORA INICIO
                    </label>
                    <div class="mt-2">
                      <q-input filled v-model="form.start_time" mask="time">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="form.start_time" :format24h="false">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">HORA FINAL
                    </label>
                    <div class="mt-2">
                      <q-input filled v-model="form.final_hour" mask="time" lazy-rules :rules="[finalHourRule]">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="form.final_hour" :format24h="false">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Cerrar" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Derechos culturales
                    </label>
                    <div class="mt-2">
                      <q-select label="Derechos culturales" transition-show="jump-up" transition-hide="jump-up" filled
                        v-model="form.cultural_right_id" :options="cultural_rights" style="width: 250px"
                        option-label="name" option-value="id" lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Por favor, seleccione un derecho cultural']" />
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">NAC
                    </label>
                    <div class="mt-2">
                      <q-select label="NAC" transition-show="jump-up" transition-hide="jump-up" filled
                        v-model="form.nac_id" :options="nacs_data" style="width: 250px" option-label="name"
                        option-value="id" lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Por favor, seleccione un NAC']" />

                    </div>
                  </div>

                  <div class="col-span-full">
                    <label for="street-address"
                      class="block text-sm font-medium leading-6 text-gray-900">EXPERTICIA</label>
                    <div class="mt-2">
                      <q-select filled v-model="form.expertise_id" label="EXPERTICIA" transition-show="jump-up"
                        transition-hide="jump-up" :options="expertises" option-label="name" option-value="id" lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Por favor, seleccione una expertise']" />
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
import { ref, computed, onMounted, reactive } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { useExpertises } from "../composables/useExpertises";
import { useCulturalRight } from "../composables/useCulturalRight";
import { useMonitorin } from "../composables/useMonitorin";
import { useNac } from "../composables/useNac";
import moment from 'moment-timezone';

export default {
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const fixed = ref(false);
    const persistent = ref(false);


    const { expertises } = useExpertises();
    const { cultural_rights } = useCulturalRight();
    const { monitor_data } = useMonitorin();
    const { nacs_data } = useNac();


    const currentDate = new Date().toISOString().split("T")[0];

    const currentDate2 = moment().tz('America/Bogota');
    const formattedTime = currentDate2.format('hh:mm A');

    function showErrorMessage(message) {
      $q.notify({
        type: 'negative',
        message: message
      })
    }
    function showSuccessMessage(message) {
      $q.notify({
        type: 'positive',
        message: message
      })
    }


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

    const finalHourRule = (value) => {
      // Validar que la hora final sea mayor a la hora inicial
      if (form.value.start_time && value) {
        const startTime = moment(form.value.start_time, 'hh:mm A').tz('America/Bogota');
        const finalHour = moment(value, 'hh:mm A').tz('America/Bogota');
        return finalHour.isAfter(startTime) || 'La hora final debe ser mayor a la hora inicial';
      }
      return true;
    };

    const saveData = async () => {
      try {
        if (finalHourRule(form.value.final_hour) !== true) {

          return;
        }
        if (form.value.final_hour == "") {
          showErrorMessage("Por favor, seleccione la hora final")
          return;
        }

        const params = {
          activity_name: form.value.activity_name,
          activity_date: form.value.activity_date,
          start_time: form.value.start_time,
          final_hour: form.value.final_hour,
          cultural_right_id: form.value.cultural_right_id ? form.value.cultural_right_id.id : null,
          nac_id: form.value.nac_id ? form.value.nac_id.id : null,
          expertise_id: form.value.expertise_id ? form.value.expertise_id.id : null,
          monitor_id: form.value.monitor_id ? form.value.monitor_id.id : null,
        };

        const response = await api.post('/save_consecutives_data', params);

        showSuccessMessage("Consecutiva guardada con éxito")
        fixed.value = false;
        form.value.activity_name = "";
        form.value.final_hour = "";
        form.value.cultural_right_id = null;
        form.value.nac_id = null;
        form.value.expertise_id = null;

      } catch (error) {
        showErrorMessage(error.response.data.message)
      }
    };

    const listData = ref([]);
    const search = ref('');
    const filter_monitor = ref('');
    const filter_cultural_rights = ref('');
    const filter_nac = ref('');
    const filter_expertise = ref('');


    const page = ref(0);
    const itemsPerPage = ref(0);
    const pageCount = ref(0);
    const n_page = ref(0);
    const from = ref(0);
    const to = ref(0);


    async function getDataConsecutive() {



      try {
        const params = {

          search: search.value,
          filter_monitor: filter_monitor.value,
          filter_cultural_rights: filter_cultural_rights.value,
          filter_nac: filter_nac.value,
          filter_expertise: filter_expertise.value,
        };

        const response = await api.get('/get_consecutive', { params });

        listData.value = response.data.data.data;
        page.value = response.data.data.meta.current_page;
        itemsPerPage.value = response.data.data.meta.per_page;
        pageCount.value = response.data.data.meta.total;
        n_page.value = response.data.data.meta.last_page;
        from.value = response.data.data.meta.from;
        to.value = response.data.data.meta.to;

      } catch (error) {


      }
    }


    onMounted(() => {
      getDataConsecutive();

    });


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
      listData
    };
  },
};
</script>
