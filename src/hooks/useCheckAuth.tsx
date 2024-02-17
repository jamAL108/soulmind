import { useEffect, useState } from "react";
import { auth } from "@/apis/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    photoURL: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (response: any) => {
      if (response) {
        setUserData(response);
        setIsAuth(true);
        setLoading(false);
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    });
  }, []);
  return { isAuthenticated, userData, loading };
}