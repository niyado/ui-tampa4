import { colors } from '@material-ui/core';
import { React, useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, Container, Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import data from "../Datasets/SP500.json";
import BuyStock from '../components/BuyStock';

const Trade = () => {
  const [stocks, setStocks] = useState([]); //adds API response to stocks object
  const [symbol, setSymbol] = useState([]); //changes symbol for drop down
  const [showBuy, setShowBuy] = useState(false);
  const stockSymbols = [];
  const [price, setPrice] = useState([]);

  for (let i = 0; i < data.length; i++) { //Adding all the stock symbols to the array
    stockSymbols.push(data[i]["Symbol"])
  }

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  const stockData = async () => { //Making API call to get stock data
    const response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=24QB9PEXI24YZT6M")
      .then(async (response) => {
        return response.json()
      })
      .then(async (data) => {
        setStocks(data["Global Quote"])
        setPrice(data["Global Quote"]["02. open"])
      })

  }

  const handleClick = () => { //Call buystock component
    setShowBuy(false)

  }

  const cancelButton = () => {
    return <Button variant='contained' onClick={handleClick}>Cancel</Button>
  }

  return (
    <div>

      <Container maxWidth="sm">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Stocks</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={symbol}
            label="Stocks"
            onChange={handleChange}
          >
            {stockSymbols.map(Symbol => <MenuItem value={Symbol}>{Symbol}</MenuItem>)}
          </Select>
        </FormControl>

        <Button variant='contained' onClick={stockData}>Fetch Stock</Button>
        {

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Stock Keys</TableCell>
                  <TableCell align="right">Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(stocks).map((key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{stocks[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        <Button variant='contained' onClick={() => setShowBuy(true)}>Buy</Button>


        {/* <Button variant='contained' onClick={handleClick}>Cancel</Button> */}
      </Container>

      <Container>
        {showBuy && <BuyStock price={price} />}
      </Container>
    </div >
  )
}
export default Trade;