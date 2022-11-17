import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { Text, View, Image } from 'react-native';
import IconAnt from '@expo/vector-icons/AntDesign'
import { AuthContext } from '../../context/auth';

export function DrawerMenu(props){

  const {user} = useContext(AuthContext)

return (
   <View style={{flex: 1}}>
    {user && (
      <View style={{paddingTop: '30%', paddingBottom: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#d7b8ff' }}>
        <Image source={ user.fotoPerfil ? {uri: user.fotoPerfil} : require('../../../assets/nofoto.png')} style={{width: 80, height: 80, borderRadius: 40}} />
        <Text style={{marginTop: '5%'}}>{user.snap.val().nome}</Text>
      </View>
    )}
    <DrawerContentScrollView {...props}>
    <DrawerItem
          label="Página Inicial"
          icon={() => (
            <IconAnt
              name="home"
              size={24}
            />
          )}
          onPress={() => {
            props.navigation.navigate('DrawerInicio');
          }}
        />
        {user && (
          <DrawerItem
            label="Criar Publicação"
            icon={() => (
              <IconAnt
                name="plus"
                size={24}
              />
            )}
            onPress={() => {
              props.navigation.navigate('CriarPublicacao');
            }}
          />
        )}
    </DrawerContentScrollView>
   </View>
  );
}