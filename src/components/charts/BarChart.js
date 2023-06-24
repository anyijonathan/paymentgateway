import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  period,
  dataType,
  data
}) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#170123",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
      },
    },
    borderSkipped: false,
    borderRadius: 8,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        maxHeight: 100,
        padding: {
          top: 50,
        },
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
  };

  const legendMargin = {
    id: "legendMargin",
    beforeInit: function (chart) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 40);
      };
    },
  };

  const labels = data?.timestampLabel;
  const amountData = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: data?.totalAmount?.amount,
        backgroundColor: "#5C068C",
      },
    ],
  };

  const volumeData = {
    labels,
    datasets: [
      {
        label: "Transaction Volume",
        data: data?.totalAmount?.transactionVolume,
        backgroundColor: "#ffcd60",
      },
    ],
  };

  const transactionData = {
    labels,
    datasets: [
      {
        label: "Successful",
        data: data?.status?.successful,
        backgroundColor: "#9fe3cd",
      },
      {
        label: "Failed",
        data: data?.status?.failed,
        backgroundColor: "#f0a8a8",
      },
    ],
  };

  const merchantData = {
    labels,
    datasets: [
      {
        label: "Approved",
        data: data?.onboardedMerchants?.approved,
        backgroundColor: "#8d51af",
      },
      {
        label: "Refered",
        data: data?.onboardedMerchants?.refered,
        backgroundColor: "#7878f1",
      },
      {
        label: "Declined",
        data: data?.onboardedMerchants?.declined,
        backgroundColor: "#f0a8a8",
      },
    ],
  };

  const getGraphData = () => {
    if (dataType === "amount") {
      return amountData;
    } else if (dataType === "transaction") {
      return transactionData;
    } else if (dataType === "volume") {
      return volumeData;
    } else {
      return merchantData
    }
  }

  return (
    <Bar
      options={options}
      data={getGraphData()}
      plugins={[legendMargin]}
    />
  );
};

export default BarChart;
