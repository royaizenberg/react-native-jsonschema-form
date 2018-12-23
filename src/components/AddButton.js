
import React from "react";
import IconButton from "./IconButton";
import {View} from 'react-native'
export default function AddButton({ className, onClick, disabled }) {
  return (
    <View className="row">
        <IconButton
          type="info"
          icon="plus"
          // className="btn-add col-xs-12"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        />
    </View>
  );
}