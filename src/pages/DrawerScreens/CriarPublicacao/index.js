import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export function CriarPublicacao(){
return (
   <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Criar Publicação ONG</Text>
        <Image style={styles.imagem} source={require('../../../../assets/nofoto.png')}/>
      </View>
      <View style={styles.form}>
        <View style={styles.areaCampo} >
          <Text>
            Nome da ONG
          </Text>
          <TextInput/>
        </View>
        <View style={styles.areaCampo}>
          <Text>
            Quem Somos (Descrição da ONG)
          </Text>
          <TextInput/>
        </View>
        <View style={styles.areaCampo}>
          <Text>
            Programas
          </Text>
          <TextInput/>
        </View>
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
    marginTop: 20,
    flex: 1
  },
  imagem: {
    width: 200,
    height: 150,
    marginTop: 20
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  form:{
    flexDirection: 'column',
    flex: 2,
    width: '82%'
  },
  areaCampo: {
    width: '100%',
    marginBottom: '5%'
  }

});