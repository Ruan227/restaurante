import { createStackNavigator } from '@react-navigation/stack'
import LSPedido from './pedidoLS'
import FRPedidos from './pedidoFR'

const Stack = createStackNavigator()

export default function NVpedidos() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='ListaFuncionario'
    >
      <Stack.Screen name='Listapedido' component={LSPedido} />
      <Stack.Screen name='Formpedio' component={FRPedidos} />
    </Stack.Navigator>
  )
}
