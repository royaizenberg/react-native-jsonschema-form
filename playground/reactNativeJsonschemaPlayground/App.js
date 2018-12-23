import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert} from 'react-native';
import Form from 'react-native-jsonschema-form'
import jsonSchema from './jsonSchema'


const workSchema = jsonSchema

function transformErrors(errors) {
  let reterrors=_.filter(errors,error => {
    console.log("eror",error.property)
    // return true
    return (error.message=="is a required property")
    
    // return  (!(error && error.property === ".properties['viniButton'].type") )
  })
  return reterrors
}

export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.notch}></View>
        <Form 
        schema={workSchema.schema} 
        // transformErrors={transformErrors} 
        onSubmit={(submited)=>{
          Alert.alert(
           "u just submitted",
            JSON.stringify(submited.formData)          )
        }}
        uiSchema={{...workSchema.uiSchema}}
        submitTitle={"בחר"}
        noValidate={false}
        liveValidate={true}
        showErrorList={false} 
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding:20
  },
  notch:{
    width:"100%" ,
     height:15
    }
});

