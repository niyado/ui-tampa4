import streamlit as st
import pandas as pd
import requests


def fetch(session, url):
    try:
        result = session.get(url)
        return result.json()
    except Exception:
        return {}


def main():
    st.set_page_config(page_title="Trading App", page_icon="🤖")
    st.title("Get Position by Stock Symbol")
    session = requests.Session()

    apiKey = "24QB9PEXI24YZT6M"
    
    sp500 = pd.read_csv("datasets/SP500.csv")
    symbols = sp500['Symbol'].sort_values().tolist()  
    with st.form("my_form"):
        #symbol = st.number_input("Symbol", key="symbol")      

        ticker = st.selectbox(
            'Choose a S&P 500 Stock',
            symbols)

        submitted = st.form_submit_button("Submit")

        if submitted:
            st.write("Result")
            data = fetch(session, f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={apiKey}")
            if data:
                #st.image(data['download_url'], caption=f"Author: {data['author']}")
                st.text(data)
            else:
                st.error("Error")


if __name__ == '__main__':
    main()