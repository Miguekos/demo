<template>
  <!-- <div class="echarts"> -->
  <div style="height: 280px;">
    <IEcharts
      :option="option"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
    />
  </div>
</template>

<script type="text/babel">
import IEcharts from "vue-echarts-v3/src/full.js";
export default {
  props: ['info'],
  name: "charts",
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    loading: false,
    option: {
      legend: { right: "auto" },
      tooltip: {},
      color: ["#3f51b5", "#f44336", "#61a0a8"],
      dataset: {
        source: [
          ["product", "Abril", "Mayo", "2017"],
          ["Pro..", 43.3, 85.8, 93.7],
          ["Ven..", 83.1, 73.4, 55.1],
          ["Admi..", 86.4, 65.2, 82.5],
          ["Ger..", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar", animation: true }, { type: "bar" }]
    }
  }),
  methods: {
    onReady(instance, ECharts) {
      // console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      // console.log(arguments);
    }
  },
  created() {}
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
