import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet, Text, NativeModules} from 'react-native';

import Login from './Login';
import Main from './Main';
import Register from './Register';
import Recover from './Recover';
import Profile from './Profile';
import Report from './Report';
import Query from './Query';
import Changes from './Changes';

const Stack = createStackNavigator();

function Container(props) {
  global.codigo_udg = '';
  global.nombre = '';
  global.correo = '';
  global.telefono = '';
  global.password = '';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#243572',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Sistema de reportes Cucei',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={styles.butonStyleForRegister}
                onPress={() => {
                  NativeModules.DevSettings.reload();
                }}>
                <Text style={styles.FontButonStyle}>Salir</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Registro',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Recover"
          component={Recover}
          options={{
            title: 'Contaseña',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Perfil',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            title: 'Reporte',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Query"
          component={Query}
          options={{
            title: 'Seguimiento',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Changes"
          component={Changes}
          options={{
            title: 'Modificaciones',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  butonStyleForRegister: {
    paddingTop: 10,
    paddingLeft: 5,
    width: '100%',
    height: 45,
    backgroundColor: '#243572',
    alignItems: 'center',
    borderRadius: 40,
  },
  FontButonStyle: {
    color: '#fff',
    fontSize: 20,
  },
});
export default Container;
