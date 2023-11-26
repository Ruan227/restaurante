import { createStackNavigator } from '@react-navigation/stack'
import LSReserva from './reservaFR'
import LSReservas from './reservaLS'


const Stack = createStackNavigator()


export default function NVreserva() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCliente'
        >

            <Stack.Screen name='ListaCliente' component={LSReservas} />

            <Stack.Screen name='FormReserva' component={LSReserva} />

        </Stack.Navigator>

    )
}