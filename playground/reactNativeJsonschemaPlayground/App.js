import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView, TouchableOpacity,Alert } from 'react-native'
import { samples } from "./samples";
import Form from 'react-native-jsonschema-form'


function transformErrors(errors) {
    let reterrors = _.filter(errors, error => {
        console.log("eror", error.property)
        // return true
        return (error.message == "is a required property")

        // return  (!(error && error.property === ".properties['viniButton'].type") )
    })
    return reterrors
}

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            workSchema:null
        }
    }


    renderItem(item) {
        console.log("object", item)
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => this.changeSchema(item)} >
                <Text style={styles.textItem}>{item}</Text>
            </TouchableOpacity>
        )
    }
    changeSchema(item) {
       this.setState({
           workSchema:samples[item]
       })
    }
    exitForm(){
        this.setState({workSchema:null})
    }

    renderForm() {
        return (
            <ScrollView style={styles.schema}>
            <Text onPress={() => {this.exitForm()}} style={styles.exitForm} >x</Text>
            <Form
                schema={this.state.workSchema.schema}
                // transformErrors={transformErrors} 
                onSubmit={(submited) => {
                    Alert.alert(
                        "u just submitted",
                        JSON.stringify(submited.formData))
                        this.setState({workSchema:null})
                }}
                uiSchema={{ ...this.state.workSchema.uiSchema }}
                submitTitle={"בחר"}
                noValidate={false}
                liveValidate={true}
                showErrorList={false}
            />
            </ScrollView>
        )
    }


    render() {
        if(this.state.workSchema!=null)
             return this.renderForm()
        else
            return this.renderList()
    }
    renderList()
    {
        const list = Object.keys(samples)
        return (
            <View style={styles.container}>
                <Text style={styles.title}> {'React Native\nJSONSchema samples'} </Text>
                <View style={styles.content}>
                    <FlatList
                        data={list}
                        renderItem={({ item }) => this.renderItem(item)}
                        contentContainerStyle={{ marginTop: 10  }}
                        keyExtractor={(item, index) => index.toString()}
                    />                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
flex:1
    },
    content: {
        flex:1,

        padding: 15,
        marginBottom: 20,

    },
    title: {
        marginTop: 30,
        fontSize: 25,
        textAlign:'center',
        color:"#6DA1B7"
    },
    textItem: {
        fontSize: 20,
        color:"#6DA1B7",
        borderWidth:1,
        borderColor:'#6DA1B7',
        margin:5,
        padding:3,
        textAlign:'center',
        borderRadius: 6,
        
    },
    schema: {
        marginTop:30,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "ghostwhite",
    },
    exitForm:{
        fontSize:25,
        textAlign:'center',
        position:"absolute",
        top:10,
        right:10,
        zIndex:10,
        width:30,
        height:30,
    }

})

