import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Auth } from '../components/Auth';
import { getUserData, UserData } from '../services/userService';

const Profile: FC = () => {
  const [user, loading] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setLoadingUserData(true);
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingUserData(false);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading || loadingUserData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Account Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-14 h-14 rounded-lg object-cover" />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {user ? user.displayName || user.email : 'Your account'}
            </h2>
            <p className="text-gray-600">
              {user ? 'Welcome to Plantix Community' : 'Join Plantix Community'}
            </p>
            {userData && (
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {user ? (
          <div className="space-y-4 mt-4">
            {userData?.preferences && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-medium mb-2">Preferences</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Notifications</span>
                    <span>{userData.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language</span>
                    <span className="capitalize">{userData.preferences.language}</span>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="w-full border-2 border-red-600 text-red-600 rounded-lg py-2 font-medium hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full mt-4 border-2 border-teal-600 text-teal-600 rounded-lg py-2 font-medium hover:bg-teal-50"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Share Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <div>
            <h2 className="font-semibold">Grow smart together!</h2>
            <p className="text-gray-600">Share Plantix and help farmers solve their plant problems.</p>
          </div>
        </div>
        <button className="text-teal-600 font-medium mt-2 text-right w-full">
          Share Plantix
        </button>
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <h2 className="font-semibold">How is your experience with Plantix app?</h2>
            <p className="text-gray-600">We'd love to hear your thoughts and suggestions.</p>
          </div>
        </div>
        <button className="text-teal-600 font-medium mt-2 text-right w-full">
          Give Feedback
        </button>
      </div>

      {/* Stories Section */}
      <div className="bg-white p-4">
        <h2 className="font-semibold mb-4">Stories picked up for you</h2>
        <div className="flex items-center justify-center py-8">
          <button className="text-blue-600">Try again</button>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowAuthModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-md" onClick={e => e.stopPropagation()}>
                <Auth onSuccess={() => setShowAuthModal(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile; 