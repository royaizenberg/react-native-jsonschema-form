import React from "react";
import {View,Text,Button,} from 'react-native'

function ArrayFieldTemplate(props) {
  return (
    <View className={props.className}>
      {props.items &&
        props.items.map(element => (
          <View key={element.index}>
            <View>{element.children}</View>
            {element.hasMoveDown && (
              <Button
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}>
                Down
              </Button>
            )}
            {element.hasMoveUp && (
              <Button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}>
                Up
              </Button>
            )}
            <Button onClick={element.onDropIndexClick(element.index)}>
              Delete
            </Button>
          </View>
        ))}

      {props.canAdd && (
        <View className="row">
          <View className="col-xs-3 col-xs-offset-9 array-item-add text-right">
            <Button onClick={props.onAddClick} type="button">
              Custom +
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

module.exports = {
  schema: {
    title: "Custom array of strings",
    type: "array",
    items: {
      type: "string",
    },
  },
  formData: ["react", "jsonschema", "form"],
  ArrayFieldTemplate,
};
