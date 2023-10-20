import { useEffect } from 'react';
import { Keyboard, Animated, KeyboardEvent } from 'react-native';

export const useKeyboardHeight = () => {
  const keyboardHeight = new Animated.Value(0);

  const keyboardDidShow = (e: KeyboardEvent) => {
    Animated.timing(keyboardHeight, {
      toValue: e.endCoordinates.height,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidHide = () => {
    Animated.timing(keyboardHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardHeight;
};
