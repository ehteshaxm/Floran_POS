import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSuppliers } from "../../../actions/supplier";
import { getProducts } from "../../../actions/product";
import { createPurchase } from "../../../actions/purchase";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Paper from "@material-ui/core/Paper";

export class PurchaseBilling extends Component {
  state = {
    children: [],

    newPrds: [],
    prds: [],

    newPrdRef: [],
    prdRef: [],
    index: 1,

    bill_type: "",
    supplier_name: "",
    supplier_id: "",
    invNumber: "",
    invDate: "",
    grandtotal: 0,
    submitted: false,

    new_prd: false,
    supplier_selected: false,

    mainClass: "col-lg-12 col-12",
    subClass: "col-lg-3 col-12 position-lg-fixed end-0",

    prdName: "",
    prdQty: 0,
    prdPrice: 0,
    prdIgst: "",
    prdSgst: "",
    prdCgst: "",
    totalPrice: 0,

    product_type: "",
    product_weight_category: "",
    product_weight_per_quantity: 0,
  };

  static propTypes = {
    createPurchase: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    getSuppliers: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
  };

  validate = () => {
    if (
      this.state.invDate === "" ||
      this.state.invNumber === "" ||
      this.state.supplier_name === "" ||
      this.state.bill_type === ""
    ) {
      return false;
    } else {
      if (this.state.children.length === 0) {
        return false;
      }
    }
    return true;
  };
  createBill = () => {
    var {
      bill_type,
      supplier_name,
      supplier_id,
      invNumber,
      invDate,
      newPrds,
      prds,
      grandtotal,
    } = this.state;
    var check = true;
    if (check) {
      const Bill = {
        bill_type,
        supplier_name,
        supplier_id,
        invNumber,
        invDate,
        newPrds,
        prds,
        grandtotal,
      };

      console.log("Bill");
      console.log(Bill);
      this.props.createPurchase(Bill);

      // this.setState({
      //   submitted: true,
      // });
    } else {
      alert("Please fill the bill properly");
    }
  };

  deleteRow = (id) => {
    var children = this.state.children;
    const itemIndex = this.state.children.findIndex(
      (item) => item.key === `${id}`
    );
    if (itemIndex > -1) {
      children.splice(itemIndex, 1);
    }
    this.setState({
      children: children,
      index: children.length > 0 ? this.state.index : 1,
    });
  };
  componentDidMount() {
    this.props.getSuppliers();
    this.props.getProducts();
    // this.appendRow();
  }

  checkCustomer = (e) => {
    let customer_gst = e.target.value;
    let user_gst = this.props.profile[0].gst_number;
    var custype = "";
    var cusName = "";
    var cusid = 0;
    for (var i of this.props.suppliers) {
      if (i.gst_number === customer_gst) {
        cusName = i.name;
        cusid = i.id;
        break;
      }
    }
    if (customer_gst[0] === user_gst[0] && customer_gst[1] === user_gst[1]) {
      custype = "instate";
    } else {
      custype = "outstate";
    }
    if (this.state.bill_type !== custype) {
      this.setState({
        bill_type: custype,
        index: 0,
        children: [],
        supplier_name: cusName,
        supplier_id: cusid,
        grandtotal: 0,
        mainClass: "col-lg-9 col-12",
        supplier_selected: true,
      });
    } else {
      this.setState({
        supplier_name: cusName,
      });
    }
  };

  onInvdetailChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  addPrdOnChange = (e) => {
    console.log(e.target.name);
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      this.calcPrdTotal
    );
  };

  prdNameOnChange1 = (e, value) => {
    console.log(e.target.name);
    console.log(value);
    this.setState({
      prdName: value,
    });
  };

  prdNameOnChange2 = (e) => {
    this.setState({
      prdName: e.target.value,
    });
  };

  calcPrdTotal = () => {
    let price = this.state.prdPrice;
    let qty = this.state.prdQty;
    let igst = this.state.prdIgst;
    let sgst = this.state.prdSgst;
    let cgst = this.state.prdCgst;
    let amt = 0;

    amt = parseFloat(price) * parseFloat(qty);
    if (this.state.bill_type === "instate") {
      let sgstTempData = (amt * sgst) / 100;
      let cgstTempData = (amt * cgst) / 100;

      amt = amt + sgstTempData + cgstTempData;
    } else {
      let igstTempData = (amt * igst) / 100;

      amt = amt + igstTempData;
    }

    this.setState({
      totalPrice: amt,
    });
  };

  validNewPrd = () => {
    if (
      this.state.prdName !== "" &&
      this.state.prdQty !== 0 &&
      this.state.prdPrice !== 0 &&
      this.state.totalPrice !== 0
    ) {
      if (this.state.new_prd) {
        if (
          this.state.product_type !== "" &&
          this.state.product_weight_category !== "" &&
          this.state.product_weight_per_quantity !== 0
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  deletePrd = (id) => {
    let children = this.state.children;
    let newPrds = this.state.newPrds;
    let prds = this.state.prds;
    let newPrdsRef = this.state.newPrdRef;
    let prdsRef = this.state.prdRef;

    let prdName = this.state.children[id][0];
    let prdId;

    if (prdsRef.includes(prdName)) {
      children.splice(id, 1);
      prdId = prdsRef.indexOf(prdName);
      prdsRef.splice(prdId, 1);
      prds.splice(prdId, 1);

      this.setState({
        children: children,
        prds: prds,
        prdRef: prdsRef,
      });
    } else if (newPrdsRef.includes(prdName)) {
      children.splice(id, 1);
      prdId = newPrdsRef.indexOf(prdName);
      newPrdsRef.splice(prdId, 1);
      newPrds.splice(prdId, 1);

      this.setState({
        children: children,
        newPrds: newPrds,
        newPrdRef: newPrdsRef,
      });
    } else {
      alert("Invalid Action");
    }
  };

  addPrdToList = () => {
    console.log(this.validNewPrd());
    if (this.validNewPrd()) {
      let tempRowData = [];
      tempRowData.push(this.state.prdName);
      tempRowData.push(this.state.prdQty);
      tempRowData.push(this.state.prdPrice);
      if (this.state.bill_type === "instate") {
        tempRowData.push(this.state.prdSgst);
        tempRowData.push(this.state.prdCgst);
      } else if (this.state.bill_type === "outstate") {
        tempRowData.push(this.state.prdIgst);
      }
      tempRowData.push(this.state.totalPrice);

      if (this.state.new_prd) {
        let tempNewData = [];
        tempNewData.push(this.state.prdName);
        tempNewData.push("Description Pending...");
        tempNewData.push(this.state.product_type);
        tempNewData.push(this.state.product_weight_category);
        tempNewData.push(this.state.product_weight_per_quantity);
        tempNewData.push(this.state.prdPrice);

        this.setState({
          newPrds: [...this.state.newPrds, tempNewData],
          newPrdRef: [...this.state.newPrdRef, this.state.prdName],
        });
      } else {
        this.setState({
          prds: [...this.state.prds, tempRowData],
          prdRef: [...this.state.newPrdRef, this.state.prdName],
        })
      }

      console.log(tempRowData);

      this.setState({
        children: [...this.state.children, tempRowData],
        grandtotal: this.state.grandtotal + this.state.totalPrice,

        prdName: "",
        prdQty: 0,
        prdPrice: 0,
        prdIgst: "",
        prdSgst: "",
        prdCgst: "",
        totalPrice: 0,
        new_prd: false,

        product_type: "",
        product_weight_category: "",
        product_weight_per_quantity: 0,
      });

      console.log(this.state);
    } else {
      alert("Fill the form correctly");
    }
  };

  filter = createFilterOptions();

  filterOptions = (options, params) => {
    const results = this.filter(options, params);

    if (params.inputValue !== "") {
      if (results.length === 0) {
        if (this.state.new_prd === false) {
          this.setState({
            new_prd: true,
          });
        }
      } else {
        if (this.state.new_prd === true) {
          this.setState({
            new_prd: false,
          });
        }
      }
    }

    return results;
  };

  render() {
    if (this.state.submitted === true) {
      this.props.history.push("/purchase");
    }

    if (this.props.products.length <= 0) {
      return <h1>loading</h1>;
    }

    const bill_type = this.state.bill_type;
    const supplier_selected = this.state.supplier_selected;
    const mainClass = this.state.mainClass;
    const subClass = this.state.subClass;

    const prdName = this.state.prdName;
    const prdQty = this.state.prdQty;
    const prdPrice = this.state.prdPrice;
    const product_weight_per_quantity = this.state.product_weight_per_quantity;

    return (
      <div className="col-12">
        <div className="row">
          <div className={mainClass}>
            <div className="card">
              <div className="card-body">
                <div className="card-header">
                  <h1>Purchase Billing</h1>
                </div>
                <br />
                <div className="card-text">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <h3>Supplier Name :</h3>
                      <select
                        name="supplier"
                        id="supplier"
                        onChange={this.checkCustomer}
                        className="form-select"
                        defaultValue="none"
                      >
                        <option value="none" disabled>
                          {" "}
                          Select the Supplier
                        </option>
                        {this.props.suppliers.map((supplier, index) => (
                          <option key={index} value={supplier.gst_number}>
                            {supplier.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group row">
                        <div className="col-md-3">
                          <label className="col-form-label">
                            Invoice Number:
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.onInvdetailChange}
                            name="invNumber"
                            id="invoice_no"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3">
                          <label className="col-form-label">
                            Invoice Date:
                          </label>
                        </div>
                        <div className="col-md-9">
                          <input
                            type="date"
                            className="form-control"
                            onChange={this.onInvdetailChange}
                            name="invDate"
                            id="invoice_no"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {this.instategstbill} */}
                  {bill_type === "instate" ? (
                    <div className="row">
                      <div className="col-md-12 table-responsive">
                        <table className="table table-hover table-bordered border-primary ">
                          <thead className="table-light">
                            <tr>
                              <td>S/N</td>
                              <td>Product Name</td>
                              <td>Product Quantity</td>
                              <td>Price</td>
                              <td>S.GST</td>
                              <td>C.GST</td>
                              <td>Total</td>
                              <td></td>
                            </tr>
                          </thead>
                          <tbody className="table-light">
                            {this.state.children.map((child, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                {child.map((data, index2) => (
                                  <td key={index + "" + index2}>{data}</td>
                                ))}
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deletePrd(index)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : bill_type === "outstate" ? (
                    <div className="row">
                      <div className="col-md-12 table-responsive">
                        <table className="table table-hover table-bordered border-primary ">
                          <thead className="table-light">
                            <tr>
                              <td>S/N</td>
                              <td>Product Name</td>
                              <td>Product Quantity</td>
                              <td>Price</td>
                              <td>I.GST</td>
                              <td>Total</td>
                              <td></td>
                            </tr>
                          </thead>
                          <tbody className="table-light">
                            {this.state.children.map((child, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                {child.map((data, index2) => (
                                  <td key={index + "" + index2}>{data}</td>
                                ))}
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.deletePrd(index)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {supplier_selected === true ? (
                  <div className="row">
                    <div className="col-md-3">
                      <div className="row">
                        <button
                          className="btn btn-primary"
                          onClick={this.createBill}
                        >
                          Create Bill
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                      <h4>
                        Grand Total :{" "}
                        <span id="grant">{this.state.grandtotal}</span>
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12 text-center">
                      <h4>Select supplier to proceed further</h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {supplier_selected === true ? (
            <div className={subClass}>
              <div className="card  purchase_entiry_card">
                <div className="card-body ">
                  <div className="scrollableDiv">
                    <div className="form-group row">
                      <label className="col-12 col-form-label">
                        Product Name
                      </label>
                      <div className="col-12">
                        <Autocomplete
                          id="free-solo-demo"
                          filterOptions={(options, params) =>
                            this.filterOptions(options, params)
                          }
                          freeSolo
                          name="prdName"
                          value={prdName}
                          onChange={this.prdNameOnChange1}
                          onKeyDown={(e) => {
                            console.log(e.target.value);
                          }}
                          options={this.props.products.map(
                            (option) => option.product_name
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              onChange={this.prdNameOnChange2}
                              placeholder="Product name"
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-6">
                        <div className="row">
                          <label className="col-12 col-form-label">
                            Product Quantity
                          </label>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              name="prdQty"
                              placeholder="Product Name"
                              value={prdQty}
                              onChange={this.addPrdOnChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <label className="col-12 col-form-label">
                            Product Price
                          </label>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              name="prdPrice"
                              placeholder="Product Name"
                              value={prdPrice}
                              onChange={this.addPrdOnChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {bill_type === "instate" ? (
                      <div>
                        <div className="form-group row">
                          <label className="col-12 col-form-label">
                            Product SGST
                          </label>
                          <div className="col-12">
                            <select
                              className="form-control"
                              id="3"
                              name="prdSgst"
                              onChange={this.addPrdOnChange}
                              defaultValue="none"
                            >
                              <option value="none" disabled>
                                Select option
                              </option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                              <option value="28">28%</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-12 col-form-label">
                            Product CGST
                          </label>
                          <div className="col-12">
                            <select
                              className="form-control"
                              id="3"
                              name="prdCgst"
                              onChange={this.addPrdOnChange}
                              defaultValue="none"
                            >
                              <option value="none" disabled>
                                Select option
                              </option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                              <option value="28">28%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : bill_type === "outstate" ? (
                      <div className="form-group row">
                        <label className="col-12 col-form-label">
                          Product IGST
                        </label>
                        <div className="col-12">
                          <select
                            className="form-control"
                            id="3"
                            name="prdIgst"
                            onChange={this.addPrdOnChange}
                            defaultValue="none"
                          >
                            <option value="none" disabled>
                              Select option
                            </option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {this.state.new_prd ? (
                      <div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">
                            Product Type
                          </label>
                          <div className="col-sm-9">
                            {/* <div onChange={this.onChange}> */}
                            <div className="row" onChange={this.addPrdOnChange}>
                              <div className="col-md-6 form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="product_type"
                                  value="edible"
                                />
                                <label className="form-check-label">
                                  Edible
                                </label>
                              </div>
                              <div className="col-md-6 form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="product_type"
                                  value="non-edible"
                                />
                                <label className="form-check-label">
                                  Non-Edible
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">
                            Product Weight Type
                          </label>
                          <div className="col-sm-9">
                            {/* <div onChange={this.onChange}> */}
                            <div>
                              <div
                                className="row"
                                onChange={this.addPrdOnChange}
                              >
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="product_weight_category"
                                      value="kilogram"
                                    />
                                    <label className="form-check-label">
                                      Kilogram
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="product_weight_category"
                                      value="gram"
                                    />
                                    <label className="form-check-label">
                                      Gram
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="product_weight_category"
                                      value="litre"
                                    />
                                    <label className="form-check-label">
                                      Litre
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="product_weight_category"
                                      value="ml"
                                    />
                                    <label className="form-check-label">
                                      Mili-Litre
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="product_weight_category"
                                      value="pieces"
                                    />
                                    <label className="form-check-label">
                                      Pieces
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">
                            Product Weight / Pieces per qty
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="number"
                              className="form-control"
                              name="product_weight_per_quantity"
                              value={product_weight_per_quantity}
                              onChange={this.addPrdOnChange}
                            />{" "}
                            {/* value={product_weight_per_quantity} onChange={this.onChange} */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="row totalCardArea">
                    <div className="col-9">
                      <h3>
                        Product Total Price :<br></br>
                        <b>{this.state.totalPrice}</b>
                      </h3>
                    </div>
                    <div className="col-3">
                      <button
                        onClick={this.addPrdToList}
                        className="btn btn-success"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => ({
  suppliers: state.supplier.suppliers,
  products: state.product.products,
  profile: state.auth.user_profile,
});

export default connect(mapStatetoProps, {
  createPurchase,
  getSuppliers,
  getProducts,
})(PurchaseBilling);
