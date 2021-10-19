import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, Button } from 'react-native';

const ChangeStatModal = (props) => {
    const [statInput, setStatInput] = useState('');

    const statInputHandler = (enteredText) => {
        setStatInput(enteredText);
    };

    return(
        <Modal animationType='slide' visible={props.visible}>
            <View style={styles.container}>
                <TextInput style={styles.input} maxLength={2} placeholder='Stat Value' placeholderTextColor='#a6a6a6' keyboardType='numeric' textAlign='center' onChangeText={statInputHandler}/>
                <View style={styles.buttonContainer}>
                    <Button title="Change" onPress={() => {props.changeStat(statInput)}}/>
                    <Button title="Cancel" onPress={() => {props.setVisible(false)}}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 50,
        backgroundColor:'#404040',
        justifyContent:'center',
        alignItems:'center'
    },
    input: {
        width:"80%",
        padding:10,
        margin:10,
        borderWidth:1,
        borderColor:'white',
        color:'white'
    },
    buttonContainer:{
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-around',

    },
})

export default ChangeStatModal;