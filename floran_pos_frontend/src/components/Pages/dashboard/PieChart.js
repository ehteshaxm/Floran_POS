import { Pie } from "react-chartjs-2";
import React, { Component } from 'react'

export class PieChart extends Component {

  state = {
    name:[],
    data:[]
  }

  componentDidMount(){
    let temp = [];
    let temp2 = [];
    if(this.props.suppliers_purchase_info){
      // eslint-disable-next-line array-callback-return
      this.props.suppliers_purchase_info.map((item,index) => {
        temp.push(item.no_of_purchase)
        temp2.push(item.supplier_name)
      })
    }
    this.setState({
      data:temp,
      name:temp2
    })
  }


  getRandomColor = (len) =>{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    var colors = []
    for(var j=0;j<=len;j++){
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color)
      color = '#'
    }
    return colors;
  }
  render() {
    var color = this.getRandomColor(this.state.data.length)
    const data = {
      labels: this.state.name,
      datasets: [
        {
          label: "Number of purchase done",
          data: this.state.data,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="d-flex flex-column w-100">
        <div className="header p-2">
          <p className="title fs-2 fw-bold">
            Supplier Overall Purchase Info (Current Month)
          </p>
        </div>
        <div className="w-auto mx-auto">
          <Pie
            data={data}
            width={300}
            height={300}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </div>
      </div>
    )
  }
}

export default PieChart
