import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
// import getColumns from "./getColumns.js";
// import "./styles.css";

const PositionsPanel = () => {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var apiKey = "24QB9PEXI24YZT6M";



  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setRowsData(json.data)
              setLoading(false);
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchData()
  }, [baseUrl, apiKey])

  return (
    <div className="PositionPanel">
      <GridTable
        // columns={getColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(data.id)
        }
      />
    </div>
  );
};

export default PositionsPanel;
