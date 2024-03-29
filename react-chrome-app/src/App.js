import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //config
  apiKey: "AIzaSyD2rOQkWp9pcH2TyatbxMSvITO7yTk-z0U",
  authDomain: "chatextension-cedef.firebaseapp.com",
  projectId: "chatextension-cedef",
  storageBucket: "chatextension-cedef.appspot.com",
  messagingSenderId: "124679330211",
  appId: "1:124679330211:web:aee4063202a067640de216",
  measurementId: "G-71E8Y21QYR"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App(){
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className='App'>
      <header>
        <h1>This is the title of the page</h1>
        <SignOut />
      </header>
      <section>
        {user? <ChatRoom />:<SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const sightnInWithGoogle = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={sightnInWithGoogle}>Sign In With Google</button>
  )
}
function SignOut() {
  return auth.currentUser &&(
    <button onClick={()=>{auth.signOut()}}>Sign Out</button>
  )
}
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(25);
  // const [messages] = useCollectionData(query, {idField:'id'})
  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log(messages)

  return(<>
    <main>
      {messages && messages.map(msg=> <ChatMessage key={msg.id} message={msg} />)}
    </main>
  </>)
  
}
function ChatMessage(props)
 {
  const {text, uid, photoURL} = props.message;

  return(
    <>
      <div>
        <p>{text}</p>
      </div>
    </>
  )
 }