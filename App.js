import { NavigationContainer } from '@react-navigation/native';
import RoutesNavigator from './src/routes/Navigations';

export default function App() {
  return (
    <NavigationContainer>
      <RoutesNavigator/>
    </NavigationContainer>
  );
}
