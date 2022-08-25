import { Button, InputLabel, Select, MenuItem, Container, TextField, FormControl, Card, CardContent, } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Data from "../Datasets/SP500.json";

const SellStock = () => {
    const [userData, setUserData] = useState([]);
    const [symbol, setSymbol] = useState([]); //changes symbol for drop down
    const [showSell, setShowSell] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [shareAmount, setShareAmount] = useState(0);
    const [maxShares, setMaxShares] = useState([]);
    const [dateOfTrade, setDateOfTrade] = useState([]);
    const [stockName, setStockName] = useState([]);
    const [finalPrice, setFinalprice] = useState([]);

    const navigate = useNavigate();

    const userStock = async () => {
        const response = await fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll")
            .then(async (response) => {
                return response.json()
            })
            .then(async (data) => {
                setUserData(data)
                setShowSelect(true)
            })
    }

    // useEffect(() => {
    //     console.log("Symbol changed", symbol)
    //     return (
    //         console.log("see")
    //     )
    // }, [symbol]);


    const sellJSON = {
        "symbol": symbol,
        "name": stockName,
        "shares": shareAmount,
        "price": (finalPrice * shareAmount).toFixed(2),
        "timestampOfTrade": dateOfTrade,
        "type": "SELL",
        "securityType": "stock"
    }

    const sellStockFunc = async () => {
        fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/trades/newTrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(sellJSON)
        }).then((e) => {
            if (e.status == 200) {
                navigate("/", { replace: true });
            }
        })
    }

    const getStockPrice = async (symbol) => {
        const response = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=24QB9PEXI24YZT6M")
            .then(async (response) => {
                return response.json()
            })
            .then(async (data) => {
                setFinalprice(data["Global Quote"]["02. open"])
            })
    }

    const handleChange = (event) => { //Chooses Symbol for fetch stocks
        var name = Data.findIndex(element => element.Symbol === event.target.value)
        setStockName(Data[name].Name)
        setSymbol(event.target.value);
        setShowSell(true)
        var stock = userData.findIndex(item => item.symbol === event.target.value)
        setMaxShares(userData[stock]["quantity"])
        setDateOfTrade(Math.floor(Date.now() / 1000))

        getStockPrice(event.target.value)
    };

    return (
        <div>
            <Button variant='contained' onClick={userStock}>Search your Stocks</Button>
            {showSelect &&
                <div>
                    <InputLabel id="demo-simple-select-label">Stocks</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={symbol}
                        label="Stocks"
                        onChange={handleChange}
                    >
                        {userData.map(Symbol => <MenuItem value={Symbol.symbol}>{Symbol.symbol}</MenuItem>)}
                    </Select>
                </div>
            }
            <Container>
                {/* {showSell && <SellData />} */}
                {showSell && <div>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <FormControl>
                                <TextField
                                    id="outlined-number"
                                    label="Shares Amount"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ inputMode: 'numeric', min: 0, max: maxShares }}
                                    onChange={(e) => setShareAmount(e.target.value)}
                                />
                            </FormControl>
                        </CardContent>
                    </Card>
                    <Button variant='contained' onClick={sellStockFunc}>Complete Sell</Button>
                </div>}
            </Container>
        </div>
    )
}

export default SellStock