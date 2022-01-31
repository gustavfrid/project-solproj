import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const LineChart = ({ dataSeries }) => {
  console.log('[BarCHart]: ', dataSeries)
  const { daily, hourly, monthly } = dataSeries
  const dataSerie = daily
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }
  let labels = []
  if (dataSerie.length <= 12) {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  } else {
    labels = Array.from({ length: 365 }, (_, i) => i + 1)
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'PVGIS',
        data: dataSerie,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: {
          target: 'origin',
          above: 'rgb(255, 0, 0)', // Area will be red above the origin
          below: 'rgb(0, 0, 255)',
        }, // And blue below the origin},
      },
    ],
  }
  return <Line options={options} data={data} />
}
