import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import {ChangeEvent, FormEvent, useState} from "react";
import {makeStyles, Paper} from "@mui/material";
import axios from "axios";

const App = styled(Box)`
    background: repeating-linear-gradient(to top right, rgba(2,0,36,1) 0%, rgba(9,9,10,1) 28%, rgba(0,212,255,1) 100%);
    height: 100vh;
`

const FormContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
  height: 100%;
`

const Input = styled(TextField)`
  box-shadow: 40px -22px 93px -15px rgba(0,0,0,0.75);
`

const StyledButton = styled(Button)`
  background: linear-gradient(to left, salmon 50%, lightblue 50%) right;
  background-size: 200%;
  transition: .5s ease-out;
  :hover {
    background-position: left;
  }
`

const Home: NextPage = () => {
    const [card, setCard] = useState('')
    const [date, setDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [amount, setAmount] = useState('')
    const [cardDirty, setCardDirty] = useState(true)
    const [dateDirty, setDateDirty] = useState(true)
    const [cvvDirty, setCvvDirty] = useState(true)
    const [amountDirty, setAmountDirty] = useState(true)

    const ccCVCPattern = /^\d{0,3}$/g;
    const ccCardPattern = /^\d{0,16}$/g;
    const ccExpiryPattern = /^\d{0,6}$/g;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post('http://localhost:5000/', {
            cardNumber: card,
            date,
            cvv,
            amount
        })
    };

    const amountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmountDirty(true)
        if (event.target.value.match(/^\d*$/)) {
            setAmount(event.target.value)
            setAmountDirty(false)
        }
        if (!event.target.value) {
            setAmountDirty(true)
        }
    }

    const cvvChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCvvDirty(true)
        if (event.target.value.match(ccCVCPattern)) {
            setCvv(event.target.value)
        }
        if ([3,4].includes(Number(event.target.value.length))) {
            setCvvDirty(false)
        }
    }

    const cardChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCardDirty(true)
        if (event.target.value.match(ccCardPattern)) {
            setCard(event.target.value)
        }
        if ([16,17].includes(Number(event.target.value.length))) {
            setCardDirty(false)
        }
    }

    const dateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateDirty(true)
        console.log(event.target.value)
        const value = event.target.value.split('/').join('')
        console.log(value)
        if (value.match(ccExpiryPattern)) {
            if (event.target.value.length === 3) {
                setDate(event.target.value[0])
            } else if (event.target.value.length === 2) {
                setDate(event.target.value + '/')
            } else {
                setDate(event.target.value)
            }
        }
        if ([6,7].includes(Number(value.length))) {
            setDateDirty(false)
        }
    }

    const disabledButton = amountDirty || cardDirty || dateDirty || cvvDirty;

  return (
    <App>
      <Head>
        <title>Test Task to Datasub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <FormContainer>
                    <Paper>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            p={2}
                        >
                            <Typography component="h1" variant="h5">
                                Form
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Input
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Card Number"
                                    autoFocus
                                    value={card}
                                    error={cardDirty}
                                    onChange={cardChange}
                                />
                                <Input
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Expiration Date"
                                    value={date}
                                    error={dateDirty}
                                    onChange={dateChange}
                                />
                                <Input
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="CVV"
                                    value={cvv}
                                    error={cvvDirty}
                                    onChange={cvvChange}
                                />
                                <Input
                                    margin="normal"
                                    required
                                    onChange={amountChange}
                                    fullWidth
                                    value={amount}
                                    label="Amount"
                                    error={amountDirty}
                                />
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={disabledButton}
                                >
                                    Sign In
                                </StyledButton>
                            </Box>
                        </Box>
                    </Paper>
            </FormContainer>
    </App>

  )
}

export default Home
