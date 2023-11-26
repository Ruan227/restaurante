import { createStackNavigator } from '@react-navigation/stack'
import LSFuncionario from './funcionarioLS'
import FRFuncionario from './funcionarioFR'


const Stack = createStackNavigator()

export default function NVFuncionario() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='ListaFuncionario'
    >
      <Stack.Screen name='ListaFuncionario' component={LSFuncionario} />
      <Stack.Screen name='FormFuncionario' component={FRFuncionario} />
    </Stack.Navigator>
  )
}
