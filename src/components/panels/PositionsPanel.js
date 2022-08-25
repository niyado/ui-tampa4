import React, { useState, useEffect } from "react";

const PositionsPanel = () => {
  const [assets, setAssets] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [tickers, setTickers] = useState([]);

  var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll";
  var apiKey = "24QB9PEXI24YZT6M";

  const fetchAssets = async () => {
    await fetch(`${baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      }
    })
      .then(async(response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            setAssets(json)
          });
        }
      })
      
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMarketData = async (tickers) => {
    await fetch("https://financialmodelingprep.com/api/v3/quote/" + tickers.toString() + "?apikey=92d0a2a79c520355a07133de156215f7")
    .then(async (response) => {
      return response.json()
    })
    .then(async (data) => {
        console.log("AV response: ", data)
        setAssets(data);
      })
      
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAssets()
    .then(
        assets.forEach((id) => {
          console.log("fetching market data for " + id.symbol);
          setTickers((tickers) => [...tickers, id.symbol]);
        }),
        fetchMarketData(tickers))
    
    .catch((error) => {
      console.log(error);
    });
  }, [])


  return (
    <div id='wrapper' />
  );
};

export default PositionsPanel;
