import { Feather } from '@expo/vector-icons';
import { auth, db } from 'config';
import { Link } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { type Memo } from 'types/memo';

interface Props {
  memo: Memo;
}

const handlePress = (id: string): void => {
  if (auth.currentUser === null) return;
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id);
  Alert.alert('メモを削除します', '', [
    {
      text: 'キャンセル',
    },
    {
      text: '削除',
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
          .then(() => {
            Alert.alert('削除に成功しました');
          })
          .catch(() => {
            Alert.alert('削除に失敗しました');
          });
      },
    },
  ]);
};

const MemoListItem = (props: Props) => {
  const { memo } = props;
  const { bodyText, updatedAt } = memo;
  if (bodyText === null || updatedAt === null) return null;
  const dataString = updatedAt.toDate().toLocaleString('ja-jp');

  return (
    <Link
      href={{
        pathname: '/memo/detail',
        params: { id: memo.id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text numberOfLines={1} style={styles.memoListItemTitle}>
            {bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dataString}</Text>
        </View>
        <TouchableOpacity onPress={() => handlePress(memo.id)}>
          <Feather name="x" size={30} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
});

export default MemoListItem;
