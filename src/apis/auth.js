import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { signInWithPopup,signOut} from "firebase/auth";




const provider = new GoogleAuthProvider()
export const loginWithGoogle=async()=>{
    const result =  await signInWithPopup(auth,provider)
    if(result.email!==null){
      
    }
};



export const logout = () => {
    signOut(auth);
  };
<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Smashicons - Flaticon</a>