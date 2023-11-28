import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function LScliente({ navigation, route }) {

  const [clientes, setClientes] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [clienteASerExcluido, setClienteASerExcluido] = useState(null)

  useEffect(() => {
    loadClientes()
  }, [])

  async function loadClientes() {
    const response = await AsyncStorage.getItem('clientes')
    console.log("🚀 ~ file: ListaClientesAsyncStorage.js:21 ~ loadClientes ~ response:", response)
    const clientesStorage = response ? JSON.parse(response) : []
    setClientes(clientesStorage)
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarCliente(cliente) {
    let novaListaClientes = clientes
    novaListaClientes.push(cliente)
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    setClientes(novaListaClientes)
  }

  async function editarCliente(clienteAntigo, novosDados) {
    console.log('CLIENTE ANTIGO -> ', clienteAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaClientes = clientes.map(cliente => {
      if (cliente === clienteAntigo) {
        return novosDados
      } else {
        return cliente
      }
    })

    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes))
    setClientes(novaListaClientes)
  }

  async function excluirCliente(cliente) {
    const novaListaClientes = clientes.filter(c => c !== cliente)
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes))
    setClientes(novaListaClientes)
    Toast.show({
      type: 'success',
      text1: 'Cliente excluído com sucesso!'
    })
  }

  function handleExcluirCliente() {
    excluirCliente(clienteASerExcluido)
    setClienteASerExcluido(null)
    hideModal()
  }

  function getImc(cliente) {
    const peso = parseFloat(cliente.peso)
    const altura = parseFloat(cliente.altura)
    const imc = peso / ((altura / 100) * (altura / 100))
    return imc.toFixed(2)
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Clientes</Text>

      <FlatList
        style={styles.list}
        data={clientes}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Idade: {item?.idade}</Text>
                <Text variant='bodyLarge'>Altura: {item?.altura} cm</Text>
                <Text variant='bodyLarge'>Peso: {item.peso} kg</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>IMC</Text>
                <Text variant='bodyLarge'>{getImc(item)}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormCliente', { acao: editarCliente, cliente: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setClienteASerExcluido(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormCliente', { acao: adicionarCliente })}
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirCliente}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}
const LanchoneteColors = {
  primary: '#FF9800',
  accent: '#FFC107',
  background: '#FAFAFA',
  text: '#212121',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LanchoneteColors.background,
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    color: LanchoneteColors.primary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: LanchoneteColors.accent,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
    backgroundColor: LanchoneteColors.text,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    paddingTop: 15,
  },
});