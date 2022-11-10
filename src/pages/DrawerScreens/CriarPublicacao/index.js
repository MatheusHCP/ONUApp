import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/AntDesign";
import { RenderImagem } from "../../../components/listaImagens";
import firebase from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/auth";

export function CriarPublicacao() {
  const [nomeONG, setNomeONG] = useState("");
  const [linkONG, setLinkONG] = useState("");
  const [quemSomos, setQuemSomos] = useState("");
  const [imagem, setImagem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [imagens, setImagens] = useState([]);
  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  async function selecionarFoto() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.cancelled) {
      setImagem(resultado.uri);
    }
  }

  async function adicionarFotos() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!resultado.cancelled) {
      setImagens([...imagens, resultado.uri]);
    }
  }

  function removerImagem(index){
    setImagens(prevState => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  }


  async function salvarPost(){
    setRefreshing(true);
    let ImagemONG = await fetch(imagem);
    let blobImagemONG = await ImagemONG.blob();

    const postagem = await firebase.database().ref('posts').push();

    postagem.set({
      linkONG: linkONG,
      nomeONG: nomeONG,
      quemSomosONG: quemSomos,
      uidCriador: user.val().uid,
      key: postagem.key,
      qtdImagens: imagens.length
    })
    .then(response => {
      if(imagem != null){
        firebase.storage().ref('posts/principal/')
        .child(postagem.key).put(blobImagemONG);
      }
      if(imagens.length > 0){
        imagens.forEach(async (item, index) => {
          const imagemfetch = await fetch(item);
          const blobImagem = await imagemfetch.blob();
          firebase.storage().ref('posts/galeria/')
          .child(postagem.key).child(`${index}`).put(blobImagem);
        })
      }
      setNomeONG("");
      setImagem(null);
      setImagens([]);
      setLinkONG("");
      setQuemSomos("");
      setRefreshing(false)
      navigation.navigate('DrawerInicio');
    })
    .catch(err => {
      console.error(err)
      setRefreshing(false)
    })
    .finally(
      setRefreshing(false)
    );
  }



  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Criar Publicação ONG</Text>
        <Image
          style={styles.imagem}
          source={
            imagem ? { uri: imagem } : require("../../../../assets/nofoto.png")
          }
        />
        <TouchableOpacity style={styles.touchPhoto} onPress={selecionarFoto}>
          <Icon name="picture" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={styles.areaCampo}>
          <Text>Nome da ONG</Text>
          <TextInput  value={nomeONG} onChangeText={setNomeONG} />
        </View>
        <View style={styles.areaCampo}>
          <Text>Link do site da ONG</Text>
          <TextInput value={linkONG}  onChangeText={setLinkONG} />
        </View>
        <View style={styles.areaCampo}>
          <Text>Quem Somos (Descrição da ONG)</Text>
          <TextInput value={quemSomos}  onChangeText={setQuemSomos} />
        </View>
        <Button mode={"outlined"} onPress={adicionarFotos}>
          Adicionar Imagens
        </Button>
        <FlatList
          data={imagens}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => 
            <RenderImagem imagem={item} removerItem={() => removerImagem(index)} />
          }
        />
        {refreshing ?
          <ActivityIndicator />
        : (
          <Button mode={"outlined"} style={{marginTop: 20}} onPress={salvarPost}>Publicar</Button>
        )}
      </View>
    </ScrollView>
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
