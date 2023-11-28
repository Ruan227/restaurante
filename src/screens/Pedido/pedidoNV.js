import { createStackNavigator } from '@react-navigation/stack'
import LSPedido from './pedidoLS'
import FRPedidos from './pedidoFR'

const Stack = createStackNavigator()

export default function NVpedidos() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Listapedidos'
    >
      <Stack.Screen name='Listapedidos' component={LSPedido} />
      <Stack.Screen name='Formpedido' component={FRPedidos} />
    </Stack.Navigator>
  )
}
