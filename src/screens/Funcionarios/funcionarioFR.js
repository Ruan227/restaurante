import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FRFuncionario({ navigation, route }) {
  const { acao, funcionario: funcionarioAntigo } = route.params;

  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [formacao, setFormacao] = useState('');

  const validationSchema = Yup.object().shape({
    cpf: Yup.string().required('Campo obrigatório!'),
    telefone: Yup.string().required('Campo obrigatório!'),
    endereco: Yup.string().required('Campo obrigatório!'),
    dataNascimento: Yup.string().required('Campo obrigatório!'),
    formacao: Yup.string().required('Campo obrigatório!'),
  });

  useEffect(() => {
    if (funcionarioAntigo) {
      setCpf(funcionarioAntigo.cpf);
      setTelefone(funcionarioAntigo.telefone);
      setEndereco(funcionarioAntigo.endereco);
      setDataNascimento(funcionarioAntigo.dataNascimento);
      setFormacao(funcionarioAntigo.formacao);
    }
  }, [funcionarioAntigo]);

  function salvar(novoFuncionario) {
    if (funcionarioAntigo) {
      acao(funcionarioAntigo, novoFuncionario);
    } else {
      acao(novoFuncionario);
    }

    Toast.show({
      type: 'success',
      text1: 'Funcionário salvo com sucesso!',
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {funcionarioAntigo ? 'Editar Funcionário' : 'Adicionar Funcionário'}
      </Text>

      <Formik
        initialValues={{
          cpf: '',
          telefone: '',
          endereco: '',
          dataNascimento: '',
          formacao: '',
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
                label="Telefone"
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                error={errors.telefone ? true : false}
                keyboardType="numeric"
                render={props =>
                  <TextInputMask
                    {...props}
                    type={'cel-phone'}
                  />
                }
              />

              {touched.telefone && errors.telefone && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.telefone}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Endereço"
                value={values.endereco}
                onChangeText={handleChange('endereco')}
                onBlur={handleBlur('endereco')}
                error={errors.endereco ? true : false}
              />

              {touched.endereco && errors.endereco && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.endereco}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Data de Nascimento"
                value={values.dataNascimento}
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                error={errors.dataNascimento ? true : false}
                keyboardType="numeric"
                render={props =>
                  <TextInputMask
                    {...props}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                  />
                }
              />

              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.dataNascimento}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Formação"
                value={values.formacao}
                onChangeText={handleChange('formacao')}
                onBlur={handleBlur('formacao')}
                error={errors.formacao ? true : false}
              />

              {touched.formacao && errors.formacao && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.formacao}</Text>
              )}
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
