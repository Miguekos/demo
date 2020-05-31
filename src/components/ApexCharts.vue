<template>
  <!-- <div class="echarts"> -->
  <div id="chart" class="q-pt-md">
    <!-- {{chartOptions.xaxis.categories}}
    {{series[0].data}}
    {{series[1].data}}-->
    <apex-chart type="bar" height="240" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>
<script type="text/babel">
import { mapGetters, mapActions, mapState } from "vuex";
// import VueApexCharts from "boot/vueApexCharts";
export default {
  props: ["info"],
  computed: {
    ...mapGetters("client", ["getClienteReport", "getClientes"])
  },
  data: () => ({
    loading: false,
    series: [
      {
        name: "Personal sanos",
        // data: this.$store.state.client.ClienteReport.graficSeriaS
        data: [0, 0, 0, 0, 0, 0]
      },
      {
        name: "Personal con síntomas",
        // data: this.$store.state.client.ClienteReport.graficSeriaCS
        data: [0, 0, 0, 0, 0, 0]
      }
    ],
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
        categories: [0, 0, 0, 0, 0, 0]
      },
      legend: {
        position: "top",
        offsetY: 10
      },
      fill: {
        opacity: 1
      }
    }
  }),
  methods: {
    ...mapActions("client", ["callClienteReport", "callCliente"]),
    updateSeries(e, f) {
      this.series = [
        {
          data: e
        },
        {
          data: f
        }
      ];
    },
    updateCharts(e) {
      // console.log(e);
      this.chartOptions = {
        xaxis: {
          categories: e
        }
      };
    }
  },
  mounted() {
    // console.log("se ejecuto mount");
  },
  async created() {
    // console.log("se ejecuto create");
    // console.log(this.series[0].data);
    await this.callClienteReport();
    // setTimeout(() => {
    // this.chartOptions.xaxis.categories = this.$store.state.client.ClienteReport.graficDate;
    // this.series[0].data = this.$store.state.client.ClienteReport.graficSeriaS;
    // this.series[1].data = this.$store.state.client.ClienteReport.graficSeriaCS;
    // this.updateCharts(this.$store.state.client.ClienteReport.graficDate);
    // this.updateSeries(
    //   this.$store.state.client.ClienteReport.graficSeriaS,
    //   this.$store.state.client.ClienteReport.graficSeriaCS
    // );

    this.updateCharts(this.getClienteReport.graficDate);
    this.updateSeries(
      this.getClienteReport.graficSeriaS,
      this.getClienteReport.graficSeriaCS
    );
    // }, 500);
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
