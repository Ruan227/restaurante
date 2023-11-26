import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FRReserva({ navigation, route }) {
  const { acao, reserva: reservaAntiga } = route.params;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const validationSchema = Yup.object().shape({
    cpf: Yup.string().required('Campo obrigatório!'),
    nome: Yup.string().required(),
    idade: Yup.string().required(),
    peso: Yup.string().required(),
    altura: Yup.string().required(),
  });

  useEffect(() => {
    if (reservaAntiga) {
      setNome(reservaAntiga.nome);
      setIdade(reservaAntiga.idade);
      setPeso(reservaAntiga.peso);
      setAltura(reservaAntiga.altura);
    }
  }, [reservaAntiga]);

  function salvar(novaReserva) {
    if (reservaAntiga) {
      acao(reservaAntiga, novaReserva);
    } else {
      acao(novaReserva);
    }

    Toast.show({
      type: 'success',
      text1: 'Reserva salva com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {reservaAntiga ? 'Editar Reserva' : 'Adicionar Reserva'}
      </Text>

      <Formik
        initialValues={{
          cpf: '',
          nome: reservaAntiga ? reservaAntiga.nome : '',
          idade: reservaAntiga ? reservaAntiga.idade : '',
          peso: reservaAntiga ? reservaAntiga.peso : '',
          altura: reservaAntiga ? reservaAntiga.altura : '',
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
                render={props =>
                    <TextInputMask
                      {...props}
                      type={'cpf'}
                    />
                  }
              />

              {touched.cpf && errors.cpf && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.cpf}</Text>
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
                label="Peso"
                value={values.peso}
                onChangeText={handleChange('peso')}
                onBlur={handleBlur('peso')}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Altura"
                value={values.altura}
                onChangeText={handleChange('altura')}
                onBlur={handleBlur('altura')}
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
