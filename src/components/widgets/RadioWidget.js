import React from "react";
import PropTypes from "prop-types";
import {View } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

function RadioWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, enumDisabled, inline } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <RadioForm formHorizontal={true} animation={true}>
    {enumOptions.map((option, i) => {
      const checked = option.value === value;
      const itemDisabled =
      enumDisabled && enumDisabled.indexOf(option.value) != -1;
      const disabledCls =
      disabled || itemDisabled || readonly ? "disabled" : "";
      const radio = (
        <RadioButton labelHorizontal={true} key={i} >

      <RadioButtonInput
      obj={option}
      index={i}
      isSelected={checked}
      onPress={_ => onChange(option.value)}
      />
      <RadioButtonLabel
      obj={option}
      index={i}
      labelHorizontal={true}
      labelWrapStyle={{}}
      />
      </RadioButton>);
      return radio;
    })}
    </RadioForm>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
