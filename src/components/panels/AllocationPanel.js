import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const AllocationPanel = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll";
  //var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //var apiKey = "coinranking23de16a7bd12a0cc349457a92eca0ae4825d32ba6b3829da";



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
      label: `${chart?.length} Stocks Owned`,
      data: chart?.map(x => x.quantity),
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
      <Doughnut
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default AllocationPanel