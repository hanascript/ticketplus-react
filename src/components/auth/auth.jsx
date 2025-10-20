import { signOut } from 'firebase/auth';
import { useMovie } from '../../context/movie-context';
import { auth } from '../../firebase/firebase';
import styles from './auth.module.css';

export const AuthButtons = () => {
  const { setShowSignIn, setShowSignUp, user, setUser } = useMovie();

  const handleSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (user) {
    return (
      <div className={styles.authBtnWrapper}>
        <button className={styles.signInBtn} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authBtnWrapper}>
      <button className={styles.signUpBtn} onClick={handleSignUp}>
        Sign Up
      </button>
      <button className={styles.signInBtn} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};
