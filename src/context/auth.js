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
    navigation.navigate("Login")
  }


  useEffect( () => {
    firebase.auth().onAuthStateChanged((usuarioLogado) => {
      setUser(usuarioLogado);
    });
  }, []);

  return (
    <AuthContext.Provider 
      value={{user, nomeUsuario, setNomeUsuario, logout}}>
      {children} 
    </AuthContext.Provider>
  );

}

export default AuthContextProvider;
