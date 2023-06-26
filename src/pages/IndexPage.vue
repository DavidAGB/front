<template>
  <q-page class="flex flex-center">
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
          <form>
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
                        v-model="form.activity_name.value"
                        label=" 
"
                        hint="NOMBRE ACTIVIDAD
"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Please type something',
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
                      <q-input filled v-model="date">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
                  <div class="sm:col-span-3">
                    <label
                      for="last-name"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >HORA INICIO
                    </label>
                    <div class="mt-2">
                      <q-input
                        filled
                        v-model="time"
                        mask="time"
                        :rules="['time']"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="time">
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
                        v-model="time"
                        mask="time"
                        :rules="['time']"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="time">
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CANCELAR" color="red" v-close-popup />
          <q-btn flat label="GUARDAR" color="primary" v-close-popup />
        </q-card-actions>
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

export default {
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const fixed = ref(true);
    const persistent = ref(false);

    const { expertises } = useExpertises();
    const { cultural_rights } = useCulturalRight();
    const { monitor_data } = useMonitorin();
    const { nacs_data } = useNac();

    const form = ref({
      consecutivo: "",
      activity_name: "",
      activity_date: "",
      start_time: "",
      final_hour: "",
      cultural_right_id: null,
      nac_id: null,
      expertise_id: null,
    });

    const options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);

    onMounted(() => {
      // Logic for when the component has been mounted.
    });

    // Export the reactive references to make them available in the template.
    return {
      fixed,
      persistent,
      form,
      options,
      expertises,
      cultural_rights,
      monitor_data,
      nacs_data,
    };
  },
};
</script>
