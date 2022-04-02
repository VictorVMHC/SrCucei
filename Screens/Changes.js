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
class Changes extends Component {
  constructor(props) {
    super(props);
    global.arrayCambios = '';
    global._LimpiarDatos2 = () => {
      this.setState({lati: 20.656694});
      this.setState({long: -103.325833});
      this.setState({asunto: ''});
      this.setState({des_ubicacion: ''});
      this.setState({des_reporte: ''});
    };
    global._Cargardatos_de_reporte_Changes = () => {
      console.log('hola3');
      this.setState({asunto: global.arrayCambios[0]});
      this.setState({des_ubicacion: global.arrayCambios[1]});
      this.setState({des_reporte: global.arrayCambios[2]});
      this.setState({lati: parseFloat(global.arrayCambios[3])});
      this.setState({long: parseFloat(global.arrayCambios[4])});
    };
  }
  state = {
    codigo_r: '',
    nombreUsuario: '',
    asunto: '',
    des_ubicacion: '',
    des_reporte: '',
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
    console.log(this.state.codigo_r);
    xhttp.onreadystatechange = function() {
      console.log(global.codigo_udg);
      if (this.readyState === 4 && this.status === 200) {
        console.log('hola3');
        if (xhttp.responseText !== '0') {
          console.log(global.arrayCambios[3], global.arrayCambios[4]);
          global.arrayCambios = xhttp.responseText.split(',');
          global._Cargardatos_de_reporte_Changes();
        } else {
          Alert.alert('no se encontro ningun registro');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/ConsultaReporte2.php?codigo_r=' +
        this.state.codigo_r +
        '&codigo_udg=' +
        global.codigo_udg,
      true,
    );
    xhttp.send();
  };
  Actualiza = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        if (xhttp.responseText !== '0') {
          Alert.alert(
            'Aviso',
            'Modificacion exitosa',
            [
              {
                text: 'ok',
                onPress: () => {
                  global._LimpiarDatos2();
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('no se pudo actualizar el reporte');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://hola123vmhc123.000webhostapp.com/srcucei/updateReporte.php?codigo_r=' +
        this.state.codigo_r +
        '&codigo_udg=' +
        global.codigo_udg +
        '&asunto=' +
        this.state.asunto +
        '&des_ubicacion=' +
        this.state.des_ubicacion +
        '&des_reporte=' +
        this.state.des_reporte +
        '&latitud=' +
        this.state.lati +
        '&longitud=' +
        this.state.long,
      true,
    );
    xhttp.send();
  };
  getCodigo_r = inputText => {
    this.setState({codigo_r: inputText});
  };
  getAsunto = inputText => {
    this.setState({asunto: inputText});
  };
  getDes_Ubicacion = inputText => {
    this.setState({des_ubicacion: inputText});
  };
  getDes_Reporte = inputText => {
    this.setState({des_reporte: inputText});
  };
  render() {
    return (
      <View styles={styles.bodyProfile}>
        <ScrollView>
          <View style={styles.viewInScrollReport}>
            <Text style={styles.Underlinedtext}>
              *Solo puedes modificar tus reportes*
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
            <Text style={styles.Underlinedtext}>
              *Modifica los datos que deseas *
            </Text>
            <TextInput
              value={this.state.asunto}
              placeholder="Asunto"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getAsunto}
            />
            <TextInput
              value={this.state.des_ubicacion}
              multiline
              numberOfLines={4}
              editable
              maxLength={150}
              placeholder="Descripcion de la ubicación"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getDes_Ubicacion}
            />
            <TextInput
              value={this.state.des_reporte}
              multiline
              numberOfLines={4}
              editable
              maxLength={150}
              placeholder="Descripcion del reporte"
              placeholderTextColor="#243572"
              style={styles.TIStyle}
              onChangeText={this.getDes_Reporte}
            />
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
              Revisa la informacion antes de guardarla
            </Text>
            <TouchableOpacity
              style={styles.ButonStyle}
              onPress={() => {
                this.Actualiza();
              }}>
              <Text style={styles.fontForButon2}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Changes;
