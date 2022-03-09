import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  updateDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { IoIosTrophy } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";

function Profile() {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(-1);
  const [docRef, setDocRef] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  function SignIn() {
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", result.user.uid)
      );
      const docs = await getDocs(userQuery);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          score: 0,
        });
        if (user) {
          global.username = user.displayName;
        }
      }
      const userDocs = await getDocs(userQuery);
      onSnapshot(doc(db, "users", userDocs.docs[0].id), (snapshot) =>
        setScore(snapshot.data().score)
      );
      setDocRef(doc(db, "users", userDocs.docs[0].id));
      // initScore();
    };
    return (
      <button className="filter-button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    );
  }

  function SignOut() {
    return (
      <button
        onClick={async () => {
          await signOut(auth);
          setUser(auth.currentUser);
          setScore(-1);
        }}
        className="sign-in-out"
      >
        Sign Out
      </button>
    );
  }

  // For testing functionality...
  function MagicButton() {
    return (
      <button
        onClick={() => {
          updateDoc(docRef, { score: increment(1) });
          global.assignmentScore = score;
        }}
        className="sign-in-out"
      >
        Free points!
      </button>
    );
  }

  // function initScore() {
  //   updateDoc(docRef, { score: increment(0) });
  //   global.assignmentScore = score;
  // }

  var reward1 = global.assignmentScore > 25 ? "reward1-show" : "reward1-lock";
  var reward2 = global.assignmentScore > 75 ? "reward2-show" : "reward2-lock";
  var reward3 = global.assignmentScore > 125 ? "reward3-show" : "reward3-lock";
  var reward4 = global.assignmentScore > 175 ? "reward4-show" : "reward4-lock";

  // global.assignmentScore = score;

  return (
    <div className="profile-view">
      <h1>User Profile</h1>
      <div className="user">
        <div className={"profile-pic"}>
          <IoMdPerson size={100} />
        </div>
        <div className="user-info">
          <b>Name: </b>
          {global.username
            ? global.username
            : user
            ? user.displayName
            : "Anonymous User"}
          <b>Score: </b>
          {global.assignmentScore === -1 ? "..." : global.assignmentScore}
        </div>
      </div>
      <div className="profile-buttons">
        {user ? <SignOut /> : <SignIn />}
        <MagicButton />
      </div>
      <h2>Rewards</h2>
      <br />
      <div className={"reward-price-row"}>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy
            className={
              global.assignmentScore > 175 ? "reward-icon1-w" : "reward-icon1"
            }
          />
          <div className={reward1}>175 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy
            className={
              global.assignmentScore > 125 ? "reward-icon2-w" : "reward-icon2"
            }
          />
          <div className={reward2}>125 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy
            className={
              global.assignmentScore > 75 ? "reward-icon3-w" : "reward-icon3"
            }
          />
          <div className={reward3}>75 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy
            className={
              global.assignmentScore > 25 ? "reward-icon4-w" : "reward-icon4"
            }
          />
          <div className={reward4}>25 points</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
