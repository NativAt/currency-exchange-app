import { get } from 'axios';
import { config } from '../config'

const { BASE_URL } = config;

export const getCurrencyQuote = async (baseCurrency, quoteCurrency, amount) => {
  const { data } = await 
    get(`${BASE_URL}/quote?from_currency_code=${baseCurrency}&to_currency_code=${quoteCurrency}&amount=${amount}`);
  return data;
}
