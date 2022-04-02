import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
class Register extends Component {
  constructor(props) {
    super(props);
    global.IraLogin = () => {
      this.props.navigation.navigate('Login');
    };
    global.RegistraUsuario = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          if (xhttp.responseText !== '0') {
            Alert.alert(
              'Aviso',
              'Usuario registrado exitosamente, !Recuerda consultar tu contraseña en tu correo, verifica el apartado de spam¡',
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
          }
        }
      };
      xhttp.open(
        'GET',
        'https://hola123vmhc123.000webhostapp.com/srcucei/registro.php?codigo_udg=' +
          this.state.codigo_registro +
          '&nombre=' +
          this.state.nombre_registro +
          '&correo=' +
          this.state.correo_registro +
          '&telefono=' +
          this.state.telefono_registro,
        true,
      );
      xhttp.send();
    };
  }
  state = {
    codigo_registro: '',
    correo_registro: '',
    nombre_registro: '',
    telefono_registro: '',
  };
  BuscaRegistro = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Aviso',
            'El usuario ya ha sido registrado',
            [
              {
                text: 'ok',
              },
            ],
            {cancelable: false},
          );
        } else {
          global.RegistraUsuario();
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/consultaUsuario.php?codigo_udg=' +
        this.state.codigo_registro,
      true,
    );
    xhttp.send();
  };
  verifica = () => {
    if (
      this.state.codigo_registro === '' ||
      this.state.correo_registro === '' ||
      this.state.telefono_registro === '' ||
      this.state.nombre_registro === ''
    ) {
      Alert.alert(
        'Faltan datos',
        'Es probable que hayas olvidado ingresar algún dato, verifica y vuelve a intentar',
      );
    } else {
      this.BuscaRegistro();
    }
  };
  getCodigo = inputText => {
    this.setState({codigo_registro: inputText});
  };
  getNombre = inputText => {
    this.setState({nombre_registro: inputText});
  };
  getCorreo = inputText => {
    this.setState({correo_registro: inputText});
  };
  getTelefono = inputText => {
    this.setState({telefono_registro: inputText});
  };
  render() {
    return (
      <View style={styles.PrincipalStyle}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#243572"
          ref={input => {
            this.Nombre = input;
          }}
          onChangeText={this.getNombre}
          style={styles.tIStyle}
        />
        <TextInput
          placeholder="Codigo UdeG"
          placeholderTextColor="#243572"
          ref={input => {
            this.Codigo = input;
          }}
          onChangeText={this.getCodigo}
          style={styles.tIStyle}
        />
        <Text style={styles.AlertFont}>*Debes tener acceso al correo</Text>
        <TextInput
          placeholder="Correo"
          placeholderTextColor="#243572"
          ref={input => {
            this.Correo = input;
          }}
          onChangeText={this.getCorreo}
          style={styles.tIStyle}
        />
        <TextInput
          placeholder="Telefono"
          placeholderTextColor="#243572"
          ref={input => {
            this.Nombre = input;
          }}
          onChangeText={this.getTelefono}
          style={styles.tIStyle}
        />
        <View style={styles.SecondaryStyle}>
          <Text style={styles.FontStyle}>
            Tu contraseña se enviara al correo esta sera provisional podras
            cambiarla en cualquier momento dentro del apartado "Mi perfil"
          </Text>
          <TouchableOpacity
            style={styles.butonStyle}
            onPress={() => {
              this.verifica();
            }}>
            <Text style={styles.FontButonStyle}>Registrar</Text>
          </TouchableOpacity>
          <Text style={styles.FontStyle}>
            Son necesarios ingresar los datos para poder validar los reportes
            que generes
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PrincipalStyle: {
    flex: 1,
    backgroundColor: '#EBEBEF',
    alignItems: 'center',
  },
  SecondaryStyle: {
    backgroundColor: '#EBEBEF',
    alignItems: 'center',
    top: 60,
  },
  butonStyle: {
    marginTop: 20,
    width: 200,
    height: 50,
    backgroundColor: '#243572',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  FontButonStyle: {
    color: '#fff',
    fontSize: 20,
  },
  FontStyle: {
    color: '#434254',
    fontSize: 20,
    textAlign: 'center',
  },
  AlertFont: {
    color: '#434254',
    fontSize: 20,
  },
  tIStyle: {
    textAlign: 'left',
    fontSize: 20,
    width: 270,
    height: 50,
    margin: 5,
    borderColor: '#243572',
    borderBottomWidth: 2,
  },
});
export default Register;
