import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap';

export default class converter extends Component {
    state = {
        currency: [],
        amount: 0,
        fromCurrency:null,
        toCurrency: null,
        exchangeRate: [],
        exchangeAmount:0
    }
    componentDidMount() {
        axios.get('https://api.exchangeratesapi.io/latest?base=USD')
            .then(res => {
                this.setState({
                    currency: Object.keys(res.data.rates)
                })
            })
    }
    selectHandler = (e) => {
        if (e.target.name === "from") {
            this.setState({
                fromCurrency: e.target.value
            })
        } else if (e.target.name === "to") {
            this.setState({
                toCurrency:e.target.value
            })
        }
    }
    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios.get('https://api.exchangeratesapi.io/latest?base=USD')
                .then(res => {
                    this.setState({
                        exchangeAmount: (this.state.amount * res.data.rates[this.state.toCurrency]).toFixed(3)
                    })
                })
           
        } else if (this.state.fromCurrency === this.state.toCurrency) {
            alert("We can not Exchange money from same country");
        }
        else {
            alert("Please Enter Amount To Exchange");
        }
    }

    render() {
        return (
            <div className="body">
                <div className="col-sm-6 p-3 container">
                    <Card className="text-center" border="rounded">
                        <div style={{ margin: "15px -15px", padding: "5px 60px" }}>
                            <h2>Currency Converter</h2>
                        </div>
                        <Card.Body>
                            <Card.Text>
                                <div style={{ margin: "3px 0px" }}>
                                    <label>Enter Amount to Exchange</label>
                                    <input type="number" className="input" name="fromcurrency" placeholder="Enter Amount" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })}></input>
                                </div>
                                <div style={{ margin: "20px 0px" }}>
                                    <label>From:</label>
                                    <select onChange={(e) => this.selectHandler(e)} name="from">
                                    {
                                        this.state.currency.map(opt => {
                                            return (
                                                <option key={opt}>{opt}</option>
                                            )
                                        })
                                    }
                                    </select>
                                    <label>To:</label>
                                    <select name="to" onChange={(e) => this.selectHandler(e)}>
                                    {
                                        this.state.currency.map(opt => {
                                            return (
                                                <option key={opt} >{opt}</option>
                                            )
                                        })
                                    }
                                    </select>
                                    </div>
                                <div style={{ margin: "20px 0px" }}>
                                    <button onClick={this.convertHandler}>Convert</button>
                                </div>
                                <div style={{ margin: "20px 10px", padding: "5px 90px" }}>                    <label>Exchanged Amount</label>
                                <h3>{this.state.exchangeAmount}</h3>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
    )
    }
}

