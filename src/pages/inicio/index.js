import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import {Text} from 'react-native-paper'
import { CardONGs } from '../../components/CardONGs';

const dados = [1, 2, ,3 ,4 , 5]


export default function Inicio(){
return (
   <View style={styles.container}>
    <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Doadores</Text> 
    </View>
    <FlatList
    data={dados}
    renderItem={({item}) => (
        <CardONGs/>
    )}
    showsVerticalScrollIndicator={false}
    />
   </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        justifyContent: 'center'
    },
    viewTitulo: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
})