import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';


export default function LSPedido({ navigation, route }) {

  const [pedidos, setPedidos] = useState([])
  const [showModalExcluirPedido, setShowModalExcluirPedido] = useState(false)
  const [pedidoASerExcluido, setPedidoASerExcluido] = useState(null)

  useEffect(() => {
    loadPedidos()
  }, [])

  async function loadPedidos() {
    const response = await AsyncStorage.getItem('pedidos')
    console.log("🚀 ~ file: ListaPedidosAsyncStorage.js:21 ~ loadPedidos ~ response:", response)
    const pedidosStorage = response ? JSON.parse(response) : []
    setPedidos(pedidosStorage)
  }

  const showModal = () => setShowModalExcluirPedido(true);

  const hideModal = () => setShowModalExcluirPedido(false);

  async function adicionarPedido(pedido) {
    let novaListaPedidos = pedidos
    novaListaPedidos.push(pedido)
    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos));
    setPedidos(novaListaPedidos)
  }

  async function editarPedido(pedidoAntigo, novosDados) {
    console.log('PEDIDO ANTIGO -> ', pedidoAntigo)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaPedidos = pedidos.map(pedido => {
      if (pedido === pedidoAntigo) {
        return novosDados
      } else {
        return pedido
      }
    })

    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos))
    setPedidos(novaListaPedidos)
  }

  async function excluirPedido(pedido) {
    const novaListaPedidos = pedidos.filter(p => p !== pedido)
    await AsyncStorage.setItem('pedidos', JSON.stringify(novaListaPedidos))
    setPedidos(novaListaPedidos)
    Toast.show({
      type: 'success',
      text1: 'Pedido excluído com sucesso!'
    })
  }

  function handleExcluirPedido() {
    excluirPedido(pedidoASerExcluido)
    setPedidoASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Pedidos</Text>

      <FlatList
        style={styles.list}
        data={pedidos}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>Nome do Pedido: {item?.nomePedido}</Text>
                <Text variant='bodyLarge'>Horário do Pedido: {item?.horarioPedido}</Text>
                <Text variant='bodyLarge'>Forma de Pagamento: {item.formaPagamento}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormPedido', { acao: editarPedido, pedido: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setPedidoASerExcluido(item)
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
        onPress={() => navigation.push('FormPedido', { acao: adicionarPedido })}
      />

      {/* Modal Excluir Pedido */}
      <Portal>
        <Dialog visible={showModalExcluirPedido} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este pedido?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirPedido}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
});
