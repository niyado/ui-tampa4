import streamlit as st
import pandas as pd
import requests
import json
import plotly.graph_objects as go


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
    
    #create portfolio list here, using a getAll endpoint, right now we only have a placeholder
    dummyDataJSON = '{"Stocks": [{"symbol": "AAPL", "averageCostPerShare": 192.99, "quantity": 23}, {"symbol": "IBM", "averageCostPerShare": 92.99, "quantity": 6}, {"symbol": "A", "averageCostPerShare": 150.32, "quantity": 10}, {"symbol": "AMC", "averageCostPerShare": 34.45, "quantity": 36}, {"symbol": "TJX", "averageCostPerShare": 85.34, "quantity": 5}, {"symbol": "AMZN", "averageCostPerShare": 292.99, "quantity": 18}, {"symbol": "HCA", "averageCostPerShare": 92.59, "quantity": 24}]}'

    dummyData = json.loads(dummyDataJSON)


    tab1, tab2 = st.tabs(["Portfolio", "Trade"])

    with tab1:
        st.header("Portfolio")
        
        tickersProcessed = [[],[],[]]
        allTickers = dummyData["Stocks"]
        for s in allTickers:
            sym = s['symbol']
            cost = s['averageCostPerShare']
            quantity = s['quantity']
            tickersProcessed[0].append(sym)
            tickersProcessed[1].append(cost)
            tickersProcessed[2].append(quantity)

        #diversity plot
        fig = go.Figure(
            go.Pie(
            labels = tickersProcessed[0],
            values = tickersProcessed[2],
            hoverinfo = "label+percent",
            textinfo = "value",
            title = "Diversity"
        ))

        st.plotly_chart(fig)
        


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