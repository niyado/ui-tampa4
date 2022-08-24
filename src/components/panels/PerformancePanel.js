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
    //labels: chart?.map(x => (new Date(x.timestamp*1000).toLocaleDateString('en-us', { year:"numeric", month:"short"}))),
    labels: ["Aug 2021", "Sep 2021", "Oct 2021", "Nov 2021", "Dec 2021", "Jan 2022", "Feb 2022", "Mar 2022", "Apr 2022", "May 2022", "Jun 2022", "Jul 2022", "Aug 2022"],
    datasets: [{
        label: `Account Value`,
      data: chart?.map(x => (x.newBalance)),
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

   const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
      scales: {
        y: [{
          ticks: {
            beginAtZero: false,
            min: 0,
            stepSize: 2,
            callback: function(value) {
              return `${value}`
            }
          }
        }]
      }
    },
  };

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