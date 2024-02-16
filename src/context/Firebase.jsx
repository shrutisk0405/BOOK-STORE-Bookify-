import  React,{ createContext , useContext ,useState,useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
}
 from 'firebase/auth';
 import {getFirestore,collection,addDoc,
  getDocs,
   doc,
   getDoc,
  query,
  where,
  } from 'firebase/firestore';
 import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

const FirebaseContext= createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBKUSX_mYxPgSaeSgaw3R_YPzCvm6B6Vh8",
    authDomain: "bookify-f745f.firebaseapp.com",
    projectId: "bookify-f745f",
    storageBucket: "bookify-f745f.appspot.com",
    messagingSenderId: "361453252116",
    appId: "1:361453252116:web:e904396547787889098101",

  };
export const useFirebase = ()=>useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore =getFirestore(firebaseApp);
const storage=getStorage(firebaseApp);

const googleProvider=new GoogleAuthProvider();

export const FirebaseProvider=(props)=>{
const [user,setUser]=useState(null);

  useEffect(()=> {
    onAuthStateChanged(firebaseAuth,user=>{
      if (user) setUser(user);
      else setUser(null);
    });
  },
  [])
  const signupUserWithEmailAndPassword=(email,password) =>
  createUserWithEmailAndPassword(firebaseAuth,email,password);

  const signinUserWithEmailAndPass=(email,password) =>
  signInWithEmailAndPassword(firebaseAuth,email,password);

  const signinWithGoogle=()=> signInWithPopup(firebaseAuth,googleProvider);

  console.log(user);
  const handleCreateNewListing=async (name,isbn,price,coverPic) =>{
    const imageRef=ref(storage,`uploads/images/${Date.now()}-${coverPic.name}`);
   const uploadResult=await uploadBytes(imageRef,coverPic);
    return await addDoc(collection(firestore,'books'),{
    name,
    isbn,
    price,
    imageURL:uploadResult.ref.fullPath,
    userID:user.uid,
    userEmail:user.email,
    displayName:user.displayName,
    photoURL:user.photoURL,
   })
  };

  const listAllBooks=()=>{
    return getDocs(collection(firestore,'books'));
  };
  const getBookById=async(id)=>{
    const docRef =doc(firestore,'books',id);
    const result =await getDoc(docRef);
    return result;


  }
   const getImageURL=async (path)=>{
    return await getDownloadURL(ref(storage,path));

   }
   
   const placeOrder=async(bookId,qty)=>{
    
    const collectionRef=collection(firestore,'books',bookId,"orders");
    const result =await addDoc(collectionRef,{
    userID:user.uid,
    userEmail:user.email,
    displayName:user.displayName,
    photoURL:user.photoURL,
    qty:Number(qty),
    });
    return result;
    

   };
   const fetchMyBooks=async(userId)=>{
    
     const collectionRef=collection(firestore,"books")
     const q = query(collectionRef,where("userID" , "==",userId))
     const result= await getDocs(q);
     return result;
   };
   const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };
    

  
  const isLoggedIn =user ?true:false;

    return (
    <FirebaseContext.Provider value={{
    signinWithGoogle,
    signupUserWithEmailAndPassword,
    signinUserWithEmailAndPass,
    isLoggedIn,
    handleCreateNewListing,
    listAllBooks,
    getImageURL,
    getBookById,
    placeOrder,
    fetchMyBooks,
    user,
    getOrders,
    }}>
      {props.children}
      </FirebaseContext.Provider>
    )
};