import { InputLabel, FormControl, Input, TextField, Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core';
import React, { useState } from 'react'
import "../App.css"

const BuyStock = (props) => {

    const [symbol, setSymbol] = useState([]);
    const [sharesAmount, setSharesAmount] = useState([]);
    console.log("Hello")

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
                            onChange={(e) => setSharesAmount(e.target.value)}
                        />
                        <label>Total Price {props.price * sharesAmount}</label>
                    </FormControl>
                </CardContent>
            </Card>
            <Button variant='contained' onClick={props.func}>Cancel</Button>
        </div>
    )
}

export default BuyStock