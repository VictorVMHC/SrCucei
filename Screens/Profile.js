import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  NativeModules,
} from 'react-native';
import styles from './StylesSheet2';

class Profile extends Component {
  constructor(props) {
    super(props);
    global._ActualizaContrasenia = () => {
      global.password = this.state.nuevaContrasenia;
      this.setState({contrasenia: ''});
      this.setState({nuevaContrasenia: ''});
      this.setState({nuevaContrasenia2: ''});
    };
    global._EliminaCampoReporte = () => {
      this.setState({codigo_r: ''});
    };
    global._UpdateContrasenia = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          if (xhttp.responseText !== '0') {
            Alert.alert(
              'Exito',
              'La contraseña se ha cambiado correctamente',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    global._ActualizaContrasenia();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('no se  ha podido cambiar la contraseña');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://hola123vmhc123.000webhostapp.com/srcucei/actualizarContraseña.php?codigo_udg=' +
          global.codigo_udg +
          '&password=' +
          global.password +
          '&newPassword=' +
          this.state.nuevaContrasenia,
        true,
      );
      xhttp.send();
    };
  }
  cambia = () => {
    if (
      this.state.nuevaContrasenia !== this.state.nuevaContrasenia2 ||
      this.state.contrasenia === '' ||
      this.state.nuevaContrasenia === this.state.contrasenia
    ) {
      Alert.alert(
        'Aviso',
        'Al parecer las contraseñas no coinciden o hay algun campo en blanco asegurese de no ingresar la misma contraseña que tenia antes',
        [
          {
            text: 'ok',
          },
        ],
        {cancelable: false},
      );
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          if (xhttp.responseText !== '0') {
            global._UpdateContrasenia();
          } else {
            Alert.alert('no se pudo cambiar la contraseña');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://hola123vmhc123.000webhostapp.com/srcucei/consultaUsuario.php?codigo_udg=' +
          global.codigo_udg,
        true,
      );
      xhttp.send();
    }
  };
  Elimina_Reporte = () => {
    var xhttp = new XMLHttpRequest();
    var reporte = this.state.codigo_r;
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Aviso',
            'Se ha eliminado el reporte ' + reporte + ' con exito',
            [
              {
                text: 'ok',
                onPress: () => {
                  global._EliminaCampoReporte();
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
      'https://hola123vmhc123.000webhostapp.com/srcucei/EliminarReporte.php?codigo_udg=' +
        global.codigo_udg +
        '&codigo_r=' +
        this.state.codigo_r,
      true,
    );
    xhttp.send();
  };
  Elimina_Cuenta = () => {
    var xhttp = new XMLHttpRequest();
    var reporte = global.nombre;
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Aviso',
            'Se ha eliminado su cuenta con exito' + reporte,
            [
              {
                text: 'ok',
                onPress: () => {
                  NativeModules.DevSettings.reload();
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
      'https://hola123vmhc123.000webhostapp.com/srcucei/EliminarCuenta.php?codigo_udg=' +
        global.codigo_udg +
        '&password=' +
        this.state.password_pro,
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
  state = {
    password_pro: '',
    codigo_r: '',
    contrasenia: '',
    nuevaContrasenia: '',
    nuevaContrasenia2: '',
  };
  getContrasenia = inputText => {
    this.setState({contrasenia: inputText});
  };
  getNuevaContrasenia = inputText => {
    this.setState({nuevaContrasenia: inputText});
  };
  getNuevaContrasenia2 = inputText => {
    this.setState({nuevaContrasenia2: inputText});
  };
  getCodigo_r = inputText => {
    this.setState({codigo_r: inputText});
  };
  getPassword_Pro = inputText => {
    this.setState({password_pro: inputText});
  };
  render() {
    return (
      <View styles={styles.bodyProfile}>
        <ScrollView>
          <View style={styles.viewInScrollReport}>
            <Text style={styles.texLeft}>
              Nombre: <Text style={styles.spawText}>{global.nombre}</Text>
            </Text>
            <Text style={styles.texLeft}>
              Correo: <Text style={styles.spawText}>{global.correo}</Text>
            </Text>
            <Text style={styles.texLeft}>
              Telefono: <Text style={styles.spawText}>{global.telefono}</Text>
            </Text>
            <Text style={styles.texLeft}>
              Código UDG:
              <Text style={styles.spawText}>{global.codigo_udg}</Text>
            </Text>
            <Text style={styles.Texts}>
              Si deseas cambiar la contraseña solo ingresa tu nueva contraseña,
              repitela para confirmar y da click en cambiar
            </Text>
            <TextInput
              value={this.state.contrasenia}
              style={styles.TIStyle}
              placeholderTextColor="#243572"
              placeholder="Contraseña actual"
              onChangeText={this.getContrasenia}
            />
            <TextInput
              value={this.state.nuevaContrasenia}
              style={styles.TIStyle}
              placeholderTextColor="#243572"
              placeholder="Nueva contraseña"
              onChangeText={this.getNuevaContrasenia}
            />
            <TextInput
              value={this.state.nuevaContrasenia2}
              style={styles.TIStyle}
              placeholderTextColor="#243572"
              placeholder="Repitela"
              onChangeText={this.getNuevaContrasenia2}
            />
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.cambia();
              }}>
              <Text style={styles.fontForButon2}>Cambiar</Text>
            </TouchableOpacity>
            <Text style={styles.styleFontMessage}>
              ¿Deseas eliminar un reporte? {'\n'}
            </Text>
            <TextInput
              value={this.state.codigo_r}
              style={styles.TIStyle}
              placeholderTextColor="#243572"
              placeholder="Codigo de reporte"
              onChangeText={this.getCodigo_r}
            />
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.Elimina_Reporte();
              }}>
              <Text style={styles.fontForButon2}>Eliminar reporte</Text>
            </TouchableOpacity>
            <Text style={styles.styleFontMessage2}>
              ¿Deseas eliminar tu cuenta? {'\n'}
            </Text>
            <TextInput
              value={this.state.password_pro}
              style={styles.TIStyle}
              placeholderTextColor="#243572"
              placeholder="Contraseña"
              onChangeText={this.getPassword_Pro}
            />
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.Elimina_Cuenta();
              }}>
              <Text style={styles.fontForButon2}>Eliminar cuenta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
