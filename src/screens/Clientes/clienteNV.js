import { createStackNavigator } from '@react-navigation/stack'
import LScliente from './clientesLS'
import FRcliente from './clientes.FR'

const Stack = createStackNavigator()


export default function NVcliente() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCliente'
        >

            <Stack.Screen name='ListaCliente' component={LScliente} />

            <Stack.Screen name='FormCliente' component={FRcliente} />

        </Stack.Navigator>

    )
}