from turtle import width
import streamlit as st
import pandas as pd
import requests
import json


def fetch(session, url):
    try:
        result = session.get(url)
        return result.json()
    except Exception:
        return {}


def main():
    st.set_page_config(page_title="Trading App", page_icon="🤖", layout="wide")
    st.title("Get Position by Stock Symbol")
    session = requests.Session()

    apiKey = "24QB9PEXI24YZT6M"
    safe_proceed = True
    
    sp500 = pd.read_csv("datasets/SP500.csv")
    symbols = sp500['Symbol'].sort_values().tolist()
    
    #create portfolio list here, using a getAll endpoint, right now we only have a placeholder
    portfolio = ["IBM", "AMZN", "AAPL"]
    dummyDataJSON = '{"Stocks": [{"symbol": "AAPL", "averageCostPerShare": 192.99, "quantity": 23}, {"symbol": "IBM", "averageCostPerShare": 92.99, "quantity": 6}, {"symbol": "A", "averageCostPerShare": 150.32, "quantity": 10}, {"symbol": "AMC", "averageCostPerShare": 34.45, "quantity": 36}, {"symbol": "TJX", "averageCostPerShare": 85.34, "quantity": 5}, {"symbol": "AMZN", "averageCostPerShare": 292.99, "quantity": 18}, {"symbol": "HCA", "averageCostPerShare": 92.59, "quantity": 24}]}'

    dummyData = json.loads(dummyDataJSON)


    tab1, tab2 = st.tabs(["Portfolio", "Trade"])

    with tab1:
        st.header("Portfolio")
        st.text("Show portfolio stats here")
        #st.text(dummyData)
        tickersProcessed = []
        allTickers = dummyData["Stocks"]
        for s in allTickers:
            m = (s['symbol'], s['averageCostPerShare'], s['quantity'])
            tickersProcessed.append(m)
        for s in tickersProcessed:
            st.text(s)


    with tab2:
        st.header("Trade")
        with st.form("my_form", clear_on_submit=True):     

            ticker = st.selectbox(
                'Choose a S&P 500 Stock',
                symbols)
            submitted = st.form_submit_button("Submit")

        if submitted:
            st.write("Result")
            
            data = fetch(session, f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={apiKey}")
            if data:
                st.text(data)
            else:
                st.error("Error")




if __name__ == '__main__':
    main()