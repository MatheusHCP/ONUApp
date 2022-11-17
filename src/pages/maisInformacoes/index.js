import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import firebase from "../../config/firebase";



export default function MaisInformacoes({route}) {

  const {dados, imagePreview} = route.params;
  const [arrayImagens, setArrayImagens] = useState([]);
  const [nomePublicado, setNomePublicado] = useState('');
  const [fotoPublicado, setFotoPublicado] = useState(null);


  function dadosPublicadoPor(){
    firebase.database().ref('usuarios/').child(dados.uidCriador).once('value', (snapshot) => {
      setNomePublicado(snapshot.val().nome)
    })
    firebase.storage().ref('usuarios/').child(dados.uidCriador).getDownloadURL().then(resp => {
      setFotoPublicado(resp)
    })
    .catch(err => {
      return;
    })
  }

  
  function acessarPagina() {
    if(dados.linkONG.toLowerCase().includes('https://') || dados.linkONG.toLowerCase().includes('http://')){
      Linking.openURL(dados.linkONG);
    }
    else{
      Alert.alert('Link fornecido não se encontra no padrão correto.')
    }
  }

  function carregaImagens(){
    setArrayImagens([])
    for (let i = 0; i < dados.qtdImagens ; i++) {
      firebase.storage().ref(`posts/galeria/${dados.key}/`).child(i.toString()).getDownloadURL()
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
    dadosPublicadoPor();
  },[])


  return (
    <View style={styles.Container}>
      <View style={styles.areaScroll}>
        <ScrollView>
          <View style={styles.areaHeader}>
            <Image
              source={ imagePreview ? { uri: imagePreview } : require('../../../assets/nofoto.png')}
              style={styles.imageStyle}
            />
            <Text
              style={[styles.titulo, { marginLeft: "5%", marginTop: "3%" }]}
            >
              {dados.nomeONG}
            </Text>
          </View>
          <View style={styles.areaBody}>
            <Text style={styles.titulo}>Quem Somos</Text>
            <Text style={styles.texto}>
            {dados.quemSomosONG}
            </Text>
          </View>
          <View style={styles.areaBody}>
            <Text style={[styles.titulo, {marginBottom: 10}]}>Imagens</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<Text>Não possui imagens.</Text>}
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
          <View style={styles.areaBody}>
            <Text style={[styles.titulo, {marginBottom: 10}]}>Publicado por:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}} >
              <Image source={ fotoPublicado ? {uri: fotoPublicado} : require('../../../assets/nofoto.png')} style={{width: 60, height: 60, borderRadius: 60, marginRight: 20}}/>
              <Text style={{fontSize: 16, fontWeight: '600'}} >{nomePublicado}</Text>
            </View>
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
