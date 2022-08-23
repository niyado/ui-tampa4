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
        'rgba(124, 101, 169, 0.2)',
        'rgba(240, 249, 167, 0.2)',
        'rgba(146, 194, 197, 0.2)',
        'rgba(100, 226, 176, 0.2)',
        'rgba(137, 157, 186, 0.2)',
        'rgba(133, 138, 180, 0.2)'
      ],
      borderColor: [
        'rgba(124, 101, 169, 1)',
        'rgba(240, 249, 167, 1)',
        'rgba(146, 194, 197, 1)',
        'rgba(100, 226, 176, 1)',
        'rgba(137, 157, 186, 1)',
        'rgba(133, 138, 180, 1)'
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