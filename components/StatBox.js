import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import textStyles from '../styles/TextStyles';
import ChangeStatModal from './ChangeStatModal';

const StatBox = (props) => {
    const [statValue, setStatValue] = useState(props.num);
    const [isChangeStat, setIsChangeStat] = useState(false);

    const statChangeView = (visible) => {
        setIsChangeStat(visible);
    }

    const changeStatValue = (newStat) => {
        if(newStat !== '')
            setStatValue(newStat);
        setIsChangeStat(false);
    }

    return(
        <View style={styles.statBox}>
            <Text style={textStyles.mainText}>
                {props.name}
            </Text>
            <TouchableOpacity onPress={() => {statChangeView(true)}}>
                <View style={styles.numBox}>
                    <Text style={textStyles.mainText}>
                        {statValue}
                    </Text>
                </View>
            </TouchableOpacity>
            <ChangeStatModal visible={isChangeStat} setVisible={statChangeView} changeStat={changeStatValue}/>
        </View>
    )
}

StatBox.defaultProps = {
    name: 'N/A',
    num: '10'
}

const styles = StyleSheet.create({
    statBox: {
        backgroundColor:'#29293d',
        width: 100,
        height:100,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: 'white',
        borderWidth: 2,
        padding: 10,
        marginTop:10
    },
    numBox: {
        backgroundColor:'#404040',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        padding: 10,
        margin: 10,
    }
})

export default StatBox;