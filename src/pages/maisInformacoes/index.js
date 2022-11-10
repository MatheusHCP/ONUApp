import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import Unorderedlist from "react-native-unordered-list";
import firebase from "../../config/firebase";



export default function MaisInformacoes({route}) {

  const {dados, imagePreview} = route.params;
  const [arrayImagens, setArrayImagens] = useState([]);



  
  function acessarPagina() {
    Linking.openURL(dados.val().linkONG);
  }

  function carregaImagens(){
    setArrayImagens([])
    for (let i = 0; i < dados.val().qtdImagens ; i++) {
      firebase.storage().ref(`posts/galeria/${dados.val().key}/`).child(i.toString()).getDownloadURL()
      .then(res => {
       setArrayImagens(prevState => [...prevState, res])
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    carregaImagens()
  },[])


  return (
    <View style={styles.Container}>
      <View style={styles.areaScroll}>
        <ScrollView>
          <View style={styles.areaHeader}>
            <Image
              source={{ uri: imagePreview }}
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
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={arrayImagens}
            // style={{
            //   width: '100%',
            //   height: 200
            // }}
            renderItem={({item}) => 
              <Image
                source={{uri: item}}
                style={{width: 100, height: 100, marginRight: 20}}
              />
            }
            />
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
