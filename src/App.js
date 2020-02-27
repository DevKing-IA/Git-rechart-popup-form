import React, { PureComponent } from "react";
import $ from "jquery";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// rechart initial data
const data = [
  { date: "02-25", one: 4000, two: 2400 },
  { date: "02-26", one: 3000, two: 1398 },
  { date: "02-27", one: 2000, two: 9800 },
  { date: "02-28", one: 2780, two: 3908 },
  { date: "03-01", one: 1890, two: 4800 },
  { date: "03-02", one: 2390, two: 3800 },
  { date: "03-03", one: 3490, two: 4300 }
];

class App extends PureComponent {
  // constructor
  constructor(props) {
    super(props);
    this.state = { xAxis_value: "" };
  }

  // when click rechart, getting pointer data of rechart
  showTooltipData(data) {
    if(!data){
      return false;
    }
    this.setState({
      xAxis_value: data.activeLabel
    });
    // open and close popup modal
    $(".overlay").addClass("is-open");

    $(".close-btn").click(function() {
      $(".overlay").removeClass("is-open");
    });
  }

  // rendering rechart and popup modal
  render() {
    return (
      <div>
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          onClick={this.showTooltipData.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="one"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="two" stroke="#82ca9d" />
        </LineChart>
        <PopupModal date={this.state.xAxis_value} />
      </div>
    );
  }
}

// popup modal component. if you want to change modal, you can change this template.
function PopupModal(props) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="close-btn">
          <span className="close black"></span>
        </div>
        <div className="text-box">
          <p className="capture-date">
           {props.date}
          </p>
        </div>
        <form id="popup-form" className="capture-form">
          <textarea name='date' className="date" defaultValue ={props.date}></textarea>
          <textarea
            className="textarea"
            row="10"
            name="message"
            placeholder="Start typing here"
            required
          ></textarea>
          <button type="submit" className="send-message">
            POST
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;
