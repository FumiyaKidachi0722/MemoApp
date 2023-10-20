import { auth } from 'config';
import { router } from 'expo-router';
import { Text, TouchableOpacity, Alert } from 'react-native';

const deleteAccount = async (): Promise<void> => {
  if (auth.currentUser) {
    try {
      await auth.currentUser.delete();
      console.log('User account deleted');
      router.replace('/auth/log_in');
    } catch (error) {
      console.error('Failed to delete user: ', error);
    }
  }
};

const showDeleteConfirmation = () => {
  Alert.alert(
    'Delete Account',
    'Are you sure you want to delete your account?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: deleteAccount,
      },
    ],
    { cancelable: false },
  );
};

const DeleteAccountButton = () => {
  return (
    <TouchableOpacity onPress={showDeleteConfirmation}>
      <Text style={{ color: 'red' }}>Delete</Text>
    </TouchableOpacity>
  );
};

export default DeleteAccountButton;
