

export const lineChartData = [
  {
    name: "PROFIT",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "REVENUE",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];


export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "black",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "black",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#fff", "#3182CE"],
  },
  colors: ["gray", "#2082AF"],
};
