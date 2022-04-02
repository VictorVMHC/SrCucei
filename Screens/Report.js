import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './StylesSheet2';
class Report extends Component {
  constructor(props) {
    super(props);
    global._LimpiarDatos = () => {
      this.setState({lati: 20.656694});
      this.setState({long: -103.325833});
      this.setState({asunto: ''});
      this.setState({des_ubicacion: ''});
      this.setState({des_reporte: ''});
    };
  }
  state = {
    lati: 20.656694,
    long: -103.325833,
    asunto: '',
    des_ubicacion: '',
    des_reporte: '',
  };

  onMapPress(e) {
    // alert('coordinates:' + JSON.stringify(e.nativeEvent.coordinate));
    this.setState({lati: e.nativeEvent.coordinate.latitude});
    this.setState({long: e.nativeEvent.coordinate.longitude});
  }
  getAsunto = inputText => {
    this.setState({asunto: inputText});
  };
  getDes_U = inputText => {
    this.setState({des_ubicacion: inputText});
  };
  getDes_R = inputText => {
    this.setState({des_reporte: inputText});
  };
  CreaReporte = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Reporte enviado con exito',
            'Este es tu codigo de reporte ¡guardalo!' + xhttp.responseText,
            [
              {
                text: 'ok',
                onPress: () => {
                  global._LimpiarDatos();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('no se pudo crear el reporte');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/crearReporte.php?codigo_udg=' +
        global.codigo_udg +
        '&asunto=' +
        this.state.asunto +
        '&latitud=' +
        this.state.lati +
        '&longitud=' +
        this.state.long +
        '&des_ubicacion=' +
        this.state.des_ubicacion +
        '&des_reporte=' +
        this.state.des_reporte,
      true,
    );
    xhttp.send();
  };
  render() {
    return (
      <View styles={styles.bodyProfile}>
        <ScrollView>
          <View style={styles.viewInScrollReport}>
            <Text style={styles.Underlinedtext}>Ejemplos De Asunto:</Text>
            <Text style={styles.Texts}>
              Silla rota, proyector inservible, computadora dañada
            </Text>
            <TextInput
              value={this.state.asunto}
              placeholder="Asunto"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getAsunto}
            />
            <Text style={styles.Underlinedtext}>
              Indica con un marcador en el mapa El lugar en donde se encuentra
            </Text>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            onPress={this.onMapPress.bind(this)}
            style={styles.map}
            region={{
              latitude: this.state.lati,
              longitude: this.state.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: 20.656694,
              longitude: -103.325833,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            maxZoomLevel={20}
            minZoomLevel={17}
            mapType={'satellite'}
            zoomEnabled={true}>
            <MapView.Marker
              coordinate={{
                longitude: this.state.long,
                latitude: this.state.lati,
              }}
            />
          </MapView>
          <View style={styles.viewInScrollReport}>
            <Text style={styles.Underlinedtext}>
              Ejemplos de descripcion de ubicacion:
            </Text>
            <Text style={styles.Texts}>
              edifico beta, aula 5, cuarta banca frente a biblioteca.
            </Text>
            <Text style={styles.Underlinedtext}>
              En cuanto más especifica la ubicación mejor
            </Text>
            <TextInput
              value={this.state.des_ubicacion}
              multiline
              numberOfLines={4}
              editable
              maxLength={150}
              placeholder="Descripción de la ubicación"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getDes_U}
            />
            <Text style={styles.Underlinedtext}>Ejemplos de anomalias:</Text>
            <Text style={styles.Texts}>
              la computadora ha dejado de encender ya que no cuenta con cable a
              la corriente eléctrica.
            </Text>
            <TextInput
              value={this.state.des_reporte}
              multiline
              numberOfLines={4}
              editable
              maxLength={150}
              placeholder="Descripcion del reporte"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getDes_R}
            />
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.CreaReporte();
              }}>
              <Text style={styles.fontForButon2}>Enviar Reporte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Report;
