//#region Imports
import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './StylesSheet';
//#endregion

class Login extends Component {
  constructor(props) {
    super(props);
    global.array = '';

    global._guardardatosDeUsuario = () => {
      global.codigo_udg = global.array[0];
      global.nombre = global.array[1];
      global.correo = global.array[2];
      global.telefono = global.array[3];
      global.password = global.array[4];
      this.props.navigation.navigate('Main');
    };
  }
  state = {
    codigo_udg: '',
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
  };
  BuscaUsuario = () => {
    console.log(this.state.codigo_udg);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          global.array = xhttp.responseText.split(',');
          Alert.alert(
            '¡Bienvenido!',
            global.array[1],
            [
              {
                text: 'ok',
                onPress: () => {
                  global._guardardatosDeUsuario();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('no se encontro ningun registro');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/ingreso.php?codigo_udg=' +
        this.state.codigo_udg +
        '&password=' +
        this.state.password,
      true,
    );
    xhttp.send();
  };
  getCodigo = inputText => {
    this.setState({codigo_udg: inputText});
  };
  getPassword = inputText => {
    this.setState({password: inputText});
  };
  render() {
    return (
      <View style={styles.styleViewImage}>
        <View style={styles.styleViewImage2}>
          <Image
            source={{
              uri:
                'http://www.cusur.udg.mx/es/sites/default/files/adjuntos/logo_udg-gris.png',
            }}
            style={styles.imageStyle}
          />
          <Image
            source={{
              uri:
                'https://blog.michelletorres.mx/wp-content/uploads/2013/10/Escudo_CUCEI.png',
            }}
            style={styles.imageStyle2}
          />
        </View>
        <View style={styles.InputsStyleDivs}>
          <TextInput
            ref={input => {
              this.textInput1 = input;
            }}
            placeholder="Codigo"
            placeholderTextColor="#243572"
            style={styles.tIStyle}
            onChangeText={this.getCodigo}
          />
          <TextInput
            ref={input => {
              this.textInput2 = input;
            }}
            placeholder="Contraseña"
            placeholderTextColor="#243572"
            style={styles.tIStyle}
            onChangeText={this.getPassword}
          />
          <TouchableOpacity
            style={styles.butonStyle}
            onPress={() => {
              this.BuscaUsuario();
            }}>
            <Text style={styles.FontButonStyle}>Ingresar</Text>
          </TouchableOpacity>
          <View style={styles.otherOptios}>
            <TouchableOpacity
              style={styles.butonStyleForPassword}
              onPress={() => {
                this.props.navigation.navigate('Recover');
              }}>
              <Text style={styles.FontButonStyleForPassword}>
                ¿Olvidaste la contraseña?
              </Text>
              <Text style={styles.FontButonStyleForPassword}>
                ¡Haz click Aqui!
              </Text>
            </TouchableOpacity>
            <Text style={styles.FontButonStyleForPassword}>
              ¿Es la primera vez que usas el sistema?
            </Text>
            <TouchableOpacity
              style={styles.butonStyleForRegister}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Text style={styles.FontButonStyle}>¡ Registrate Aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
