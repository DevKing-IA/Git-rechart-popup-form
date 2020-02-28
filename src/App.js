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

const date_data = [
  { date: "02-25", message_id: 1, person: "Andrew", message: "this is test" },
  { date: "02-26", message_id: 2, person: "Ivan", message: "this is test" },
  { date: "03-02", message_id: 3, person: "Alex", message: "this is test" }
]

// message-icon
const path = 'm74.414 480.548h-36.214l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-59.127-38.802-88.554-95.014-88.554-153.944 0-108.719 99.923-219.203 256.414-219.203 165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z';
  

class App extends PureComponent {
  // constructor
  constructor(props) {
    super(props);
    this.state = { xAxis_value: "", message_data:{} };
  }

  // message icon
  renderCustomAxisTick = ({ x, y, payload }) => {
    let including_message = false;
    var message_id = 0;
    date_data.forEach(element => {
      if(element.date === payload.value){
        including_message = true;
        message_id = element.message_id;
      }
    });
    if(including_message){
      let className = 'message-active_' + message_id;
      return (
        <svg x={x - 12} y={y + 4} width={24} height={24} viewBox="0 0 512 512" fill="#666">
          <path className={className} d={path} onClick={this.handleClick}/>
        </svg>
      );
    }else{
      return (
        <text x={x -20} y={y+20} width={124} height={24} fill="#666">
          <tspan className="message-inactive">
            {payload.value}
          </tspan>
        </text>
      )
    }
  };

  handleClick(){
    //console.log(this.state);
    console.log("here is message click event");
    
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
          <XAxis dataKey="date" tick ={this.renderCustomAxisTick.bind(this)}/>
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
