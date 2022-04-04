import React, { Component } from 'react';
import Filter from './Filter';

import { connect } from 'react-redux';
import './App.css';
import { onClickGetDetails, getValidCurrCodes  } from './redux/action/service';
import { bindActionCreators } from 'redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currDetail: []
    };
    this.getValidCurrencies=this.getValidCurrencies.bind(this);
  }
  componentDidMount(){
    this.props.onClickGetDetails("USD");
    this.props.getValidCurrCodes();
  }
  componentDidUpdate(prevProps, prevState){
    if (JSON.stringify(this.props.currDetail) !== JSON.stringify(prevProps.currDetail) ){
      this.setState({
        currDetail: this.props.currDetail
      });
    }
  }
  
  getValidCurrencies(){
    console.log(this.props.validCurr);
    let availableCurr=[];
    this.props.validCurr.forEach(item => availableCurr.push(item[0]+" ("+item[1]+")"))
    return availableCurr;
    
}
  render() {
    return (
      <div className='App'>
          <Filter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currDetail: state.currDetail,
    validCurr:state.validCurr
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({
  onClickGetDetails, getValidCurrCodes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
