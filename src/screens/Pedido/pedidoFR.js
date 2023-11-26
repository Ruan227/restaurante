import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FRPedidos({ navigation, route }) {  // Alteração do nome do componente
  const { acao, pedido: pedidoAntigo } = route.params;  // Alteração do nome da variável

  const [nomePrato, setNomePrato] = useState('');  // Alteração do nome da variável
  const [horarioPedido, setHorarioPedido] = useState('');  // Alteração do nome da variável
  const [formaPagamento, setFormaPagamento] = useState('');  // Alteração do nome da variável

  const validationSchema = Yup.object().shape({
    nomePrato: Yup.string().required('Campo obrigatório!'),  // Alteração do nome da variável
    horarioPedido: Yup.string().required(),  // Alteração do nome da variável
    formaPagamento: Yup.string().required(),  // Alteração do nome da variável
  });

  useEffect(() => {
    if (pedidoAntigo) {
      setNomePrato(pedidoAntigo.nomePrato);  // Alteração do nome da variável
      setHorarioPedido(pedidoAntigo.horarioPedido);  // Alteração do nome da variável
      setFormaPagamento(pedidoAntigo.formaPagamento);  // Alteração do nome da variável
    }
  }, [pedidoAntigo]);

  function salvar(novoPedido) {  // Alteração do nome da função
    if (pedidoAntigo) {
      acao(pedidoAntigo, novoPedido);
    } else {
      acao(novoPedido);
    }

    Toast.show({
      type: 'success',
      text1: 'Pedido salvo com sucesso!',  // Alteração do texto
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {pedidoAntigo ? 'Editar Pedido' : 'Adicionar Pedido'}  // Alteração do texto
      </Text>

      <Formik
        initialValues={{
          nomePrato: '',
          horarioPedido: pedidoAntigo ? pedidoAntigo.horarioPedido : '',  // Alteração do nome da variável
          formaPagamento: pedidoAntigo ? pedidoAntigo.formaPagamento : '',  // Alteração do nome da variável
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
                label="Nome do Prato"  // Alteração do texto
                value={values.nomePrato}
                onChangeText={handleChange('nomePrato')}
                onBlur={handleBlur('nomePrato')}
                error={errors.nomePrato ? true : false}  // Alteração do nome da variável
              />
              {touched.nomePrato && errors.nomePrato && (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.nomePrato}</Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Horário do Pedido"  // Alteração do texto
                value={values.horarioPedido}
                onChangeText={handleChange('horarioPedido')}
                onBlur={handleBlur('horarioPedido')}
              />

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Forma de Pagamento"  // Alteração do texto
                value={values.formaPagamento}
                onChangeText={handleChange('formaPagamento')}
                onBlur={handleBlur('formaPagamento')}
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
