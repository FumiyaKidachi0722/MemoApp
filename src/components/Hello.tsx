import { View, Text, StyleSheet } from 'react-native';

const Hello = () => {
  return (
    <View>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    backgroundColor: 'blue',
    fontSize: 40,
    padding: 16,
  },
});

export default Hello;
