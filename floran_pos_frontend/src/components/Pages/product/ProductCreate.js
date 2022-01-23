import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { createProduct } from '../../../actions/product';
import { Redirect } from 'react-router';
export class ProductCreate extends Component {
    state = {
        'product_name':'',
        'product_description':'',
        'product_quantity':0,
        'product_type':'',
        'product_weight_category':'',
        'product_weight_per_quantity':0,
        'product_price':0,
    }

    static propTypes = {
        createProduct: PropTypes.func.isRequired,
    }

    onChange = (e) => 
    {
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    resetState = () => {
        this.setState({
                'product_name':'',
                'product_description':'',
                'product_quantity':0,
                'product_type':'',
                'product_weight_category':'',
                'product_weight_per_quantity':0,
                'product_price':0,
            })

    }

    onSubmit = async(e) =>{
        e.preventDefault();
        var {product_name,product_description,product_quantity,product_type,product_weight_category,product_weight_per_quantity,product_price} = this.state;
        product_quantity = parseInt(product_quantity)
        product_price = parseInt(product_price)
        product_weight_per_quantity = parseInt(product_weight_per_quantity)
        if(product_name && product_description && product_quantity > 0 && product_price > 0){
            const Product = {product_name,product_description,product_quantity,product_type,product_weight_category,product_weight_per_quantity,product_price}
            this.props.createProduct(Product)
        } else {
            alert('Fill the form correctly')
        }
    }
    
    render() {
        const {product_name,product_description,product_quantity,product_price,product_weight_per_quantity} = this.state;

        // check wheather product is created successfully or not
        if(this.props.product_created){
            this.resetState()
            return <Redirect to='/product' />
        }

        return (
            <div className='col-12'>
                <div className="row">
                    <h2>
                        Add New Product
                    </h2>
                </div>
                <div className="card product_card">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Name
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className='form-control' name='product_name' value={product_name} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Description
                                </label>
                                <div className="col-sm-9">
                                    <textarea className='form-control' name='product_description' value={product_description} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Quantity
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className='form-control' name='product_quantity' value={product_quantity} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Type
                                </label>
                                <div className="col-sm-9">
                                    <div onChange={this.onChange}>
                                        <div className="form-check">
                                            <input type="radio" className='form-check-input' name='product_type' value="edible"/>
                                            <label className="form-check-label">Edible</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className='form-check-input' name='product_type' value="non-edible"/>
                                            <label className="form-check-label">Non-Edible</label>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Weight Type
                                </label>
                                <div className="col-sm-9">
                                    <div onChange={this.onChange}>
                                            <div className="form-check">
                                                <input type="radio" className='form-check-input' name='product_weight_category' value="kilogram"/>
                                                <label className="form-check-label">Kilogram</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className='form-check-input' name='product_weight_category' value="gram"/>
                                                <label className="form-check-label">Gram</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className='form-check-input' name='product_weight_category' value="litre"/>
                                                <label className="form-check-label">Litre</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className='form-check-input' name='product_weight_category' value="ml"/>
                                                <label className="form-check-label">Mili-Litre</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className='form-check-input' name='product_weight_category' value="pieces"/>
                                                <label className="form-check-label">Pieces</label>
                                            </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Weight/Pieces per qty
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className='form-control' name='product_weight_per_quantity' value={product_weight_per_quantity} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Product Price
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className='form-control' name='product_price' value={product_price} onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 col-12"></div>
                                <div className="col-md-2">
                                    <input className='btn btn-primary' type='submit' value='Add product'/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    product_created: state.product.product_created
})

export default connect(mapStateToProps, {createProduct})(ProductCreate)
