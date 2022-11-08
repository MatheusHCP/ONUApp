import { DrawerActions, useNavigation } from '@react-navigation/native';
import {useState, useEffect, createContext} from 'react';
import firebase from '../config/firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const navigation = useNavigation();

  function logout(){
    firebase.auth().signOut();
    setUser(null);
    navigation.navigate("Login")
  }


  // useEffect( () => {
  //   firebase.auth().onAuthStateChanged((usuarioLogado) => {
  //     console.log(user.uid)
  //     setUser(usuarioLogado);
  //   });
  // }, []);

  return (
    <AuthContext.Provider 
      value={{user, setUser, logout}}>
      {children} 
    </AuthContext.Provider>
  );

}

export default AuthContextProvider;
