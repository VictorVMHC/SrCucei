import React, {Component} from 'react';
import {Text, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import styles from './StylesSheet';

class Recover extends Component {
  constructor(props) {
    super(props);
    global.IraLogin = () => {
      this.props.navigation.navigate('Login');
    };
  }
  state = {
    codigo_Recover: '',
  };
  Enviar_contraseña = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Aviso',
            'La contraseña ha sido mandado al correo electronico, si no se encuentra es posible que este en la bandeja de spam',
            [
              {
                text: 'ok',
                onPress: () => {
                  global.IraLogin();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('No se ha encontrado el usuario ingresado');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/consultaUsuario.php?codigo_udg=' +
        this.state.codigo_Recover,
      true,
    );
    xhttp.send();
  };
  getCodigo_Recover = inputText => {
    this.setState({codigo_Recover: inputText});
  };
  render() {
    return (
      <View style={styles.PrincipalStyle}>
        <Text style={styles.PrimaryText}>
          Ingresa tu <Text style={styles.SecondaryText}>codigo UdeG</Text>
        </Text>
        <TextInput
          ref={input => {
            this.CodigoImput = input;
          }}
          placeholder="Codigo UdeG"
          placeholderTextColor="#243572"
          style={styles.tIStyle}
          onChangeText={this.getCodigo_Recover}
        />
        <View style={styles.SeconViewOfRecover}>
          <Text style={styles.textOfSeconView}>
            Podras consultar tu contraseña en el correo
          </Text>
        </View>
        <TouchableOpacity
          style={styles.butonStyle}
          onPress={() => {
            this.Enviar_contraseña();
          }}>
          <Text style={styles.FontButonStyle}>Enviar contraseña</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Recover;
