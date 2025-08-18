import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  stats: { locationName: string; favorites: number; itineraries: number }[];
};

const EngagementBarChart: React.FC<Props> = ({ stats }) => {
  const data = {
    labels: stats.map(s => s.locationName),
    datasets: [
      {
        label: 'Favoris',
        data: stats.map(s => s.favorites),
        backgroundColor: 'rgba(124,58,237,0.7)', 
      },
      {
        label: 'Itinéraires',
        data: stats.map(s => s.itineraries),
        backgroundColor: 'rgba(34,197,94,0.7)', 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' as const } },
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div style={{ height: 220, width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EngagementBarChart;
