import * as React from "react";
import { render } from "react-dom";
import ReactECharts from "echarts-for-react";
import {getBalanceData} from "../../utils/DataService.js";

var results = getBalanceData();
var DatesArr = results[0];
var BalancesArr = results[1];

var chartDom = document.getElementById('main');
    var myChart = ReactECharts.init(chartDom, 'dark');
    var option;
    
    option = {
        xAxis: {
            type: 'category',
            data: DatesArr
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: BalancesArr,
            type: 'line'
            }
        ]
        };
    
        option && myChart.setOption(option);

const PerformancePanel = () => {

      return(
        <ReactECharts option={this.getOption()} />
      )

  }

  render(<PerformancePanel />, document.getElementById("main"));
  export default PerformancePanel;