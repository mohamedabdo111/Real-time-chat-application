import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loginHook = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError]: any = useState({});
  const [registerError, setRegisterError]: any = useState({});
  const [RegisterState, setRegisterState] = useState({
    username: "",
    email: "",
    Registerpassword: "",
    confirmPassword: "",
  });

  const validationLogin = () => {
    const newErrors: any = {};

    if (loginState.email === "") {
      newErrors.email = "Email is required";
    }
    if (loginState.password === "") {
      newErrors.password = "Password is required";
    } else if (loginState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setLoginError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (loginError[name]) {
      setLoginError((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validationLogin()) return;
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );
      setLoginState({
        email: "",
        password: "",
      });
    } catch (error: any) {
      toast.error("Wrong email or password.");
    } finally {
      setLoading(false);
    }
  };

  // register

  const validationRegister = () => {
    const newErrors: any = {};
    if (RegisterState.email === "") {
      newErrors.email = "Email is required";
    }

    if (RegisterState.username === "") {
      newErrors.username = "Username is required";
    }

    if (RegisterState.Registerpassword === "") {
      newErrors.Registerpassword = "Password is required";
    } else if (RegisterState.Registerpassword.length < 6) {
      newErrors.Registerpassword = "Password must be at least 6 characters";
    }

    if (RegisterState.confirmPassword === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (
      RegisterState.confirmPassword !== RegisterState.Registerpassword
    ) {
      newErrors.confirmPassword = "Password does not match";
    }
    setRegisterError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (registerError[name]) {
      setRegisterError((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validationRegister()) return;
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        RegisterState.email,
        RegisterState.Registerpassword
      );

      await setDoc(doc(db, "users", res.user.uid), {
        userName: RegisterState.username,
        email: RegisterState.email,
        uid: res.user.uid,
        blocked: [],
        createdAt: new Date().toISOString(),
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      setRegisterState({
        username: "",
        email: "",
        Registerpassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // Implement Google login logic here

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user, "user");
        await setDoc(doc(db, "users", user.uid), {
          userName: user.displayName,
          email: user.email,
          uid: user.uid,
          blocked: [],
          createdAt: new Date().toISOString(),
        });

        await setDoc(doc(db, "userChats", user.uid), {
          chats: [],
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loginState,
    setLoginState,
    loginError,
    registerError,
    loading,
    setLoginError,
    RegisterState,
    setRegisterState,
    validationLogin,
    handleLoginChange,
    handleRegisterChange,
    handleLoginSubmit,
    handleRegisterSubmit,
    setRegisterError,
    loginWithGoogle,
  };
};

export default loginHook;
