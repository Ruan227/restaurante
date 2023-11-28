import { createStackNavigator } from '@react-navigation/stack';
import CardapioLista from './cardapioLS'; 
import FormItemCardapio from './cardapioFR'; // Renomeado de FRcliente para FormItemCardapio

const Stack = createStackNavigator();

export default function NavegacaoCardapio() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='ListaCardapio'
    >
      <Stack.Screen name='ListaCardapio' component={CardapioLista} />
      <Stack.Screen name='FormItemCardapio' component={FormItemCardapio} />
    </Stack.Navigator>
  );
}
