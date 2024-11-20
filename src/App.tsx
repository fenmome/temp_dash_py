import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TemperatureGauge from './components/TemperatureGauge';

function App() {
  const [temperature, setTemperature] = useState<number>(20);

  const fetchTemperature = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/temperature/latest');
      setTemperature(response.data.temperature);
    } catch (error) {
      console.error('Error fetching temperature:', error);
    }
  };

  useEffect(() => {
    fetchTemperature();
    const interval = setInterval(fetchTemperature, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-7xl mx-auto">
        <TemperatureGauge temperature={temperature} />
      </div>
    </div>
  );
}

export default App;