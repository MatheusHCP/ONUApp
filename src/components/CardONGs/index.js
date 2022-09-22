import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Card, Title, Paragraph, Button} from 'react-native-paper'


export function CardONGs(){

    const navigation = useNavigation();

return (
   <Card style={styles.card} >
    <Card.Content>
      <Title>SOS Amazonia</Title>
      <Paragraph>ONG de Combate ao desmatamento na Amazônia</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button onPress={() => {navigation.navigate('MaisInformacoes')}}>Mais informações</Button>
    </Card.Actions>
   </Card>
  );
}


const styles = StyleSheet.create({
    card:{
        marginBottom: 30
    }
})