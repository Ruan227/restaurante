import { createStackNavigator } from '@react-navigation/stack'
import NVreserva from '../screens/Reserva/reservaNV'
import NVFuncionario from '../screens/Funcionarios/funcionarioNV'
import NVpedidos from '../screens/Pedido/pedidoNV'
import NavegacaoCardapio from '../screens/Cardapio/cardapioNV'


const Stack = createStackNavigator()

export default function Rota() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='NVpedidos'
        >

            <Stack.Screen name='NVpedidos' component={NavegacaoCardapio} />


        </Stack.Navigator>

    )
}