import { doc, setDoc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  phoneNumber?: string;
  address?: string;
  preferences?: {
    notifications: boolean;
    language: string;
  };
}

export const createOrUpdateUser = async (userData: Partial<UserData>) => {
  if (!userData.uid) throw new Error('User ID is required');
  
  const userRef = doc(db, 'users', userData.uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    // Create new user
    await setDoc(userRef, {
      ...userData,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      preferences: {
        notifications: true,
        language: 'en'
      }
    });
  } else {
    // Update existing user
    await updateDoc(userRef, {
      ...userData,
      lastLogin: Timestamp.now()
    });
  }
};

export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}; 