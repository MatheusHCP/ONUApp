import React, { useState, useEffect, useContext } from "react";
import { Image, StyleSheet, View, Dimensions, Alert} from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'
import firebase from '../../config/firebase';
import { AuthContext } from "../../context/auth";
import { useNavigation } from "@react-navigation/native";



export function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imagem, setImagem] = useState(null);
  const {height, width} = Dimensions.get('window');
  let inseriuUsuario = false;
  let usuario = null;
  const {setUser} = useContext(AuthContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false)

  async function solicitaPermissao(){
    const imagePermissao = await ImagePicker.getMediaLibraryPermissionsAsync();
    const locationPermissao = await Location.requestForegroundPermissionsAsync();
  }

useEffect(() => {
  solicitaPermissao();
}, [])

  // async function salvar(){
  //   let db = firebase.database().ref("usuarios");
  //   let usuario = await db.push({
  //     nome: nome,
  //     email: email,
  //     senha: senha,
  //     latitude: latitude ? latitude : "",
  //     longitude: longitude ? longitude : ""
  //   });
  //   let conteudoImagem = await fetch(imagem);
  //   let blob = await conteudoImagem.blob();
  //   firebase.storage().ref("usuarios").child(usuario.key).put(blob);
  //   Alert.alert("Inserido com sucesso!");
  // }

  const salvar = async () => {
    setRefreshing(true)
    await firebase
      .auth().createUserWithEmailAndPassword(email, senha)
      .then(async (response) => {
        usuario = {
          nome: nome,
          email: email,
          latitude: latitude ? latitude : '',
          longitude: longitude ? longitude : '',
          uid: response.uid
        }
        firebase.database().ref('usuarios/').child(response.uid).set(usuario);
        setUser(usuario);
        if (imagem != null) {
          let conteudoImagem = await fetch(imagem);
          let blob = await conteudoImagem.blob();
          firebase.storage().ref('usuarios/')
            .child(response.uid).put(blob);
        }
        setRefreshing(false);
        navigation.navigate('DrawerScreens')
      })
      .catch((error) => {
        setRefreshing(false)
        if (error.code == 'auth/email-already-in-use')
          Alert.alert("Erro ao cadastrar","Este email já foi cadastrado!")
        else if (error.code == 'auth/invalid-email')
          Alert.alert("Erro ao cadastrar","O email informado é inválido!")
        else if (error.code == 'auth/weak-password')
          Alert.alert("Erro ao cadastrar","A senha deve ter ao menos 8 caracteres")
        else 
          Alert.alert("Erro ao cadastrar","Erro ao cadastrar o usuário " + error.code)
      });
  };

  async function selecionarFoto(){
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 0.7
    });
    if(!resultado.cancelled){
      setImagem(resultado.uri)
    }
  }

  async function getLocalizacao(){
    const response = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    },
    (location) => {
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
      response.remove();
    })
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, color: 'purple', fontWeight: '600', marginTop: 20}}>Formulário de Cadastro</Text>
      <View style={styles.formularioRegistro}>
        <TextInput
          label="Nome Completo"
          style={styles.textInputs}
          placeholder="Informe seu nome completo"
          onChangeText={(e) => setNome(e)}
        />
        <TextInput
          label="Email"
          style={styles.textInputs}
          placeholder="Digite seu email"
          keyboardType="email-address"
          onChangeText={(e) => setEmail(e)}

        />
        <TextInput
          label="Senha"
          style={styles.textInputs}
          placeholder="Digite sua senha"
          keyboardType="password"
          secureTextEntry
          onChangeText={(e) => setSenha(e)}
          
        />
      </View>
      <Button
        onPress={() => {getLocalizacao()}}
        icon="map"
        mode={"outlined"}
        textColor="#4c633c"
        style={styles.buttonLogin}
      >
        Registrar localização
      </Button>
      <Button
        onPress={() => {selecionarFoto()}}
        mode={"outlined"}
        icon="image"
        textColor="#4c633c"
        style={styles.buttonLogin}
      >
        Selecionar foto de Perfil
      </Button>
      {latitude && (
        <Text>Latitude: {latitude} | Longitude: {longitude}</Text>
      )}
      {imagem && (
        <Image style={{width: width/2, height: height/4}} source={{uri: imagem}} />
      )}
      {refreshing ? (
        <>
        <ActivityIndicator/>
        <Text>Realizando Cadastro...</Text>
        </>
      ) : (
      <Button
        onPress={() => {salvar()}}
        mode={"outlined"}
        textColor="#4c633c"
        style={styles.buttonLogin}
      >
        Finalizar cadastro
      </Button>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formularioRegistro: {
    width: "85%",
  },
  textInputs: {
    marginTop: "8%",
  },
  buttonLogin: {
    marginTop: "8%",
    borderColor: "#4c633c",
  },
});
