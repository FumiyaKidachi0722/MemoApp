import { Feather } from '@expo/vector-icons';
import CircleButton from 'components/CircleButton';
import LogOutButton from 'components/LogOutButton';
import MemoListItem from 'components/MemoListItem';
import { db, auth } from 'config';
import { router, useNavigation } from 'expo-router';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { type Memo } from 'types/memo';

const handlePress = (): void => {
  router.push('/memo/create');
};

const List = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const tableData = query(ref, orderBy('updatedAt', 'desc'));
    const unsubscribe = onSnapshot(tableData, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      <CircleButton onPress={handlePress}>
        <Feather name="plus" size={40} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default List;
