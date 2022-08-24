import React, { useState, useEffect } from "react";

const PositionsPanel = () => {
  // const [rowsData, setRowsData] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // var baseUrl = "http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll";

  // var apiKey = "24QB9PEXI24YZT6M";



  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     await fetch(`${baseUrl}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': `${apiKey}`,
  //         'Access-Control-Allow-Origin': "*"
  //       }
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           response.json().then((json) => {
  //             console.log(json.data);
  //             setRowsData(json.data)
  //             setLoading(false);
  //           });
  //         }
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchData()
  // }, [baseUrl, apiKey])


  return (
    <div id='wrapper' />
  );
};

export default PositionsPanel;
