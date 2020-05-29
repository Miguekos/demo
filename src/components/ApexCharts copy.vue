<template>
  <!-- <div class="echarts"> -->
  <div id="chart" class="q-pt-md">
    {{info}}
    <apex-chart type="bar" height="240" :options="chartOptions" :series="series"></apex-chart>
    <!-- {{getClienteReport.graficDate}} -->
    <!-- {{getClienteReport}} -->
    <!-- {{ getClienteReport.graficDate }} -->
    <!-- {{series}}
    {{chartOptions.xaxis.categories}} -->
  </div>
</template>
<script type="text/babel">
import { mapGetters, mapActions, mapState } from "vuex";
// import VueApexCharts from "boot/vueApexCharts";
export default {
  props: ["info"],
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "top",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        colors: ["#3f51b5", "#f44336"],
        xaxis: {
          type: 'String'
        },
        legend: {
          position: "top",
          offsetY: 10
        },
        fill: {
          opacity: 1
        }
      }
    };
  },
  computed: {
    ...mapGetters("client", ["getClienteReport", "getClientes"])
  },
  methods: {
    ...mapActions("client", ["callClienteReport", "callCliente"])
  },
  async created() {
    await this.callClienteReport();
    // setTimeout(() => {
    // this.$q.loading.show();
    this.series = [
      {
        name: "Personas sanas",
        data: this.getClienteReport.graficSeriaS
      },
      {
        name: "Personas con síntomas",
        data: this.getClienteReport.graficSeriaCS
      }
    ];
    // this.series[0].data = this.getClienteReport.graficSeriaS;
    // this.series[1].data = this.getClienteReport.graficSeriaCS;


    this.chartOptions.xaxis = {
      type: "String",
      categories: this.getClienteReport.graficDate
    };
    // this.$q.loading.hide();
    // }, 3000);
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
