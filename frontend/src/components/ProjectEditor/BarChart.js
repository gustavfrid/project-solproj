import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const BarChart = ({ dataSeries }) => {
  //   console.log('[BarCHart]: ', dataSeries)
  const loadDaily = dataSeries.load.daily
  const pvgisDaily = dataSeries.pvgis.daily
  //   const { daily, hourly, monthly } = dataSeries
  //   const dataSerie = daily
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energy production',
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            return (index + 1) % 2 === 0 ? this.getLabelForValue(val) : ''
          },
          //   color: 'red',
        },
      },
    },
  }
  let labels = []
  //   if (dataSerie.length <= 12) {
  //     labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //   } else {
  labels = Array.from({ length: 365 }, (_, i) => i + 1) //.map((val) => (val % 30 === 0 ? val : ''))
  //     console.log(labels)
  //     console.log(labels.map((val) => (val % 30 === 0 ? val : '')))
  //   }

  const data = {
    labels,
    datasets: [
      {
        label: 'Production',
        data: pvgisDaily,
        backgroundColor: 'rgba(244, 162, 4, 0.8)',
      },
      {
        label: 'Consumtion',
        data: loadDaily,
        backgroundColor: 'rgba(100, 82, 82, 0.5)',
      },
    ],
  }
  return <Bar options={options} data={data} />
}
