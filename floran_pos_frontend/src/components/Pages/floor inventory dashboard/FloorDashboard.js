import LineChart from "./LineChart";
import TextBox from "../dashboard/TextBox";
import { getFloorDashboard } from "../../../actions/floorinventory_dashboard";
import { connect } from "react-redux";

import React, { Component } from 'react'

export class FloorDashboard extends Component {
  componentDidMount(){
    this.props.getFloorDashboard();
  }
  render() {
    if(this.props.dayList.length !== 0){
      return (
        <div className="mx-auto">
          <div className="h-25 ml-3">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <TextBox
                  text={"Number of orders made this month"}
                  number={this.props.total_order}
                  color={"primary"}
                />
              </div>
              <div className="col-md-3 col-sm-6">
                <TextBox text={"Orders Pending"} number={this.props.pending} color={"dark"} />
              </div>
              <div className="col-md-3 col-sm-6">
                <TextBox text={"Orders Approved"} number={this.props.approve} color={"dark"} />
              </div>
            </div>
          </div>
          <div className="ml-3 mt-4">
            <LineChart dayList={this.props.dayList} graph_data={this.props.graph_data}/>
          </div>
          <div className="h-25 ml-3 mb-3">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="w-100 mr-3 p-2">
                  <p className="fs-2 fw-bold">New Product Added</p>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover"
                      data-page-length="100"
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Sr.No</th>
                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody className="table-light">
                        {this.props.newPrd.map((item,index) => (
                        <tr>
                          <td>{index +1}</td>
                          <td>{item.product_name}</td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                
         
                <div className="w-100 mr-3 p-2">
                  <p className="fs-2 fw-bold">Regular Products Deduct</p>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover"
                      data-page-length="100"
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Sr.No</th>
                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody className="table-light">
                        {this.props.regular.map((item,index) => (
                        <tr>
                          <td>{index +1}</td>
                          <td>{item}</td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  total_order: state.floorinventory_dashboard.total_order,
  pending: state.floorinventory_dashboard.pending,
  approve: state.floorinventory_dashboard.approve,
  dayList: state.floorinventory_dashboard.dayList,
  graph_data: state.floorinventory_dashboard.graph_data,
  newPrd: state.floorinventory_dashboard.newPrd,
  regular: state.floorinventory_dashboard.regular,

})

export default connect(mapStateToProps,{getFloorDashboard})(FloorDashboard);
