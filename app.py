import streamlit as st
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
    with st.form("my_form"):
        symbol = st.number_input("Symbol", key="symbol")

        submitted = st.form_submit_button("Submit")

        if submitted:
            st.write("Result")
            data = fetch(session, f"https://something/something/{symbol}")
            if data:
                #st.image(data['download_url'], caption=f"Author: {data['author']}")
                st.text(data)
            else:
                st.error("Error")


if __name__ == '__main__':
    main()