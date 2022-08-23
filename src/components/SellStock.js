import { Button, InputLabel, Select, MenuItem, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react'


const SellStock = () => {
    const [userData, setUserData] = useState([]);
    const [symbol, setSymbol] = useState([]); //changes symbol for drop down
    const [showSell, setShowSell] = useState(false);

    const userStock = async () => {
        const response = await fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll")
            .then(async (response) => {
                return response.json()
            })
            .then(async (data) => {
                setUserData(data)
                //console.log(userData[0]["symbol"])
            })
    }

    const SellData = () => {
        const stock = userData.findIndex(item => item.symbol === symbol)
        const maxShares = userData[stock]["quantity"]

        return (
            <TextField
                id="outlined-number"
                label="Shares Amount"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ inputMode: 'numeric', min: 0, max: maxShares }}
            //onChange={(e) => setSharesAmount(e.target.value)}
            />
        )
    }

    const handleChange = (event) => { //Chooses Symbol for fetch stocks
        setSymbol(event.target.value);
        setShowSell(true)
    };

    return (
        <div>
            <Button variant='contained' onClick={userStock}>Sell</Button>
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
            <Container>
                {showSell && <SellData />}
            </Container>
        </div>
    )
}

export default SellStock