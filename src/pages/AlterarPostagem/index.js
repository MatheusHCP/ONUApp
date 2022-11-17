import React, { useState } from "react";
import {  Alert, StyleSheet, View } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "../../config/firebase";

export function AlterarPostagem({route}) {
  const {postagem} = route.params;

  const [nomeONG, setNomeONG] = useState(postagem.nomeONG);
  const [linkONG, setLinkONG] = useState(postagem.linkONG);
  const [quemSomos, setQuemSomos] = useState(postagem.quemSomosONG);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  function AlterarPublicacao(){
    firebase.database().ref('posts/').child(postagem.key).update({
      nomeONG: nomeONG,
      linkONG: linkONG,
      quemSomosONG: quemSomos
    }).then(resp => {
      Alert.alert("Publicação alterada com sucesso!")
      navigation.goBack();
    })
  }

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}} extraHeight={160} >
      <View style={styles.form}>
        <View style={styles.areaCampo}>
          <Text>Nome da ONG</Text>
          <TextInput  value={nomeONG} onChangeText={setNomeONG} placeholder="Nome da ONG" />
        </View>
        <View style={styles.areaCampo}>
          <Text>Link do site da ONG</Text>
          <TextInput value={linkONG}  onChangeText={setLinkONG} placeholder="Ex: http://www.google.com.br" />
        </View>
        <View style={styles.areaCampo}>
          <Text>Quem Somos (Descrição da ONG)</Text>
          <TextInput value={quemSomos} multiline  onChangeText={setQuemSomos} placeholder="Informe uma descrição para ONG" />
        </View>
        {refreshing ?
          <ActivityIndicator />
        : (
          <Button mode={"outlined"} style={{marginTop: 20}} onPress={AlterarPublicacao}>Alterar</Button>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  imagem: {
    width: 200,
    height: 150,
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    flexDirection: "column",
    flex: 2,
    width: "82%",
    marginTop: '20%',
  },
  areaCampo: {
    width: "100%",
    marginBottom: "5%",
  },
  touchPhoto: {
    backgroundColor: "purple",
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 15,
  },
});
