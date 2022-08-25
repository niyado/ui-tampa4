import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import DataTable from 'react-data-table-component';

const PositionsPanel = () => {
  const [assets, setAssets] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [tickers, setTickers] = useState([]);

  var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll";
  var apiKey = "24QB9PEXI24YZT6M";

  

  const fetchAssets = async () => {
    await fetch(baseUrl)
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
    console.log("tickers ", tickers.toString())
    await fetch("https://financialmodelingprep.com/api/v3/quote/" + tickers.toString() + "?apikey=92d0a2a79c520355a07133de156215f7")
    .then(async (response) => {
      return response.json()
    })
    .then(async (data) => {
        console.log("AV response: ", data)
        setMarketData(data);
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
    ).then(
      console.log("tickers ", tickers?.toString()),
        fetchMarketData(tickers)
    )
    
    .catch((error) => {
      console.log(error);
    });
  }, [])


  const columns = [
    {
        name: 'Symbol',
        selector: row => row.symbol,
        sortable: true
    },
    {
        name: 'Price',
        selector: row => row.price,
        sortable: true
    },
    {
      name: 'Change %',
      selector: row => row.changesPercentage,
      sortable: true
  },
  {
      name: 'Volume',
      selector: row => row.volume,
      sortable: true
  },
];


  return (
    <DataTable
            columns={columns}
            data={marketData}
        />
  );
};

export default PositionsPanel;
