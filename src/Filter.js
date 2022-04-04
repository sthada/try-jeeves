import React, { Component } from "react";
import { connect } from "react-redux";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import "./App.css";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  onClickGetDetails,
  onClickApplyFilter,
  getValidCurrCodes,
} from "./redux/action/service";
import { bindActionCreators } from "redux";
import { getValidCurrencies } from "./Curr.util";

const dropdownStyles = {
  dropdown: { width: 400 },
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      baseCurr: "",
      targetCurr: "",
      availableCurr: getValidCurrencies(this.props.validCurr),
      conversionObject: { base: "", target: "", amount: "" },
      convertedAmountObject:{conversion_rate:"", conversion_result:""}
    };
    this.resetAll=this.resetAll.bind(this);
  }
  
  static getDerivedStateFromProps(props, state){
    return { convertedAmountObject: props.convertedAmountObject ? props.convertedAmountObject : {conversion_rate:"", conversion_result:""}}
}

    resetAll (){
        this.setState({
        convertedAmountObject:{...this.state.convertedAmountObject,conversion_rate:"", conversion_result:""}})
    }

  render() {
    const { validCurr} = this.props;
    const { conversion_rate, conversion_result } = this.state.convertedAmountObject;

    return (
      <div className="content-left-pane">
        <h2>Filters</h2>
        <Dropdown
          placeholder="Convert From"
          label="Base"
          defaultSelectedKeys={this.state.baseCurr}
          styles={dropdownStyles}
          options={getValidCurrencies(validCurr)}
          onChange={(event, item) => {
            this.resetAll();
            this.setState({
              baseCurr: item,
              conversionObject: {
                ...this.state.conversionObject,
                base: item.key
              },
            });
          }}
        />
        <TextField
          label="Amount"
          value={this.state.amount}
          onChange={(event) => {
            this.resetAll();
            this.setState({
              amount: event.target.value,
              conversionObject: {
                ...this.state.conversionObject,
                amount: event.target.value,
              },
            });
          }}
        />
        <Dropdown
          placeholder="Convert To"
          label="Target"
          defaultSelectedKeys={this.state.targetCurr}
          styles={dropdownStyles}
          options={getValidCurrencies(validCurr)}
          onChange={(event, item) => {
            console.log(item);
            this.resetAll();
            this.setState({
              targetCurr: item,
              conversionObject: {
                ...this.state.conversionObject,
                target: item.key,
              },
            });
          }}
        />
        <br />
        <DefaultButton
          text="Reset Filters"
          checked={true}
          onClick={() => {
            this.setState({
              amount: "",
              baseCurr: "",
              targetCurr: "",
              conversionObject: { base: "", target: "", amount: "" },
              convertedAmountObject:{conversion_rate:"", conversion_result:""}
            });
          }}
        />
        <br />
        <br />
        <PrimaryButton
          text="Convert"
          checked={true}
          onClick={() => {
            console.log(this.state.conversionObject);
            this.props.onClickApplyFilter(this.state.conversionObject);
          }}
        />
        <br />
        <br />{conversion_rate && <TextField
          disabled
          label="Conversion Rate"
          value={conversion_rate || "no rate"}
        />}
        
        <br />{conversion_result && 
        <TextField
          disabled
          label="Converted Amount"
          value={conversion_result || "no result"}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currDetail: state.currDetail,
    validCurr: state.validCurr,
    convertedAmountObject: state.convertedAmountObject
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onClickGetDetails,
      onClickApplyFilter,
      getValidCurrCodes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
