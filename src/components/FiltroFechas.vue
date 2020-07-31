<template>
  <div>
    <q-list>
      <q-item>
        <q-item-section>
          <q-input dense filled v-model="fi">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyIni"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    mask="DD/MM/YYYY"
                    v-model="fi"
                    @input="() => cargarIniDate()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input dense filled v-model="ff">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyFin"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    mask="DD/MM/YYYY"
                    v-model="ff"
                    @input="() => cargarFinDate()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
export default {
  name: "FiltroFechas",
  data() {
    return {
      fi: formattedString,
      ff: formattedString
    };
  },
  methods: {
    cargarIniDate() {
      this.$refs.qDateProxyIni.hide();
      this.$emit("click", {
        fi: this.fi,
        ff: this.ff
      });
    },
    cargarFinDate() {
      this.$refs.qDateProxyFin.hide();
      this.$emit("click", {
        fi: this.fi,
        ff: this.ff
      });
    }
  },
  async created() {}
};
</script>

<style scoped></style>
