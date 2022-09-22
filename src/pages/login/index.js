import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
          onPress={() => {
            navigation.navigate("DrawerScreens");
          }}
          mode={"outlined"}
          textColor="#4c633c"
          style={styles.buttonLogin}
        >
          Logar
        </Button>
      </View>
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
