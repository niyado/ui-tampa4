import streamlit as st
import pandas as pd
import requests
import json
import plotly.graph_objects as go
import re
import numpy as np


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

    sp500 = pd.read_csv("datasets/SP500.csv")
    symbols = sp500['Symbol'].sort_values().tolist()

    # create portfolio list here, using a getAll endpoint, right now we only have a placeholder
    dummyDataJSON = '{"Stocks": [{"symbol": "AAPL", "averageCostPerShare": 192.99, "quantity": 23}, {"symbol": "IBM", "averageCostPerShare": 92.99, "quantity": 6}, {"symbol": "A", "averageCostPerShare": 150.32, "quantity": 10}, {"symbol": "AMC", "averageCostPerShare": 34.45, "quantity": 36}, {"symbol": "TJX", "averageCostPerShare": 85.34, "quantity": 5}, {"symbol": "AMZN", "averageCostPerShare": 292.99, "quantity": 18}, {"symbol": "HCA", "averageCostPerShare": 92.59, "quantity": 24}]}'

    dummyData = json.loads(dummyDataJSON)

    tab1, tab2 = st.tabs(["Portfolio", "Trade"])

    with tab1:
        st.header("Portfolio")

        tickersProcessed = [[], [], []]
        allTickers = dummyData["Stocks"]
        for s in allTickers:
            sym = s['symbol']
            cost = s['averageCostPerShare']
            quantity = s['quantity']
            tickersProcessed[0].append(sym)
            tickersProcessed[1].append(cost)
            tickersProcessed[2].append(quantity)

        # diversity plot
        fig = go.Figure(
            go.Pie(
                labels=tickersProcessed[0],
                values=tickersProcessed[2],
                hoverinfo="label+percent",
                textinfo="value"
                title = "Diversity"
            ))

        st.plotly_chart(fig)

    with tab2:
        def buy_stock():  # Buy stock function
            with st.form("buyForm", clear_on_submit=True):
                number = st.number_input(
                    'Choose amount of shares to buy', min_value=0, value=0)
                st.write('Shares to buy ', number)
                st.write("Total price is ", int(number) * 213.2)
                submit_button = st.form_submit_button(label='Submit')

        st.header("Trade")
        with st.form("my_form", clear_on_submit=True):

            ticker = st.selectbox(
                'Choose a S&P 500 Stock',
                symbols)
            submitted = st.form_submit_button("Submit")

        if submitted:
            st.write("Result")

            data = fetch(
                session, f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={apiKey}")
            if data:
                stockInfo, stockChart = st.columns(2)
                with stockInfo:
                    #st.text(data["Global Quote"])
                    for item in data["Global Quote"]:
                        st.text(re.sub("[0-9.]", "", item) +
                                " => " + data["Global Quote"][item])

                with stockChart:  # Dummy chart
                    with st.container():
                        st.area_chart(np.random.randn(50, 3))

                st.button("Buy", help="Purchase stock", on_click=buy_stock)

                st.button("Sell", help="Sell stock")

            else:
                st.error("Error")


if __name__ == '__main__':
    main()
