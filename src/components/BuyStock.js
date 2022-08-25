import { InputLabel, FormControl, Input, TextField, Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import "../App.css"

const BuyStock = (props) => {

    const [symbol, setSymbol] = useState([]);
    const [stockName, setStockName] = useState([]);
    const [sharesAmount, setSharesAmount] = useState([]);
    const [purchasePrice, setPurchasePrice] = useState([]);
    const [dateOfTrade, setDateOfTrade] = useState([]);
    const navigate = useNavigate();


    const buyJSON = {
        "symbol": symbol,
        "name": stockName,
        "shares": sharesAmount,
        "price": purchasePrice,
        "timestampOfTrade": dateOfTrade,
        "type": "BUY",
        "securityType": "stock"
    }

    const setStockPurchase = (e) => {
        setPurchasePrice((e.target.value * props.price).toFixed(2))
        setSharesAmount(e.target.value)
        setSymbol(props.symbol)
        setStockName(props.name)
        setDateOfTrade(Math.floor(Date.now() / 1000))
    }

    const purchaseFunc = async () => {
        await fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/trades/newTrade", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify(buyJSON)
        }).then((e) => {
            if (e.status == 200) {
                navigate("/", { replace: true });
            }
        })
    }

    return (
        <div className='stockContainer'>
            <Card sx={{ maxWidth: 345 }} className="CardContainer">
                <CardHeader title="Purchase Stock" className='CardTitle' />
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
                    </FormControl>
                    <label className='PriceLabel'>Total Price ${purchasePrice}</label>
                </CardContent>
            </Card>
            <Button variant="contained" className="PurchaseButton" onClick={purchaseFunc}>Purchase</Button>
            <Button variant='contained' className="CancelButton" onClick={props.func}>Cancel</Button>
        </div>
    )
}

export default BuyStock