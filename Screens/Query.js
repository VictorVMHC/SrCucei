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
class Query extends Component {
  constructor(props) {
    super(props);
    global.arrayReporte = '';
    global._Cargardatos_de_reporte = () => {
      this.setState({nombreUsuario: global.arrayReporte[0]});
      this.setState({asunto: global.arrayReporte[1]});
      this.setState({des_ubicacion: global.arrayReporte[2]});
      this.setState({des_reporte: global.arrayReporte[3]});
      this.setState({estatus: global.arrayReporte[4]});
      this.setState({solucion: global.arrayReporte[5]});
      this.setState({lati: parseFloat(global.arrayReporte[6])});
      this.setState({long: parseFloat(global.arrayReporte[7])});
    };
  }
  state = {
    codigo_r: '',
    nombreUsuario: 'Nombre de usuario',
    asunto: 'Asunto del reporte',
    des_ubicacion: 'Ubicacion del reporte',
    des_reporte: 'Descripcion del reporte',
    estatus: 'Estatus del reporte',
    solucion: 'Solucion del reporte',
    lati: 20.656694,
    long: -103.325833,
  };

  onMapPress(e) {
    // alert('coordinates:' + JSON.stringify(e.nativeEvent.coordinate));
    this.setState({lati: e.nativeEvent.coordinate.latitude});
    this.setState({long: e.nativeEvent.coordinate.longitude});
  }
  BuscaReporte = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          global.arrayReporte = xhttp.responseText.split(',');
          Alert.alert(
            'Reporte de: ',
            global.arrayReporte[0],
            [
              {
                text: 'ok',
                onPress: () => {
                  global._Cargardatos_de_reporte();
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
      'https://hola123vmhc123.000webhostapp.com/srcucei/consultaReporte.php?codigo_r=' +
        this.state.codigo_r,
      true,
    );
    xhttp.send();
  };
  getCodigo_r = inputText => {
    this.setState({codigo_r: inputText});
  };
  render() {
    return (
      <View styles={styles.bodyProfile}>
        <ScrollView>
          <View style={styles.viewInScrollReport}>
            <Text style={styles.Underlinedtext}>
              *Aquí puedes consultar el reporte de cualquier usuario solo si
              tienes el codigo de reporte*
            </Text>
            <TextInput
              placeholder="Ingresa Codigo de reporte"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getCodigo_r}
            />
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.BuscaReporte();
              }}>
              <Text style={styles.fontForButon2}>Buscar reporte</Text>
            </TouchableOpacity>
            <View style={styles.ViewOfDatos}>
              <Text style={styles.Underlinedtext}>
                Usuario:
                <Text style={styles.Texts}>{this.state.nombreUsuario}</Text>
              </Text>
              <Text style={styles.Underlinedtext}>
                Asunto: <Text style={styles.Texts}>{this.state.asunto}</Text>
              </Text>
              <Text style={styles.Underlinedtext}>
                Ubicacion:
                <Text style={styles.Texts}>{this.state.des_ubicacion}</Text>
              </Text>
              <Text style={styles.Underlinedtext}>
                Descripcion:
                <Text style={styles.Texts}>{this.state.des_reporte}</Text>
              </Text>
              <Text style={styles.Underlinedtext}>
                Estatus: <Text style={styles.Texts}>{this.state.estatus}</Text>
              </Text>
              <Text style={styles.Underlinedtext}>
                Solucion:
                <Text style={styles.Texts}>{this.state.solucion}</Text>
              </Text>
            </View>
            <Text style={styles.Underlinedtext}>
              Tipos de estatus:
              <Text style={styles.Texts}>
                Revisado - Resuelto - En proceso - Pendiente
              </Text>
            </Text>
            <Text style={styles.Texts}>
              Si el estatus
              <Text style={styles.Underlinedtext}> NO esta en "Pendiente"</Text>
              se muestra la solucion del reporte de lo contrario se muestra
              A.S.S. "Aun sin solucion"
            </Text>
            <View style={styles.ViewOfDatos}>
              <Text style={styles.Underlinedtext}>
                Ubicación del Reporte en el mapa
              </Text>
            </View>
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
        </ScrollView>
      </View>
    );
  }
}

export default Query;
