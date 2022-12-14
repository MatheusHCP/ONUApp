import react, { useContext } from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from "../pages/login";
import Inicio from "../pages/inicio";
import maisInformacoes from "../pages/maisInformacoes";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { Registro } from "../pages/registro";
import { AuthContext } from "../context/auth";
import { CriarPublicacao } from "../pages/DrawerScreens/CriarPublicacao";
import { DrawerMenu } from "../components/DrawerMenu";
import { AlterarPostagem } from "../pages/AlterarPostagem";




function DrawerNavigator(){
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    const {user,logout} = useContext(AuthContext);

    return(
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props}/>} >
            <Drawer.Screen
                name="DrawerInicio"
                component={Inicio}
                options={{
                    title: "ONGs de Preservação",
                    headerRight: () => (
                        user != null ?
                        <Icon name="logout" size={24} onPress={() => {logout()}} />
                        :
                        <Icon name="login" size={24} onPress={() => navigation.navigate('Login')}/>
                    ),
                    unmountOnBlur: true

                }}
            />
            {user != null &&
            (
                <Drawer.Screen
                    name="CriarPublicacao"
                    component={CriarPublicacao}
                    options={{
                        title: "Criar Publicação",
                        headerRight: () => (
                            <Icon name="logout" size={24} onPress={() => {logout()}} />
                        )
                    }}
                />
            )}
        </Drawer.Navigator>
    )

}



export default function RoutesNavigator(){
    
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="DrawerScreens"
            component={DrawerNavigator}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            />
            <Stack.Screen
            name="MaisInformacoes"
            component={maisInformacoes}
            options={{
                title: "Mais Informações"
            }}
            />
            <Stack.Screen
            name="Registrar"
            component={Registro}
            options={{
                title: "Registre-se"
            }}
            />
            <Stack.Screen
            name="AlterarPostagem"
            component={AlterarPostagem}
            options={{
                title: "Alterar Publicação"
            }}
            />
        </Stack.Navigator>
        
    )
}

