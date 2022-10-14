import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./src/context/auth";
import RoutesNavigator from "./src/routes/Navigations";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <RoutesNavigator />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
