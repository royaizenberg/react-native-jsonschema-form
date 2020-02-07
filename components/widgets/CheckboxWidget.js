import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from 'react-native-check-box'
import {getStyle} from '../../utils'

function CheckboxWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
    styleSheet
  } = props;
  let checkValue = typeof value === "undefined" ? false : value
  let widgetStyle=(styleName)=>getStyle(styleSheet,styleName,"CheckboxWidget")
  return (
    // className={`checkbox ${disabled || readonly ? "disabled" : ""}`}
    <View style={[styles.container,widgetStyle('container')]}>
      {schema.description && (
        <DescriptionField description={schema.description} />
      )}
      <CheckBox
        id={id}
        unCheckedImage={<View style={{width:22,height:22,backgroundColor:'white'}}/>}
        type="checkbox"
        uncheckedCheckBoxColor={'#6DA1B7'}
        checkedCheckBoxColor={'#6DA1B7'}
        id={id}
        required={required}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        onClick={() => { onChange(!checkValue) }}
        isChecked={checkValue}
      />
      <Text style={[styles.text,widgetStyle('text')]} >{label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 5,
    justifyContent: 'space-between',
  },
  text:{
    fontWeight:'100',
    width:'85%', 
    textAlign:'left'
  },
  
})

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;
