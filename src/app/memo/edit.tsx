import { FontAwesome5 } from '@expo/vector-icons';
import CircleButton from 'components/CircleButton';
import { auth, db } from 'config';
import { router, useLocalSearchParams } from 'expo-router';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { useKeyboardHeight } from 'hooks/useKeyboardHeight';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Animated, Alert } from 'react-native';

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) return;
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      router.back();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('更新に失敗しました');
    });
};

const Edit = () => {
  const keyboardHeight = useKeyboardHeight();
  const id = String(useLocalSearchParams().id);
  const [bodyText, setBodyText] = useState('');

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        const RemoteBodyText = docRef?.data()?.bodyText;
        setBodyText(RemoteBodyText);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <Animated.View style={{ marginBottom: keyboardHeight }}>
        <CircleButton onPress={() => handlePress(id, bodyText)}>
          <FontAwesome5 name="check" size={25} />
        </CircleButton>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
