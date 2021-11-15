import LineChart from "./LineChart";
import PieChart from "./PieChart";
import ProductPurchased from "./ProductPurchased";

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRetailDashboard } from "../../../actions/retail_dashboard";
export class Dashboard extends Component {
  state = {
    bgcolor: 'success'
  }
  
  chechCurrentPurchaseDetail = () =>{
    if(parseInt(this.props.current_month_purchase) > parseInt(this.props.previous_month_purchase)){
      this.setState({
        bgcolor: 'danger'
      })
    } else if(parseInt(this.props.current_month_purchase) < parseInt(this.props.previous_month_purchase)){
      this.setState({
        bgcolor: 'success'
      })
    } else {
      this.setState({
        bgcolor: 'warning'
      })
    }
  }

  componentDidMount(){
    this.props.getRetailDashboard();

    if(this.props.current_month_data !== ''){
      this.chechCurrentPurchaseDetail()
    }
  }


  showChart = () => {
    let chart = document.getElementById('chart')
    let table = document.getElementById('table')

    chart.style.display = 'block'
    table.style.display = 'none'
  }
  showTable = () => {
    let chart = document.getElementById('chart')
    let table = document.getElementById('table')

    table.style.display = 'block'
    chart.style.display = 'none'
  }
  
  
  render() {
    // this.chechCurrentPurchaseDetail();
    if(this.props.day_list.length !== 0){
      return (
        <div className="mx-auto">
        <div className="h-25 ml-3">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="d-flex justify-content-between align-items-center w-100 h-100 p-4 mr-3 bg-primary">
            {
              this.props.previous_month_purchase !== 0 ? (
                  <div className="">
                    <p className="mr-3 fs-4">Prevoius Month Total Purchase</p>
                    <p className="fs-1">{this.props.previous_month_purchase}</p>
                  </div>
                    ) : (
                  <div className="">
                    <p className="mr-3 fs-4">Current Month Total Purchase</p>
                    <p className="fs-1">{this.props.current_month_purchase}</p>
                  </div>
                    )
                  }
                </div>
              </div>
            {
              this.props.previous_month_purchase !== 0 ? (
                <div className="col-md-6 col-sm-12">
                <div className={`d-flex justify-content-between align-items-center w-100 h-100 p-4 bg-${this.state.bgcolor}`}>
                  <p className="mr-3 fs-4">Current Month Total Purchase</p>
                  <div className="d-flex align-items-center">
                    <p className="fs-1">{this.props.current_month_purchase}</p>
                    <div className="d-flex flex-column justify-content-around ml-3">
                    
                    </div>
                  </div>
                </div>
                </div>
              ) : (null)
            }
          </div>
        </div>
        <div className="ml-3 mt-4">
          <LineChart 
          year_list={this.props.year_list} 
          month_list={this.props.month_list} 
          day_list={this.props.day_list} 
          years_data ={this.props.years_data}
          months_data ={this.props.months_data}
          current_month_data ={this.props.current_month_data} />
  
        </div>
        <div className="h-25 ml-3 mb-3">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <ProductPurchased most_purchased_product={this.props.most_purchased_product} />
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-3"><button className='btn btn-primary' onClick={this.showChart}>Chart Format</button></div>
                <div className="col-3"><button className='btn btn-primary' onClick={this.showTable}>Tabluar Format</button></div>
              </div>
              <div id="chart">
                <PieChart suppliers_purchase_info={this.props.suppliers_purchase_info} />
              </div>
              <div id='table' className="supplier_table table-responsive">
              <p className="title fs-2 fw-bold">
                Supplier Overall Purchase Info (Current Month)
              </p>
                <table
                  className="table table-bordered table-hover"
                  data-page-length="100"
                >
                  <thead className="table-light">
                    <tr>
                      <th>Sr.No</th>
                      <th>Supplier Name</th>
                      <th>No. of purchase made</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="table-light">
                    {this.props.suppliers_purchase_info.map((item,index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.supplier_name}</td>
                        <td>{item.no_of_purchase}</td>
                        <td>{item.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  current_month_purchase: state.retail_dashboard.current_month_purchase,
  previous_month_purchase: state.retail_dashboard.previous_month_purchase,
  most_purchased_product: state.retail_dashboard.most_purchased_product,
  year_list: state.retail_dashboard.year_list,
  month_list: state.retail_dashboard.month_list,
  day_list: state.retail_dashboard.day_list,
  years_data: state.retail_dashboard.years_data,
  months_data: state.retail_dashboard.months_data,
  current_month_data: state.retail_dashboard.current_month_data,
  suppliers_purchase_info: state.retail_dashboard.suppliers_purchase_info,
})

export default connect(mapStateToProps,{getRetailDashboard})(Dashboard)



