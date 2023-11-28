import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

export default function CardapioItem({ navigation, route }) {
  const { acao, item: itemAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [valor, setValor] = useState('');

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    urlImagem: Yup.string().required('Campo obrigatório!'),
    valor: Yup.string().required('Campo obrigatório!'),
  });

  useEffect(() => {
    if (itemAntigo) {
      setNome(itemAntigo.nome);
      setUrlImagem(itemAntigo.urlImagem);
      setValor(itemAntigo.valor);
    }
  }, [itemAntigo]);

  function salvar(novoItem) {
    if (itemAntigo) {
      acao(itemAntigo, novoItem);
    } else {
      acao(novoItem);
    }

    Toast.show({
      type: 'success',
      text1: 'Item do cardápio salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {itemAntigo ? 'Editar Item do Cardápio' : 'Adicionar Item ao Cardápio'}
      </Text>

      <Formik
        initialValues={{
          nome: itemAntigo ? itemAntigo.nome : '',
          urlImagem: itemAntigo ? itemAntigo.urlImagem : '',
          valor: itemAntigo ? itemAntigo.valor : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>
            
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome do Prato"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                error={touched.nome && errors.nome}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label="URL da Imagem"
                value={values.urlImagem}
                onChangeText={handleChange('urlImagem')}
                onBlur={handleBlur('urlImagem')}
                error={touched.urlImagem && errors.urlImagem}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Valor"
                value={values.valor}
                onChangeText={handleChange('valor')}
                onBlur={handleBlur('valor')}
                error={touched.valor && errors.valor}
              />

            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                mode="contained-tonal"
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button style={styles.button} mode="contained" onPress={handleSubmit}>
                Salvar no Cardápio
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});
