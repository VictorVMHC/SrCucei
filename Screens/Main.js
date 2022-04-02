import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  NativeModules,
} from 'react-native';
import styles from './StylesSheet';
class Main extends Component {
  backAction = () => {
    Alert.alert('Cierre de sesión', '¿Esta seguro que desea cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Si', onPress: () => NativeModules.DevSettings.reload()},
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.styleViewImage}>
        <View>
          <Image
            source={{
              uri:
                'http://www.cusur.udg.mx/es/sites/default/files/adjuntos/logo_udg-gris.png',
            }}
            style={styles.imageStyleFroMain}
          />
          <Image
            source={{
              uri:
                'https://blog.michelletorres.mx/wp-content/uploads/2013/10/Escudo_CUCEI.png',
            }}
            style={styles.imageStyle2ForMain}
          />
        </View>
        <View style={styles.ViewStyleForMain}>
          <Text style={styles.styleForMainText}>
            Esta plataforma te permitirá reportar tanto el mobiliario como el
            inmobiliario de CUCEI trataremos de mejorar constantemente para un
            mejor servicio y resolución de problemas dentro del campus por favor
            al generar reportes se cociente y especifica bien donde se genera el
            problema para poder corregirlo.
          </Text>
        </View>
        <View style={styles.butonsView}>
          <TouchableOpacity
            style={styles.buton1}
            onPress={() => {
              this.props.navigation.navigate('Profile');
            }}>
            <Text style={styles.FontButonStyle}>Mi perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buton2}
            onPress={() => {
              this.props.navigation.navigate('Report');
            }}>
            <Text style={styles.FontButonStyle}>Reportar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buton3}
            onPress={() => {
              this.props.navigation.navigate('Changes');
            }}>
            <Text style={styles.FontButonStyle}>Modificar reporte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buton1}
            onPress={() => {
              this.props.navigation.navigate('Query');
            }}>
            <Text style={styles.FontButonStyle}>Consultar reporte</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Main;
