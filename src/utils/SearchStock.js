import { colors } from '@material-ui/core';
import { React, useEffect, useState } from 'react'
import stockFetcher from '../utils/stockFetcher'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import data from "../Datasets/SP500.json"

const SearchStock = () => {

    const [stocks, setStocks] = useState([]); //adds API response to stocks object
    const [symbol, setSymbol] = useState([]); //changes symbol for drop down

    const handleChange = (event) => {
        setSymbol(event.target.value);
    };
    const stockSymbols = []

    for (let i = 0; i < data.length; i++) { //Adding all the stock symbols to the array
        stockSymbols.push(data[i]["Symbol"])
    }

    const stockData = async () => { //Making API call to get stock data
        const response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=24QB9PEXI24YZT6M")
            .then(async (response) => {
                return response.json()
            })
            .then(async (data) => {
                setStocks(data["Global Quote"])
            })

    }

    // useEffect(() => {
    //     stockData()
    //         .then((res) => {
    //             setStocks(res)
    //         })
    //         .catch((e) => {
    //             console.log(e.message)
    //         })
    // }, [])

    return (
        <div>
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
            <button onClick={stockData}>Fetch Stock</button>
            {
                Object.keys(stocks).map((key) => {
                    return (
                        <p>{key} => {stocks[key]}</p>
                    )
                })
            }
        </div >
    )
}

export default SearchStock