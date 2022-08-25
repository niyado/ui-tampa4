import { React, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, Container, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import data from "../Datasets/SP500.json";
import BuyStock from '../components/BuyStock';

const Trade = () => {
  const [stocks, setStocks] = useState([]); //adds API response to stocks object
  const [symbol, setSymbol] = useState([]); //changes symbol for drop down
  const [stockName, setStockName] = useState([]);
  const [showBuy, setShowBuy] = useState(false); //used to show the buystock component depending on the state
  const [price, setPrice] = useState([]); //pass stock price to buystock component
  const [showTable, setShowTable] = useState(false)
  const stockSymbols = [];

  for (let i = 0; i < data.length; i++) { //Adding all the stock symbols to the array
    stockSymbols.push(data[i]["Symbol"])
  }

  const handleChange = (event) => { //Chooses Symbol for fetch stocks
    setSymbol(event.target.value);
  };

  const stockData = async () => { //Making API call to get stock data
    const response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=24QB9PEXI24YZT6M")
      .then(async (response) => {
        return response.json()
      })
      .then(async (data) => {
        console.log("Data", data)
        setStocks(data["Global Quote"])
        setPrice(data["Global Quote"]["02. open"])
        setStockName(data["Global Quote"]["01. symbol"])
        setShowTable(true)
      })
  }

  const handleClick = () => { //Call buystock component
    setShowBuy(false)
  }

  const StockTable = () => { //Component that displays stock data after stock fetch
    return (
      <div>
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
        <Button variant='contained' onClick={() => setShowBuy(true)}>Buy</Button>
      </div>
    )
  }

  return (
    <div>
      <body className='bodyTrade'>
        <Container maxWidth="sm">
          <FormControl fullWidth>
            <InputLabel id="stock-select-label">Stocks</InputLabel>
            <Select
              labelId="stock-select-label"
              id="stock-select-label"
              value={symbol}
              label="Stocks"
              onChange={handleChange}
            >
              {stockSymbols.map(Symbol => <MenuItem value={Symbol}>{Symbol}</MenuItem>)}
            </Select>
          </FormControl>

          <Button variant='contained' onClick={stockData}>Fetch Stock</Button>
          {showTable && <StockTable />}
        </Container>

        <Container>
          {showBuy && <BuyStock price={price} symbol={symbol} name={stockName} func={handleClick} />}
        </Container>
      </body >
    </div >
  )
}
export default Trade;