import Button from 'components/Button';
import { auth as firebaseAuth } from 'config';
import { Link, router } from 'expo-router';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  getAuth,
} from 'firebase/auth';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const performEmailLogin = (email: string, password: string): void => {
  signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      console.log('Email login successful: ', userCredential.user.uid);
      router.replace('/memo/list');
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(`${code} : ${message}`);
      Alert.alert(message);
    });
};

const performAnonymousLogin = (): void => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then((userCredential) => {
      console.log('Anonymous login successful: ', userCredential.user.uid);
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(`${code} : ${message}`);
      Alert.alert(message);
    });
};

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.inputField}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={() => performEmailLogin(email, password)}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <Link href="/auth/sign_up" asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here!</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={performAnonymousLogin}>
            <Text style={styles.footerLink}>Log in anonymously</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  contentWrapper: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#fff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    marginRight: 8,
    color: '#000',
  },
  footerLink: {
    fontSize: 14,
    color: '#467FD3',
  },
});

export default LogIn;
