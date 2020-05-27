<template>
  <!-- <div class="echarts"> -->
  <div id="chart" class="q-pt-md">
    <apex-chart type="bar" height="240" :options="chartOptions" :series="series"></apex-chart>
  </div>
</template>

<script type="text/babel">
// import VueApexCharts from "boot/vueApexCharts";
export default {
  data() {
    return {
      series: [
        {
          name: "Personas sanas",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Personas con síntomas",
          data: [13, 23, 20, 8, 13, 27]
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
        colors: [
          "#3f51b5",
          "#f44336"
        ],
        xaxis: {
          type: "String",
          categories: [
            "05/01",
            "05/02",
            "05/03",
            "05/04",
            "05/05",
            "05/06"
          ]
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
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
