import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function LSFuncionario({ navigation, route }) {

  const [funcionarios, setFuncionarios] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [funcionarioASerExcluido, setFuncionarioASerExcluido] = useState(null);

  useEffect(() => {
    loadFuncionarios();
  }, []);

  async function loadFuncionarios() {
    const response = await AsyncStorage.getItem('funcionarios');
    console.log("🚀 ~ file: ListaFuncionariosAsyncStorage.js:21 ~ loadFuncionarios ~ response:", response);
    const funcionariosStorage = response ? JSON.parse(response) : [];
    setFuncionarios(funcionariosStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarFuncionario(funcionario) {
    let novaListaFuncionarios = funcionarios;
    novaListaFuncionarios.push(funcionario);
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function editarFuncionario(funcionarioAntigo, novosDados) {
    console.log('FUNCIONÁRIO ANTIGO -> ', funcionarioAntigo);
    console.log('DADOS NOVOS -> ', novosDados);

    const novaListaFuncionarios = funcionarios.map(funcionario => {
      if (funcionario === funcionarioAntigo) {
        return novosDados;
      } else {
        return funcionario;
      }
    });

    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
  }

  async function excluirFuncionario(funcionario) {
    const novaListaFuncionarios = funcionarios.filter(f => f !== funcionario);
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
    setFuncionarios(novaListaFuncionarios);
    Toast.show({
      type: 'success',
      text1: 'Funcionário excluído com sucesso!',
    });
  }

  function handleExcluirFuncionario() {
    excluirFuncionario(funcionarioASerExcluido);
    setFuncionarioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Funcionários</Text>

      <FlatList
        style={styles.list}
        data={funcionarios}
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
                <Text variant='bodyLarge'>CPF: {item?.cpf}</Text>
                <Text variant='bodyLarge'>Telefone: {item?.telefone}</Text>
                <Text variant='bodyLarge'>Endereço: {item?.endereco}</Text>
                <Text variant='bodyLarge'>Data de Nascimento: {item?.dataNascimento}</Text>
                <Text variant='bodyLarge'>Formação: {item?.formacao}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormFuncionario', { acao: editarFuncionario, funcionario: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setFuncionarioASerExcluido(item);
                showModal();
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
        onPress={() => navigation.push('FormFuncionario', { acao: adicionarFuncionario })}
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este cadastro?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirFuncionario}>Tenho Certeza</Button>
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
