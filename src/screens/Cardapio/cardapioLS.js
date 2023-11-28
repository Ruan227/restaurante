import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const LanchoneteColors = {
  primary: '#FF9800',
  accent: '#FFC107',
  background: '#FAFAFA',
  text: '#212121',
};

export default function CardapioLista({ navigation, route }) {
  const [itensCardapio, setItensCardapio] = useState([]);
  const [showModalExcluirItem, setShowModalExcluirItem] = useState(false);
  const [itemASerExcluido, setItemASerExcluido] = useState(null);

  useEffect(() => {
    loadItensCardapio();
  }, []);

  async function loadItensCardapio() {
    const response = await AsyncStorage.getItem('itensCardapio');
    const itensStorage = response ? JSON.parse(response) : [];
    setItensCardapio(itensStorage);
  }

  const showModal = () => setShowModalExcluirItem(true);

  const hideModal = () => setShowModalExcluirItem(false);

  async function adicionarItemCardapio(item) {
    let novaListaItensCardapio = itensCardapio;
    novaListaItensCardapio.push(item);
    await AsyncStorage.setItem('itensCardapio', JSON.stringify(novaListaItensCardapio));
    setItensCardapio(novaListaItensCardapio);
  }

  async function editarItemCardapio(itemAntigo, novosDados) {
    const novaListaItensCardapio = itensCardapio.map((item) => {
      if (item === itemAntigo) {
        return novosDados;
      } else {
        return item;
      }
    });

    await AsyncStorage.setItem('itensCardapio', JSON.stringify(novaListaItensCardapio));
    setItensCardapio(novaListaItensCardapio);
  }

  async function excluirItemCardapio(item) {
    const novaListaItensCardapio = itensCardapio.filter((c) => c !== item);
    await AsyncStorage.setItem('itensCardapio', JSON.stringify(novaListaItensCardapio));
    setItensCardapio(novaListaItensCardapio);
    Toast.show({
      type: 'success',
      text1: 'Item do cardápio excluído com sucesso!',
    });
  }

  function handleExcluirItemCardapio() {
    excluirItemCardapio(itemASerExcluido);
    setItemASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Cardápio
      </Text>

      <FlatList
        style={styles.list}
        data={itensCardapio}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Card.Cover source={{ uri: item.urlImagem }} style={styles.cardCover} />
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  {item?.nome}
                </Text>
                <Text variant="bodyLarge">Nome do Prato: {item?.nome}</Text>
                <Text variant="bodyLarge">Preço: R${item?.valor}</Text>
              </View>
            </View>
            <Card.Actions>
              <Button
                style={styles.button}
                onPress={() => navigation.push('FormItemCardapio', { acao: editarItemCardapio, item })}
              >
                Editar
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  setItemASerExcluido(item);
                  showModal();
                }}
              >
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
        onPress={() => navigation.push('FormItemCardapio', { acao: adicionarItemCardapio })}
      />

      {/* Modal Excluir Item do Cardápio */}
      <Portal>
        <Dialog visible={showModalExcluirItem} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este item do cardápio?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.button} onPress={hideModal}>
              Voltar
            </Button>
            <Button style={styles.button} onPress={handleExcluirItemCardapio}>
              Tenho Certeza
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

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
    padding: 15,
  },
  cardTitle: {
    color: LanchoneteColors.primary,
  },
  cardCover: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  button: {
    margin: 5,
    backgroundColor: LanchoneteColors.accent,
  },
});
