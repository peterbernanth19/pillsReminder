import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FCM_TOKEN, LOGIN_URL} from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<any>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fcm_token: FCM_TOKEN,
          zone: 'Asia/Kolkata',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsFetching(false);
        navigation.replace('HomeScreen');
        await AsyncStorage.setItem('token', data.data.token);
      } else {
        setIsFetching(false);
        setErrorMessage(data.message);
      }
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.flexFill}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1208165459/vector/cartoon-pill-character.jpg?s=612x612&w=0&k=20&c=uNpY1Ko_ypHFLySC9euiefD_WAQqiAeuvwflwO5DIUM=',
          }}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login Details</Text>
        <TextInput
          style={errorMessage ? styles.errInput : styles.input}
          placeholder="User name or Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          onChange={() => setErrorMessage('')}
        />
        <TextInput
          style={errorMessage ? styles.errInput : styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onChange={() => setErrorMessage('')}
        />
        <Text style={styles.forgotPassword}>Forgot Password</Text>
        <Text style={errorMessage && styles.errMsg}>{errorMessage}</Text>
        <Pressable style={styles.signInBtn} onPress={handleLogin}>
          {!isFetching ? (
            <Text style={styles.signInTxt}>Sign In</Text>
          ) : (
            <ActivityIndicator size={'small'} color={'#fff'} />
          )}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  errInput: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  errMsg: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#666',
    marginBottom: 20,
  },
  signInBtn: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#4285F4',
    borderRadius: 10,
    marginBottom: 20,
  },
  signInTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
