import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper'
import firebase from '../../config/firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../../context/auth';


export function CardONGs({data}){
    const navigation = useNavigation();
    const [imagePreview, setImagePreview] = useState();
    const {user} = useContext(AuthContext);

  useEffect(() => {
    firebase.storage().ref('posts/principal/').child(data.val().key).getDownloadURL().then(response => {
      setImagePreview(response)
    })
    .catch(err => {
      return;
    });
  },[])


  async function ExcluirPostagem(){
    firebase.database().ref('posts/').child(data.val().key).remove().then(resp => {
      Alert.alert('Postagem excluida com sucesso!')
    })
  }

  function DialogExcluir(){
    Alert.alert("Apagar postagem", "Deseja excluir a postagem?", [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => ExcluirPostagem()
      }
    ])
  }

  




return (
   <Card style={styles.card} >
    <Card.Content>
      <Title style={{fontWeight: '600'}}>{data.val().nomeONG}</Title>
      <Paragraph numberOfLines={3}>{data.val().quemSomosONG}</Paragraph>
    </Card.Content>
    <Card.Cover source={ imagePreview ? { uri: imagePreview } : require('../../../assets/nofoto.png')} />
    <Card.Actions>
      {
        user?.snap.val().uid == data.val().uidCriador && (
          <>
            <AntDesign name='edit' color="orange" size={28} style={{marginRight: 30}} onPress={() => {navigation.navigate('AlterarPostagem', {postagem: data.val()})}}/>
            <AntDesign name='close' color='red' size={28} style={{marginRight: 10}} onPress={DialogExcluir}/>
          </>
        )
      }
      <Button onPress={() => {navigation.navigate('MaisInformacoes', {dados: data.val(), imagePreview})}}>Mais informações</Button>
    </Card.Actions>
   </Card>
  );
}


const styles = StyleSheet.create({
    card:{
        marginBottom: 30,
        width: 350
    },

})