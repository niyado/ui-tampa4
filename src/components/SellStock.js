import { Button, InputLabel, Select, MenuItem, Container, TextField, FormControl, Card, CardContent, } from '@material-ui/core';
import React, { useState } from 'react'
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

    const sellJSON = {
        "symbol": symbol,
        "name": stockName,
        "shares": shareAmount,
        "price": 61 * shareAmount,
        "timestampOfTrade": dateOfTrade,
        "type": "SELL",
        "securityType": "stock"
    }

    const sellStockFunc = () => {
        fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/trades/newTrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(sellJSON)
        })
    }

    //COMPONENT BELOW NOT WORKING AT THE MOMENT
    // const SellData = () => { 
    //     const stock = userData.findIndex(item => item.symbol === symbol)
    //     //const maxShares = userData[stock]["quantity"]
    //     setMaxShares(userData[stock]["quantity"])
    //     return (
    //         <div>
    //             <Card sx={{ maxWidth: 345 }}>
    //                 <CardContent>
    //                     <FormControl>
    //                         <TextField
    //                             id="outlined-number"
    //                             label="Shares Amount"
    //                             type="number"
    //                             InputLabelProps={{
    //                                 shrink: true,
    //                             }}
    //                             inputProps={{ inputMode: 'numeric', min: 0, max: maxShares }}
    //                             onChange={(e) => setShareAmount(e)}
    //                         />
    //                     </FormControl>
    //                 </CardContent>
    //             </Card>
    //             <Button variant='contained' onClick={sellStockFunc}>Complete Sell</Button>
    //         </div>
    //     )
    // }


    const handleChange = (event) => { //Chooses Symbol for fetch stocks
        var name = Data.findIndex(element => element.Symbol === event.target.value)
        setStockName(Data[name].Name)
        setSymbol(event.target.value);
        setShowSell(true)
        var stock = userData.findIndex(item => item.symbol === event.target.value)
        setMaxShares(userData[stock]["quantity"])
        setDateOfTrade(Math.floor(Date.now() / 1000))

    };

    return (
        <div>
            <Button variant='contained' onClick={userStock}>Sell</Button>
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
                                {console.log(shareAmount)}
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