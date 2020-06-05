<template>
  <!-- <div class="echarts"> -->
  <div style="height: 280px;">
    <!-- {{info}} -->
    <!-- {{$store.state.client.ClienteReport.graficSeriaS}} -->
    <IEcharts :option="option" :loading="loading" @ready="onReady" @click="onClick" />
  </div>
</template>

<script type="text/babel">
import IEcharts from "vue-echarts-v3/src/full.js";
export default {
  props: ["info"],
  name: "charts",
  components: {
    IEcharts
  },
  data: () => ({
    loading: false,
    option: {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow" // 'line' | 'shadow'
        }
      },
      legend: {
        data: ["Personal sano", "Personal con síntomas"]
      },
      color: ["#f44336", "#3f51b5"],
      grid: {
        left: "2%",
        right: "2%",
        bottom: "2%",
        containLabel: true
      },
      xAxis: {
        // type: "value"
        type: "category",
        data: []
      },
      yAxis: {
        type: "value"
        // type: "category",
        // data: ["2", "3", "3", "3", "3", "3", "周日"]
      },
      series: [
        {
          name: "Personal con síntomas",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
            position: "inside"
          },
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: "Personal sano",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
            position: "inside"
          },
          data: []
        }
      ]
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
  created() {
    setTimeout(() => {
      this.option.xAxis.data = this.$store.state.client.ClienteReport.graficDate;
      this.option.series[0].data = this.$store.state.client.ClienteReport.graficSeriaS;
      this.option.series[1].data = this.$store.state.client.ClienteReport.graficSeriaCS;
    }, 1000);
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
