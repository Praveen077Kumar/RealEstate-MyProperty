import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from "../firebase";
import {useDispatch} from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

 const Oauth = () => {
    const dispatch = useDispatch();
    const Navigate= useNavigate();
    const handleGoogleClick = async() => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post('/api/auth/google',{
          name:  result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      const data = await res.data;
      dispatch(signInSuccess(data));
      Navigate('/home')
    } catch (error) {
      console.log("could not sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-500 p-3 rounded-lg text-white uppercase hover:opacity-90"
    >
      Continue with Google
    </button>
  );
};

export default Oauth;
