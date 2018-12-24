import React from "react";
import {View,Text,StyleSheet} from 'react-native'
import {getStyle} from '../../utils'

const REQUIRED_FIELD_SYMBOL = "*";
function TitleField(props) {
  const { id, title, required,styleSheet } = props;
  let widgetStyle=(styleName)=>getStyle(styleSheet,styleName,"TitleField")
  return (
    <View id={id} style={[styles.container,widgetStyle('container')]}>
    <Text style={[styles.text,widgetStyle('text')]}>{title}{required && " " +  REQUIRED_FIELD_SYMBOL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginTop:10,
    marginBottom:10,
    alignItems: 'center',
  },
  text:{
    fontSize:20
  }
})

export default TitleField;
