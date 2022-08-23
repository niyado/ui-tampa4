/*
eCharts examples -> https://ecomfe.github.io/echarts-examples/public/index.html
*/

import * as React from "react";
import { render } from "react-dom";
import ReactEcharts from "echarts-for-react";
import {getResult} from "../../utils/DataService.js";
import {getAssetsData} from "../../utils/DataService.js";

//Import json file. Used in {options}.
var data = require("./data.json");
//var data = getAssetsData().then((res)=>{console.log(res)});
//console.log(getResult());


//Array of names for legend in {options}
const dataNames = data.map(i => i.name);

//Chart style
const style = {
  height: "90vh",
  width: "100%"
};

//Chart options
let option = {
  backgroundColor: "rgb(43, 51, 59)",
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true
      },
      magicType: {
        show: true,
        type: ["pie", "funnel"]
      },
      restore: {
        show: true,
        title: "Restore"
      },
      saveAsImage: {
        show: true,
        title: "Save Image"
      }
    }
  },
  graphic: [
    {
      type: "group",
      rotation: Math.PI / 4,
      bounding: "raw",
      right: 200,
      bottom: 100,
      z: 100
    },
    {
      type: "group",
      left: "0",
      top: "bottom"
    }
  ],
  // Hover Tooltip
  // {a} = series:[{name:}]
  // {b} = series:[{data: [{name:}]}]
  // {c} = series:[{data: [{value:}]
  tooltip: {
    trigger: "item",
    formatter: "{a}<br/><strong>{b}</strong>: {c}"
  },
  title: {
    text: "Portfolio Diversity",
    left: "center",
    top: 20,
    textStyle: {
      color: "#ccc"
    }
  },
  calculable: true,
  legend: {
    icon: "circle",
    x: "center",
    y: "50px",
    data: dataNames,
    textStyle: {
      color: "#fff"
    }
  },
  series: [
    {
      name: "Series Name",
      type: "pie",
      animationDuration: 2000,
      animationEasing: "quarticInOut",
      radius: [10, 150],
      avoidLabelOverlap: false,
      startAngle: 90,
      hoverOffset: 5,
      center: ["50%", "50%"],
      roseType: "area",
      selectedMode: "multiple",
      label: {
        normal: {
          show: true,
          formatter: "{c}" // {c} data: [{value:},]
        },
        emphasis: {
          show: true
        }
      },
      labelLine: {
        normal: {
          show: true,
          smooth: false,
          length: 20,
          length2: 10
        },
        emphasis: {
          show: true
        }
      },
      data: data
    }
  ]
};

const AllocationPanel = () => (
  <ReactEcharts option={option} style={style} className="pie-chart" />
);

render(<AllocationPanel />, document.getElementById("root"));
export default AllocationPanel;

//console.log(data);
//console.log(dataNames)
