import { FontAwesome5 } from '@expo/vector-icons';
import CircleButton from 'components/CircleButton';
import { db, auth } from 'config';
import { router } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useKeyboardHeight } from 'hooks/useKeyboardHeight';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Animated } from 'react-native';

const handlePress = (bodyText: string): void => {
  if (auth.currentUser == null) return;
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
  addDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then(() => {
      // console.log('docRef: ', docRef);
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
};

const Create = () => {
  const [bodyText, setBodyText] = useState('');
  const keyboardHeight = useKeyboardHeight();

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
        <CircleButton onPress={() => handlePress(bodyText)}>
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
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Create;
