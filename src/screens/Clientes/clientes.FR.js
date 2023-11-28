import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

const LanchoneteColors = {
  primary: '#FF9800',
  accent: '#FFC107',
  background: '#FAFAFA',
  text: '#212121',
};

export default function FRCliente({ navigation, route }) {
  const { acao, cliente: clienteAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');

  const validationSchema = Yup.object().shape({
    cpf: Yup.string().required('Campo obrigatório!'),
    nome: Yup.string().required(),
    idade: Yup.string().required(),
    telefone: Yup.string().required(),
  });

  useEffect(() => {
    if (clienteAntigo) {
      setNome(clienteAntigo.nome);
      setIdade(clienteAntigo.idade);
      setTelefone(clienteAntigo.telefone);
    }
  }, [clienteAntigo]);

  function salvar(novoCliente) {
    if (clienteAntigo) {
      acao(clienteAntigo, novoCliente);
    } else {
      acao(novoCliente);
    }

    Toast.show({
      type: 'success',
      text1: 'Cliente salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {clienteAntigo ? 'Editar Cliente' : 'Adicionar Cliente'}
      </Text>

      <Formik
        initialValues={{
          cpf: '',
          nome: clienteAntigo ? clienteAntigo.nome : '',
          idade: clienteAntigo ? clienteAntigo.idade : '',
          telefone: clienteAntigo ? clienteAntigo.telefone : '',
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
                label="CPF"
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                error={errors.cpf ? true : false}
                keyboardType="numeric"
                render={(props) => (
                  <TextInputMask {...props} type={'cpf'} />
                )}
              />

              {touched.cpf && errors.cpf && (
                <Text style={{ color: LanchoneteColors.text, textAlign: 'center' }}>{errors.cpf}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Idade"
                value={values.idade}
                onChangeText={handleChange('idade')}
                onBlur={handleBlur('idade')}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label={'Telefone'}
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                error={touched.telefone && errors.telefone}
                render={(props) => (
                  <TextInputMask {...props} type={'cel-phone'} />
                )}
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
                Salvar
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
    backgroundColor: LanchoneteColors.background,
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    color: LanchoneteColors.primary,
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
    backgroundColor: LanchoneteColors.accent,
  },
});
