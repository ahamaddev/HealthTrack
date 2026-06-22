import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * ProgressChart component: renders Line or Bar charts
 * Props:
 *   type: 'line' | 'bar'
 *   labels: array of labels
 *   datasets: array of dataset objects
 *   title: chart title string
 *   height: chart height (default 300)
 */
const ProgressChart = ({ type = 'line', labels = [], datasets = [], title = '', height = 300 }) => {
  const chartData = {
    labels,
    datasets: datasets.map((ds, index) => ({
      label: ds.label || `Dataset ${index + 1}`,
      data: ds.data || [],
      borderColor: ds.borderColor || '#3b82f6',
      backgroundColor: ds.backgroundColor || 'rgba(59, 130, 246, 0.1)',
      borderWidth: ds.borderWidth || 2,
      fill: ds.fill !== undefined ? ds.fill : type === 'line',
      tension: 0.4,
      pointRadius: type === 'line' ? 4 : 0,
      pointHoverRadius: type === 'line' ? 6 : 0,
      pointBackgroundColor: ds.borderColor || '#3b82f6',
      borderRadius: type === 'bar' ? 6 : 0,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, family: "'Inter', sans-serif" },
        },
      },
      title: {
        display: !!title,
        text: title,
        font: { size: 16, weight: '600', family: "'Inter', sans-serif" },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, family: "'Inter', sans-serif" } },
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { size: 11, family: "'Inter', sans-serif" } },
        beginAtZero: type === 'bar',
      },
    },
  };

  const ChartComponent = type === 'bar' ? Bar : Line;

  return (
    <div style={{ height: `${height}px` }}>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;
