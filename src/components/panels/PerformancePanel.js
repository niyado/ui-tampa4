import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const PerformancePanel = () => {
    const [chart, setChart] = useState([])
    var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/balanceLog/getAll";
  
  
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch(`${baseUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
          }
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                console.log(json);
                setChart(json)
              });
            }
          }).catch((error) => {
            console.log(error);
          });
      };
      fetchData()
    }, [baseUrl])
  

  console.log("chart", chart);
  var data = {
    labels: chart?.map(x => x.timestamp),
    datasets: [{
        label: `Portfolio Performance`,
      data: chart?.map(x => x.newBalance),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default PerformancePanel