import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../assets/colors';
import {getAuthorization} from '../redux/Action';
import qs from 'qs';
import {SpotifySVG, GoogleSVG, FacebookSVG, PhoneSVG} from '../assets/svgs';

const Login = ({navigation}) => {
  const [token, setToken] = useState('');
  // const dispatch = useDispatch();
  // setToken(useSelector(state => state.fetchAuth.data));

  // useEffect(() => {
  //   dispatch(getAuthorization());
  // },[]);

  const qs = require('qs');
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: '5a1fe97becfa4f53869a4c1037f41940',
    client_secret: 'd7ea3348df0646798d405b8c2df47c56',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  useEffect(() => {
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setToken(response.data.access_token);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <SpotifySVG height={'20%'} width={'20%'} fill={Colors.white} />
      <Text style={styles.outerText}>
        Millions of songs{'\n'}
        <Text style={styles.innerText}>Free on Spotify.</Text>
      </Text>

      <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8}>
        <Text style={styles.signUpText}>Sign up free</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <PhoneSVG height={28} width={28} />
        <TouchableOpacity style={styles.logInButton} activeOpacity={0.8}>
          <Text style={styles.logInText}>Continue with phone number</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <GoogleSVG height={28} width={28} />
        <TouchableOpacity
          style={styles.logInButton}
          activeOpacity={0.8}
          onPress={() => {
            GoogleSignin.configure({
              androidClientId:
                '745372800826-rkg4g0c7jvnmdc78vufguild28u7t4uc.apps.googleusercontent.com',
              iosClientId:
                '745372800826-ui7ttugqh0uhtmgu6hbguq0l4eo76u4b.apps.googleusercontent.com',
            });
            GoogleSignin.hasPlayServices()
              .then(hasPlayService => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then(userInfo => {
                      console.log(JSON.stringify(userInfo));
                    })
                    .catch(e => {
                      console.log('ERROR IS: ' + JSON.stringify(e));
                    });
                }
              })
              .catch(e => {
                console.log('ERROR IS: ' + JSON.stringify(e));
              });
          }}>
          <Text style={styles.logInText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <FacebookSVG height={28} width={28} />
        <TouchableOpacity style={styles.logInButton} activeOpacity={0.8}>
          <Text style={styles.logInText}>Continue with facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home Page', {token: token})}>
          <Text style={styles.logInText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PlaygroundOptions')}>
          <Text style={styles.logInText}>Playground</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.black,
    flex: 1,
    alignItems: 'center',
    paddingTop: '40%',
  },
  outerText: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '700',
    fontSize: 32,
    fontFamily: 'gothic',
  },
  innerText: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0.64,
  },
  signUpButton: {
    borderRadius: 50,
    paddingVertical: '4%',
    marginTop: '11%',
    marginVertical: 5,
    width: '88%',
    backgroundColor: Colors.spotify,
  },
  signUpText: {
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  logInButton: {
    paddingVertical: '4%',
    width: '80%',
  },
  logInText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonContainer: {
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderColor: Colors.white,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Login;
