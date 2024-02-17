import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { signInWithPopup,signOut} from "firebase/auth";




const provider = new GoogleAuthProvider()
export const loginWithGoogle=async()=>{
    await signInWithPopup(auth,provider)
};


// export const authCheck=()=>{
//     onAuthStateChanged(auth,(response)=>{
//         console.log(response)
//     })

// }

export const logout = () => {
    signOut(auth);
  };
<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Smashicons - Flaticon</a>