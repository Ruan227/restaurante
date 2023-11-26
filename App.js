import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Rota from './src/route/Routes';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Rota/>
      </NavigationContainer>
    </PaperProvider>
  );
}