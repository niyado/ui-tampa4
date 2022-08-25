import { React, useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, Container, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import Data from "../Datasets/SP500.json";
import BuyStock from '../components/BuyStock';
import SellStock from '../components/SellStock';

const Trade = () => {
  const [stocks, setStocks] = useState([]); //adds API response to stocks object
  const [symbol, setSymbol] = useState([]); //changes symbol for drop down
  const [stockName, setStockName] = useState([]);
  const [showBuy, setShowBuy] = useState(false); //used to show the buystock component depending on the state
  const [showSell, setShowSell] = useState(false); //used to show the buystock component depending on the state
  const [price, setPrice] = useState([]); //pass stock price to buystock component
  const [showTable, setShowTable] = useState(false)
  const stockSymbols = [];

  for (let i = 0; i < Data.length; i++) { //Adding all the stock symbols to the array
    stockSymbols.push(Data[i]["Symbol"])
  }

  const handleChange = async (event) => { //Chooses Symbol for fetch stocks
    stockData(event.target.value)
    setSymbol(event.target.value)
    setShowBuy(false)
    setShowSell(false)
  };

  const stockData = async (e) => { //Making API call to get stock data
    const response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + e + "&apikey=24QB9PEXI24YZT6M")
      .then(async (response) => {
        return response.json()
      })
      .then(async (data) => {

        var name = Data.findIndex(element => element.Symbol === data["Global Quote"]["01. symbol"])
        setStocks(data["Global Quote"])
        setPrice(data["Global Quote"]["02. open"])
        setStockName(Data[name].Name)
        setShowTable(true)
      })
  }

  const handleClick = () => { //Call buystock component
    setShowBuy(false)

  }

  const buyHandle = () => {
    setShowBuy(true)
    setShowSell(false)
  }

  const sellHandle = () => {
    setShowSell(true)
    setShowBuy(false)
  }

  const StockTable = () => { //Component that displays stock data after stock fetch
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Stock Information</TableCell>
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
        <Button variant='contained' className='BuyButton' onClick={() => buyHandle()}>Buy</Button>
        <Button variant="contained" className="SellButton" onClick={() => sellHandle()}>Sell</Button>
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

          {/* <Button variant='contained' onClick={stockData}>Fetch Stock</Button> */}
          {showTable && <StockTable />}
        </Container>

        <Container>
          {showBuy && <BuyStock price={price} symbol={symbol} name={stockName} func={handleClick} />}
        </Container>
        <Container>
          {showSell && <SellStock />}
        </Container>
      </body >
    </div >
  )
}
export default Trade;