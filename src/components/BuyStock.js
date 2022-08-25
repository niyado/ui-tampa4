import { InputLabel, FormControl, Input, TextField, Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import React, { useState } from 'react'
import "../App.css"

const BuyStock = (props) => {

    const [symbol, setSymbol] = useState([]);
    const [stockName, setStockName] = useState([]);
    const [sharesAmount, setSharesAmount] = useState([]);
    const [purchasePrice, setPurchasePrice] = useState([]);

    const buyJSON = {
        "symbol": symbol,
        "name": stockName,
        "shares": sharesAmount,
        "price": purchasePrice,
        "timestampOfTrade": 123243424,
        "type": "BUY",
        "securityType": "stock"
    }

    const setStockPurchase = (e) => {
        setSharesAmount(e.target.value)
        setPurchasePrice(e.target.value * props.price)
        console.log(e.target.value)
        setSymbol(props.symbol)
        setStockName(props.name)
    }

    const purchaseFunc = () => {
        fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/trades/newTrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(buyJSON)
        })
    }

    return (
        <div className='stockContainer'>
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
                            inputProps={{ inputMode: 'numeric', min: 0, }}
                            onChange={(e) => setStockPurchase(e)}
                        />
                        <label>Total Price {purchasePrice}</label>
                    </FormControl>
                </CardContent>
            </Card>
            <Button variant="contained" onClick={purchaseFunc}>Purchase</Button>
            <Button variant='contained' onClick={props.func}>Cancel</Button>
        </div>
    )
}

export default BuyStock