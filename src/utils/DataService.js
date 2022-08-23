export function getBalanceData() { //Making API call to get balance log data

    var DatesArr = new Array(), BalancesArr = new Array();

    const response = fetch("http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/balanceLog/getAll")
      .then(async (response) => {
        return response.json()
      })
      .then(async (data) => {
        for (let x in data) {
            var num = x["timestamp"] * 1000;
            DatesArr.push(new Date(num));
            BalancesArr.push(x["newBalance"]);
        }
      })
      return [DatesArr, BalancesArr];
}

export function getAllocationData() { //Making API call to get balance log data

    fetch('http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll')
  .then((response) => response.json())
  .then((data) => {return(data)});
}

export const getAssetsData = async () => {
    const data = await fetch('http://demospringdatabase-demospringdatabase.openshift20.conygre.com/api/portfolio/assets/getAll')
                      .then(response => response.json())
    return data;
    }

export function getResult(){
    getAssetsData().then((res)=>{console.log(res)});
}
