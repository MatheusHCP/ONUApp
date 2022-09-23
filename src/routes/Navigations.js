import react from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from "../pages/login";
import Inicio from "../pages/inicio";
import maisInformacoes from "../pages/maisInformacoes";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";




function DrawerNavigator(){
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()

    return(
        <Drawer.Navigator>
            <Drawer.Screen
                name="DrawerInicio"
                component={Inicio}
                options={{
                    title: "ONGs de Preservação",
                    headerRight: () => (
                        <Icon name="logout" size={24} onPress={() => {navigation.navigate('Login')}} />
                    )
                }}

            />
        </Drawer.Navigator>
    )

}



export default function RoutesNavigator(){
    
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="DrawerScreens"
            component={DrawerNavigator}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="MaisInformacoes"
            component={maisInformacoes}
            options={{
                title: "Mais Informações"
            }}
            />
        </Stack.Navigator>
        
    )
}

