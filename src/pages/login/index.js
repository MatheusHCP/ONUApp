import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../config/firebase'
import { AuthContext } from "../../context/auth";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("Teste2@teste.com");
  const [senha, setSenha] = useState("123123");
  const [visivel, setVisivel] = useState(false);
  const {setUser} = useContext(AuthContext);


  const logar = () => {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(async (response) => {
      firebase.database().ref('usuarios/' + response.uid).once("value", snap => {
        setUser(snap)
    })
      navigation.goBack();
    })
    .catch(() => {mostrarSnack()});
  };

  const mostrarSnack = () => setVisivel(true);

  const fecharSnack = () => setVisivel(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formularioLogin}>
        <Text>Efetue login para acessar plataforma</Text>
        <View>
          <TextInput
            label="Email"
            style={styles.textInputs}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Senha"
            style={styles.textInputs}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        <Button
          mode={"outlined"}
          textColor="#4c633c"
          style={styles.buttonLogin}
          onPress={logar}
        >
          Logar
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Registrar");
          }}
          mode={"outlined"}
          textColor="#4c633c"
          style={styles.buttonLogin}
        >
          Registrar
        </Button>
      </View>
      <Snackbar
        visible={visivel}
        onDismiss={fecharSnack}
        action={{ label: 'Fechar' }}>
        Nome de usuário e/ou senha incorretos!
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  formularioLogin:{
    width:  "85%",
  },
  textInputs:{
    marginTop: "8%",
  },
  buttonLogin:{
    marginTop: "8%",
    borderColor: "#4c633c"
  }
});
