import React, { useState, useEffect } from 'react'


const BalanceDisplay = () => {
  const [balance, setBalance] = useState()
  var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/accounts/getBalance";



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
              setBalance(json)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchData()
  }, [baseUrl])


  return (
    <div>
      <h3>Current Balance: </h3>
        <h2>{(balance)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
    </div>
  )
}

export default BalanceDisplay