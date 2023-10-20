import { FontAwesome5 } from '@expo/vector-icons';
import CircleButton from 'components/CircleButton';
import { auth, db } from 'config';
import { router, useLocalSearchParams } from 'expo-router';
import { onSnapshot, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { type Memo } from 'types/memo';

const handlePress = (id: string): void => {
  router.push({ pathname: '/memo/edit', params: { id } });
};
const Detail = () => {
  const params = useLocalSearchParams();
  const id = String(params.id);
  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      const data = memoDoc.data();
      if (!data) {
        console.error('データが存在しません。');
        return;
      }
      const { bodyText, updatedAt } = data;
      if (bodyText !== undefined && updatedAt !== undefined) {
        setMemo({
          id: memoDoc.id,
          bodyText,
          updatedAt,
        });
      } else {
        console.error('bodyTextまたはupdatedAtがundefinedです。');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo?.updatedAt?.toDate().toLocaleString('ja-jp')}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>{memo?.bodyText}</Text>
      </ScrollView>
      <CircleButton
        onPress={() => handlePress(id)}
        style={{ top: 60, bottom: 'auto' }}
      >
        <FontAwesome5 name="pen" size={25} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },

  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});

export default Detail;
