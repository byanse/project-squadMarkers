<template>
  <Bar :chart-data="chartData" :chart-options="chartOptions" />
</template>
<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  datasets: {
    type: Array,
    required: true,
  },
});

const chartData = {
  labels: props.labels,
  datasets: props.datasets,
  backgroundColor: "blue",
};

const chartOptions = {
  responsive: true,
  indexAxis: "y",
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>
