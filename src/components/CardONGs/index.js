import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper'
import firebase from '../../config/firebase';


export function CardONGs({data}){
    const navigation = useNavigation();
    const [imagePreview, setImagePreview] = useState();


  useEffect(() => {
    firebase.storage().ref('posts/principal/').child(data.val().key).getDownloadURL().then(response => {
      setImagePreview(response)
    });
  },[])

return (
   <Card style={styles.card} >
    <Card.Content>
      <Title style={{fontWeight: '600'}}>{data.val().nomeONG}</Title>
      <Paragraph numberOfLines={3}>{data.val().quemSomosONG}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: imagePreview }} />
    <Card.Actions>
      <Button onPress={() => {navigation.navigate('MaisInformacoes', {dados: data, imagePreview})}}>Mais informações</Button>
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