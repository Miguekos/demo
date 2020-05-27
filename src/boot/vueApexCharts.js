import VueApexCharts from "vue-apexcharts";
// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }) => {
  // something to do
  Vue.use(VueApexCharts);
  Vue.component("apex-chart", VueApexCharts);
};
