import { createStackNavigator } from '@react-navigation/stack'
import NVcliente from '../screens/Clientes/clienteNV.js'
import NVreserva from '../screens/Reserva/reservaNV.js'
import NVpedidos from '../screens/Pedido/pedidoNV.js'


const Stack = createStackNavigator()

export default function Rota() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='NVpedidos'
        >

            <Stack.Screen name='NVpedidos' component={NVpedidos} />


        </Stack.Navigator>

    )
}