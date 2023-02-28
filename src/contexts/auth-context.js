import { createContext, useContext, useEffect, useReducer, useRef , useState} from 'react';
import PropTypes from 'prop-types';
import { auth, ENABLE_AUTH } from '../lib/auth';
import {api} from '../services/api';
import nookies from 'nookies'
import Router from 'next/router'


// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  let  isAuthenticated = !!user;


  useEffect(() => {
    const cookies = nookies.get(undefined)["nextauth.token"]
    console.log(cookies)
    const d = document.cookie.split(`; nextauth.token=`)
    console.log(d)

    if (cookies != null) {

      setUser(JSON.parse(
        localStorage.getItem("user-data")
      ))
      isAuthenticated = true;
    }
    else{
      Router.push('/sign-in/loginAuth');
    }
  }, []);


  async function  signIn (userpayload) {
    console.log(userpayload)
    const response = await api.post('/api/Auth/v1/signin',userpayload)
    console.log(response.data.accessToken)
    nookies.set(undefined, 'nextauth.token', response.data.accessToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
    api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
    localStorage.setItem("access-token", response.data.accessToken);
    localStorage.setItem("user-data", JSON.stringify(response.data.user))
    setUser(response.data.user)
    if(response.data.user.permissionId =='1'){
      Router.push('/projects');
    }else {
      Router.push('/activityplan');
    }


  };

  const signOut = () => {
    const cookies = nookies.get(undefined)

    for (const cookie of Object.keys(cookies)) {
      nookies.destroy(undefined, cookie)
    }
    Router.push('/sign-in/loginAuth');
  };


  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn,signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

console.log(AuthContext)
export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
