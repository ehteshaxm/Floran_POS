import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { instatePurchaseDetail } from "../../../actions/purchase";
import { getSuppliers } from "../../../actions/supplier";

export class instatebill extends Component {
  static propTypes = {
    invoiceDetail: PropTypes.array.isRequired,
    invoicePrds: PropTypes.array.isRequired,
    supplier: PropTypes.array.isRequired,
    instatePurchaseDetail: PropTypes.func.isRequired,
    total_cost: PropTypes.number.isRequired,
    total_cgst: PropTypes.number.isRequired,
    total_sgst: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.instatePurchaseDetail(this.props.match.params.id);
    if (this.props.supplier.length === 0) {
      this.props.getSuppliers();
      console.log("Supplier empty");
    }
  }

  supplierName = (id) => {
    var supplierData;
    this.props.supplier.map((sdata, index) =>
      parseInt(sdata.id) === parseInt(id) ? (supplierData = sdata) : {}
    );
    return supplierData;
  };
  render() {
    let invoiceDetail = this.props.invoiceDetail;

    if (invoiceDetail.length === 0 || this.props.supplier.length === 0) {
      console.log("Fukc ", invoiceDetail.length);
      return <h1>Loading..</h1>;
    } else {
      let supplierData = this.supplierName(
        this.props.invoiceDetail[0].supplier_id
      );
      console.log(supplierData);
      return (
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <h3>
                        <label>Supplier Detail</label>
                      </h3>
                    </div>
                    <div className="col-md-6 col-12">
                      <h6>
                        <label>Name : </label>
                        {supplierData.name}
                      </h6>
                      <h6>
                        <label>Address :</label>
                        <br />
                        {supplierData.address}
                      </h6>
                      <h6>
                        <label>Contact : </label>
                        {supplierData.mobile_number}
                      </h6>
                      <h6>
                        <label>GST Number : </label>
                        {supplierData.gst_number}
                      </h6>
                    </div>
                    <div className="col-md-6 col-12">
                      <h6>
                        <label>Invoice : </label>
                        {this.props.invoiceDetail[0].invNumber}
                      </h6>
                      <h6>
                        <label>Date : </label>
                        {this.props.invoiceDetail[0].date}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h3>Item Detials</h3>
                    </div>
                    <div className="col-12 table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-light">
                          <tr>
                            <th>S/N</th>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Unit price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.invoicePrds.map((value, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{value.product}</td>
                              <td>{value.quantity}</td>
                              <td>{value.product_price}</td>
                              <td>{value.product_price * value.quantity}</td>
                            </tr>
                          ))}
                          <tr>
                            <td></td>
                            <th>Total</th>
                            <td></td>
                            <td></td>
                            <td>{this.props.total_cost}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h3>Purchase Detail with Gst</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>Product Name</th>
                            <th className="text-center">
                              Taxable <br />
                              Value
                            </th>
                            <th className="customTh">
                              <table className="table table-bordered customTable">
                                <tr>
                                  <th className="text-center" colSpan="2">
                                    Central Tax
                                  </th>
                                </tr>
                                <tr>
                                  <th>Rate</th>
                                  <th>Amount</th>
                                </tr>
                              </table>
                            </th>
                            <th className="customTh">
                              <table className="table table-bordered customTable">
                                <tr>
                                  <th className="text-center" colSpan="2">
                                    State Tax
                                  </th>
                                </tr>
                                <tr>
                                  <th>Rate</th>
                                  <th>Amount</th>
                                </tr>
                              </table>
                            </th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.invoicePrds.map((data, index) => (
                            <tr key={index}>
                              <td>{data.product}</td>
                              <td>{data.product_price}</td>
                              <td className="customTh">
                                <table className="table customTable2">
                                  <tr>
                                    <td className="customTh2">
                                      {data.product_cgst}%
                                    </td>
                                    <td className="">
                                      {(data.product_price *
                                        data.quantity *
                                        parseInt(data.product_cgst)) /
                                        100}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td className="customTh">
                                <table className="table customTable2">
                                  <tr>
                                    <td className="customTh2">
                                      {data.product_sgst}%
                                    </td>
                                    <td className="">
                                      {(data.product_price *
                                        data.quantity *
                                        parseInt(data.product_sgst)) /
                                        100}
                                    </td>
                                  </tr>
                                </table>
                              </td>

                              <td>{data.total}</td>
                            </tr>
                          ))}
                          <tr>
                            <td>Total</td>
                            <th>{this.props.total_cost}</th>
                            <th className="customTh">
                              <table className="table customTable">
                                <tr>
                                  <th className="inner_table1 customTh2"></th>
                                  <th className="inner_table2">
                                    {this.props.total_cgst}
                                  </th>
                                </tr>
                              </table>
                            </th>
                            <th className="customTh">
                              <table className="table customTable">
                                <tr>
                                  <th className="inner_table1 customTh2"></th>
                                  <th className="inner_table2">
                                    {this.props.total_sgst}
                                  </th>
                                </tr>
                              </table>
                            </th>

                            <th>{this.props.invoiceDetail[0].total_amount}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-12">
                      <h2>
                        Grant Total : {this.props.invoiceDetail[0].total_amount}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  invoiceDetail: state.purchase.invoiceDetail,
  invoicePrds: state.purchase.invoicePrds,
  total_cost: state.purchase.total_cost,
  total_cgst: state.purchase.total_cgst,
  total_sgst: state.purchase.total_sgst,
  supplier: state.supplier.suppliers,
});

export default connect(mapStateToProps, {
  instatePurchaseDetail,
  getSuppliers,
})(instatebill);
