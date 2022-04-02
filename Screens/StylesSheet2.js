import {StyleSheet, Dimensions} from 'react-native';

var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');
var mapWidh = width;
var mapHeight = height / 2;
var TextWidh = width / 1.2;
var butonHeight = height / 20;
const styles = StyleSheet.create({
  //#region Stylos para  Perfil
  bodyProfile: {
    backgroundColor: '#EBEBEF',
  },
  viewInScroll: {
    paddingLeft: '5%',
    paddingTop: '5%',
    paddingRight: '20%',
    backgroundColor: '#EBEBEF',
  },
  ViewOnView: {
    paddingTop: '5%',
    paddingRight: '5%',
  },
  texLeft: {
    color: '#243572',
    fontSize: 20,
    fontStyle: 'normal',
  },
  spawText: {
    color: '#243572',
    fontSize: 20,
    fontStyle: 'italic',
  },
  viewMessage: {
    alignItems: 'center',
    paddingLeft: '20%',
  },
  styleFontMessage: {
    paddingTop: '20%',
    textAlign: 'center',
    color: '#434254',
    fontSize: 20,
  },
  styleFontMessage2: {
    paddingTop: '20%',
    textAlign: 'center',
    color: '#FF0000',
    fontSize: 20,
  },
  styleImputsViw: {
    alignItems: 'center',
    paddingLeft: '20%',
  },
  TIStyle: {
    fontSize: 25,
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#243572',
  },
  butonStyle: {
    marginBottom: '20%',
    marginTop: '10%',
    backgroundColor: '#243572',
    borderRadius: 5,
    width: '100%',
    height: '15%',
  },
  fontForButon: {
    paddingTop: '5%',
    fontSize: 20,
    textAlign: 'center',
    color: '#EBEBEF',
  },
  //#endregion
  //#region Stylos para mapa
  map: {
    height: mapHeight,
    width: mapWidh,
  },
  //#endregion
  //#region  Styles for Report
  viewInScrollReport: {
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  Texts: {
    textAlign: 'left',
    fontSize: 20,
    width: TextWidh,
    color: '#434254',
  },
  TIStyleReport: {
    fontSize: 25,
    width: TextWidh,
    borderBottomWidth: 5,
    borderBottomColor: '#243572',
  },
  Underlinedtext: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
    width: TextWidh,
    color: '#004054',
  },
  ButonStyle: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#243572',
    borderRadius: 5,
    width: TextWidh / 2,
    height: butonHeight,
  },
  fontForButon2: {
    fontSize: 20,
    textAlign: 'center',
    color: '#EBEBEF',
  },
  //#endregion
  //#region Style for Query
  ViewOfDatos: {
    marginTop: 20,
    marginBottom: 20,
  },
  //#endregion
  bodyProfile2: {
    backgroundColor: '#EBEBEF',
    height: mapHeight * 2,
    paddingBottom: 5,
  },
});

export default styles;
