import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';


import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


const AllocationPanel = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll";



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

  var data = {
    labels: chart?.map(x => x.symbol),
    datasets: [{
      label: `Portfolio Diversity`,
      data: chart?.map(x => x.quantity),
      backgroundColor: [
        'rgba(239, 71, 111, 0.2)',
        'rgba(255, 209, 102, 0.2)',
        'rgba(6, 214, 160, 0.2)',
        'rgba(17, 138, 178, 0.2)',
        'rgba(232, 165, 152, 0.2)',
        'rgba(255, 198, 255, 0.2)',
        'rgba(212, 224, 155, 0.2)',
        'rgba(241, 156, 121, 0.2)',
        'rgba(246, 244, 210, 0.2)',
        'rgba(164, 74, 63, 0.2)'
      ],
      borderColor: [
        'rgba(239, 71, 111, 1)',
        'rgba(255, 209, 102, 1)',
        'rgba(6, 214, 160, 1)',
        'rgba(17, 138, 178, 1)',
        'rgba(232, 165, 152, 1)',
        'rgba(255, 198, 255, 1)',
        'rgba(212, 224, 155, 1)',
        'rgba(241, 156, 121, 1)',
        'rgba(246, 244, 210, 1)',
        'rgba(164, 74, 63, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Portfolio Allocation',
      },
    },
  };

  return (
    <div>
      <Doughnut
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default AllocationPanel