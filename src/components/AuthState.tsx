import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../firebase';
import { useAppDispatch } from '../store';
import { authActions } from '../store/auth';

const useAuthState = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.loggedIn({
            displayName: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(authActions.loggedOut());
      }
      setAuthChecked(true);
    });
    dispatch(authActions.authChecked(true));
    return unsubscribe;
  }, []);
  return authChecked;
};

export default useAuthState;
