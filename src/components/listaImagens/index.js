import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export function RenderImagem({imagem, removerItem}){
return (
   <ImageBackground source={{uri: imagem}} style={styles.imagens} >
    {removerItem && (
      <TouchableOpacity style={styles.touchDelete} onPress={removerItem} >
        <MaterialIcons size="24" name="close" color="white" />
      </TouchableOpacity>
    )}
   </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  touchDelete:{
    backgroundColor: 'red',
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -15
  },
  imagens:{
    width: 100,
    height: 100,
    marginRight: 20,
    marginTop: 20,
  }


});