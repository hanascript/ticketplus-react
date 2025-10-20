import { useState } from 'react';
import { useMovie } from '../../context/movie-context';

import styles from './popup.module.css';
import { Loader2, TriangleAlert } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export const SignInPopup = () => {
  const { showSignIn, setShowSignIn, setShowSignUp, setUser } = useMovie();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClosePopup = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setErrorMessage('');
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        setUser(user);
        setLoading(false);
        handleClosePopup();
      })
      .catch(error => {
        if (error.code === 'auth/invalid') {
          setErrorMessage('Invalid email or password.');
        } else {
          setErrorMessage('Something went wrong, please try again.');
        }
        setLoading(false);
      });
  };

  return (
    <>
      {showSignIn && (
        <>
          <div className={styles.popup}>
            <span>Sign In to your account</span>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input type='email' placeholder='Email' name='email' disabled={loading} />
                <input type='password' placeholder='Password' name='password' disabled={loading} />
              </div>
              {errorMessage && (
                <p className={styles.errorMessage}>
                  <TriangleAlert />
                  {errorMessage}
                </p>
              )}
              <div className={styles.popupBtns}>
                <button className={styles.popupBtn} disabled={loading}>
                  {loading ? <Loader2 className='spin-animation' /> : 'Confirm'}
                </button>
                <button className={styles.popupBtnSecondary} onClick={handleClosePopup} disabled={loading}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className={styles.backdropWrapper}></div>
        </>
      )}
    </>
  );
};
