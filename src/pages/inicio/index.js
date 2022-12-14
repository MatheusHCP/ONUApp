import React, { useEffect, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import {Text} from 'react-native-paper'
import { CardONGs } from '../../components/CardONGs';
import firebase from '../../config/firebase';



export default function Inicio(){
    
    const [postagens, setPostagens] = useState([]);

    useEffect(() => {
        firebase.database().ref('posts').on('value', (snapshot) => {
            setPostagens([]);
            snapshot.forEach((item) => {
                setPostagens(prevState => [...prevState, item]);
            })
        })
    }, [])
    


return (
   <View style={styles.container}>
    <View style={styles.viewTitulo}>
        <Text style={styles.titulo}>Doadores</Text> 
    </View>
    <FlatList
    data={postagens}
    renderItem={({item}) => (
        <CardONGs data={item}/>
    )}
    ListEmptyComponent={<Text>Não há publicações disponíveis.</Text>}
    showsVerticalScrollIndicator={false}
    style={{
        width: '100%'
    }}
    contentContainerStyle={{
        width: '100%',
        alignItems: 'center'
    }}
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
        justifyContent: 'center',
        color: 'purple'
    },
    viewTitulo: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
})