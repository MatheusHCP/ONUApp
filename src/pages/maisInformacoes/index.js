import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Text } from "react-native-paper";
import Unorderedlist from "react-native-unordered-list";



export default function MaisInformacoes({route}) {

  const {dados} = route.params;

  function acessarPagina() {
    Linking.openURL(dados.val().linkONG);
  }

  return (
    <View style={styles.Container}>
      <View style={styles.areaScroll}>
        <ScrollView>
          <View style={styles.areaHeader}>
            <Image
              source={{ uri: "https://picsum.photos/700" }}
              style={styles.imageStyle}
            />
            <Text
              style={[styles.titulo, { marginLeft: "5%", marginTop: "3%" }]}
            >
              {dados.val().nomeONG}
            </Text>
          </View>
          <View style={styles.areaBody}>
            <Text style={styles.titulo}>Quem Somos</Text>
            <Text style={styles.texto}>
            {dados.val().quemSomosONG}
            </Text>
          </View>
          <View style={styles.areaBody}>
            <Text style={[styles.titulo, {marginBottom: 10}]}>Imagens</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image
                source={{ uri: "https://picsum.photos/700" }}
                style={{width: 100, height: 100}}
              />
              <Image
                source={{ uri: "https://picsum.photos/700" }}
                style={styles.imagemScroll}
              />
              <Image
                source={{ uri: "https://picsum.photos/700" }}
                style={styles.imagemScroll}
              />
              <Image
                source={{ uri: "https://picsum.photos/700" }}
                style={styles.imagemScroll}
              />
              <Image
                source={{ uri: "https://picsum.photos/700" }}
                style={styles.imagemScroll}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.AreaDoacao}>
        <Text>Acesse a página de doação da ONG</Text>
        <TouchableOpacity style={styles.botaoAcessar} onPress={acessarPagina}>
          <Text>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  areaHeader: {
    height: 200,
    marginBottom: "15%",
  },
  areaBody: {
    marginHorizontal: "5%",
    marginTop: "3%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  AreaDoacao: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "7%",
    paddingBottom: 20,
    justifyContent: "space-between",
    backgroundColor: "#A7A7A7",
  },
  imagemScroll:{
    width: 100,
    height: 100,
    marginLeft: 20
  },
  areaScroll: {
    flex: 1,
  },
  botaoAcessar: {
    backgroundColor: "green",
    width: 80,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  ordered: {
    marginTop: "2%",
  },
});
