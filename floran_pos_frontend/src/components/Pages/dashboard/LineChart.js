import React, { Component } from 'react'
import { Line } from "react-chartjs-2";

export class LineChart extends Component {

    state = {
      label : [],
      data1 : [],
      data2 : []
    }

    componentDidMount(){
      if(this.props.day_list.length !== 0){
        this.setState({
          label:this.props.day_list,
          data1:this.props.current_month_data[0],
          data2:this.props.current_month_data[1],
        })
      }
    }

    onChange = (e) => {
      let data = e.target.value

      if(data === 'days'){
        this.setState({
          label:this.props.day_list,
          data1:this.props.current_month_data[0],
          data2:this.props.current_month_data[1],
        })
      } else if(data === 'months') {
        this.setState({
          label:this.props.month_list,
          data1:this.props.months_data[0],
          data2:this.props.months_data[1],
        })
      } else {
        this.setState({
          label:this.props.year_list,
          data1:this.props.years_data[0],
          data2:this.props.years_data[1],
        })
      }
      console.log(data)
    }

    render() {
        
        let data = {
            labels: this.state.label,
            datasets: [
              {
                label: "Inter State",//ourstat
                data: this.state.data2,
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
              },
              {
                label: "Intra State",
                data: this.state.data1,
                fill: false,
                backgroundColor: "rgb(3, 177, 252)",
                borderColor: "rgba(3, 177, 252, 0.2)",
              },
            ],
          };
          
          const options = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };


        console.log(this.state.label)

        return (
            <div className="p-4 border mb-3 container-fluid mx-auto">
              <div className="row">
                <div className="col-12">
                  <h2>
                    Purchase B.I.
                  </h2>
                </div>
                <div className="col-md-9"></div>
                <div className="col-md-3">
                  <select className='form-select' onChange={this.onChange}>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                  </select>
                </div>
                <div className="col-12">
                <Line data={data} options={options} width='100vh' height='45vh' />
                </div>
            </div>
          </div>
            
        )
    }
}

export default LineChart
