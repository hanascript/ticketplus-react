import { useMovie } from '../../context/movie-context';
import { useState } from 'react';

import styles from './popup.module.css';
import { Loader2, TriangleAlert } from 'lucide-react';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUpPopup = () => {
  const { showSignUp, setShowSignUp, setShowSignIn, setUser } = useMovie();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClosePopup = () => {
    setShowSignUp(false);
    setShowSignIn(false);
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

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        setUser(user);
        setLoading(false);
        handleClosePopup();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered.');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email address.');
        } else if (error.code === 'auth/weak-password') {
          setErrorMessage('Password is too weak.');
        } else {
          setErrorMessage('Something went wrong, please try again.');
        }
        setLoading(false);
      });
  };

  return (
    <>
      {showSignUp && (
        <>
          <div className={styles.popup}>
            <span>Sign up to create your account</span>
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
