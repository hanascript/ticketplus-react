import { db } from './firebase';
import { auth } from './firebase';
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Create a new like
export const createNewLike = async (poster, title, imdbID, uid) => {
  const like = {
    poster,
    title,
    imdbID,
    uid
  };

  return await addDoc(collection(db, 'likes'), like);
};

// Get all likes for a user
export const getAllLikesForUser = async (uid) => {
  const likesRef = collection(db, 'likes');
  const q = query(likesRef, where('uid', '==', uid));

  const querySnapshot = await getDocs(q);

  const userLikes = remapDocs(querySnapshot.docs);

  console.log(userLikes);
  return userLikes;
};

// Check if a user has liked a specific movie
export const checkIfUserLikedMovie = async (imdbID, uid) => {
  const likesRef = collection(db, 'likes');
  const q = query(likesRef, where('uid', '==', uid), where('imdbID', '==', imdbID));

  const querySnapshot = await getDocs(q);

  // Returns true if the user has liked this movie, false otherwise
  return !querySnapshot.empty;
};

export const deleteLike = async (movieId, uid) => {
  const likeRef = collection(db, 'likes');
  const q = query(likeRef, where('imdbID', '==', movieId), where('uid', '==', uid));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log('No like found');
    return;
  }

  const likeDoc = querySnapshot.docs[0];
  return await deleteDoc(doc(db, 'likes', likeDoc.id));
};

const remapDocs = docs => {
  const newDocs = docs.map(doc => ({ ...doc.data(), id: doc.id }));

  return newDocs;
};
