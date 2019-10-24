import React from "react";
import './index.css';

function ExchangeShow({ exchange_rate, currency_code, amount }) {
  return (
    <div className="exchange-show">
      <p>exchange rate: {exchange_rate}</p>
      <p>currency code: {currency_code}</p>
      <p>amount: {amount}</p>
    </div>
  )
}

export default ExchangeShow;