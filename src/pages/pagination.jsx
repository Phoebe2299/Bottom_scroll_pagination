import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'

class Pagination extends React.Component{
    constructor(){
    super();
    this.state = {
            skip:10,
            limit:15,
            total:0,
            display_data:[],
            api_error:"",
            loading1:true,
            loading2:false
        }
        this.fetch_data(0,this.state.limit);
        window.addEventListener("scroll", this.handleScroll);
    
    };

    fetch_data = async (skip,limit) =>{
        try {
            const res = await axios.get("https://dummyjson.com/products",{ params : {skip:skip, limit: limit}})
            this.setState({
                display_data:[...this.state.display_data, ...res.data.products],
                total:res.data.total,
                loading1:false,
                loading2:false
            })
        console.log(res.data);
        } catch (error) {
            this.setState({api_error:error.message, loading2:false, loading1:false,})
            console.log(error);
        }
    }

    handleScroll = () => { 
        this.setState({loading2:true})
        let userScrollHeight = window.innerHeight + window.scrollY;
            let windowBottomHeight = document.documentElement.offsetHeight;
            if (userScrollHeight >= windowBottomHeight) {
                this.setState({skip:this.state.skip + 5})
                if(this.state.total <= this.state.skip){
                    console.log("no more data")
                    this.setState({loading2:false})
                }
                else{
                    this.fetch_data(this.state.skip + 5, 5);
                }
            }
    };

    render(){
        return<> 
        <h1 className='heading'>Products</h1>
        { this.state.api_error !== "" && <h5 className="title">{this.state.api_error}</h5> }
        { this.state.loading1 === true && this.state.api_error === "" && <h5 className="loading">.......Loading</h5> }
        <div className='container main_container'>
            <div className='row custom_row' >
            { this.state.display_data.map((item,i) =>(
                <div key={i} className='col-lg-4 col-md-6 col-sm-12 main'>
                    <div className='image_container'>
                        <img alt="product_image" className='image' src={item.images ? item.images[0] : ""} />
                    </div>
                    <p className='title'>{item.title}</p>
                </div>
                ))}
            </div>
        </div>
        { this.state.loading2 === true && <h5 className="loading2">.......Loading</h5> }
        
        </>
    }
}

export default Pagination