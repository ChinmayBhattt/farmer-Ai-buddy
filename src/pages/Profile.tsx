import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Auth } from '../components/Auth';

const Profile: FC = () => {
  const [user, loading] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
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
              <img src={user.photoURL} alt="Profile" className="w-14 h-14 rounded-lg" />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {user ? user.displayName || user.email : 'Your account'}
            </h2>
            <p className="text-gray-600">
              {user ? 'Welcome to Plantix Community' : 'Join Plantix Community'}
            </p>
          </div>
        </div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full mt-4 border-2 border-red-600 text-red-600 rounded-lg py-2 font-medium hover:bg-red-50"
          >
            Sign out
          </button>
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