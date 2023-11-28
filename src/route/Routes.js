import { createStackNavigator } from '@react-navigation/stack'
import NVreserva from '../screens/Reserva/reservaNV'
import NVFuncionario from '../screens/Funcionarios/funcionarioNV' //ok
import NVpedidos from '../screens/Pedido/pedidoNV' //ok
import NavegacaoCardapio from '../screens/Cardapio/cardapioNV' //ok
import NVcliente from '../screens/Clientes/clienteNV' //ok


const Stack = createStackNavigator()

export default function Rota() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='NVpedidos'
        >

            <Stack.Screen name='NVpedidos' component={NVreserva} />


        </Stack.Navigator>

    )
}