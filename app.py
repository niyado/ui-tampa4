from git import safe_decode
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
    st.set_page_config(page_title="Trading App", page_icon="🤖", layout="wide")
    st.title("Get Position by Stock Symbol")
    session = requests.Session()

    apiKey = "24QB9PEXI24YZT6M"
    safe_proceed = True
    
    sp500 = pd.read_csv("datasets/SP500.csv")
    symbols = sp500['Symbol'].sort_values().tolist()
    symbols.insert(0, "SELECT")  
    
    #create portfolio list here, using a getAll endpoint
    portfolio = ["IBM", "AMZN", "AAPL"]
    portfolio.insert(0, "SELECT")

    tab1, tab2, tab3 = st.tabs(["Stocks", "ETFs", "Mutual Funds"])

    with tab1:
        st.header("Stocks")
        with st.sidebar:
            with st.form("my_form", clear_on_submit=True):
                #symbol = st.number_input("Symbol", key="symbol")      

                ticker1 = st.selectbox(
                    'Choose a S&P 500 Stock',
                    symbols)

                st.text("\n\nOR\n\n")

                ticker2 = st.selectbox(
                    'Choose from your portfolio',
                    portfolio)

                submitted = st.form_submit_button("Submit")

        if submitted:
            st.write("Result")
            if(ticker2 == "SELECT"):
                if(ticker1 != "SELECT"):
                    ticker = ticker1
                else:
                    st.error("Please select a ticker before proceeding")
                    safe_proceed = False
            else:
                ticker = ticker2

            if safe_proceed:
                data = fetch(session, f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={apiKey}")
                if data:
                    st.text(data)
                else:
                    st.error("Error")

    with tab2:
        st.header("ETFs")
        st.image("https://images.pexels.com/photos/669616/pexels-photo-669616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")

    with tab3:
        st.header("Mutual Funds")
        st.image("https://images.pexels.com/photos/669616/pexels-photo-669616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")



if __name__ == '__main__':
    main()