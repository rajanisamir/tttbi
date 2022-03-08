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
import { IoIosKey } from "react-icons/io";
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
      }
      const userDocs = await getDocs(userQuery);
      onSnapshot(doc(db, "users", userDocs.docs[0].id), (snapshot) =>
        setScore(snapshot.data().score),
        global.assignmentScore = score
      );
      setDocRef(doc(db, "users", userDocs.docs[0].id));
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
        className="filter-button"
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
        className="filter-button"
      >
        Free points!
      </button>
    );
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div className={"profile-pic"}>
            < IoMdPerson size={100} />
      </div>
      <br />
      <b>Name: </b> {user ? user.displayName : "Anonymous User"}
      <br />
      <br />
      <b>Score: </b> {score === -1 ? "..." : score}
      <br />
      <br />
      {user ? <SignOut /> : <SignIn />}
      <br />
      <br />
      <MagicButton />
      {/* <p>Assignment Score: {global.assignmentScore}</p> */}
      <br />
      <br />
      <div className={"world-row-icons"}>
        <IoIosKey size={70}
          className={"world-icon"}
        />
        <IoIosKey size={70}
          className={"world-icon"}
        />
        <IoIosKey size={70}
          className={"world-icon"}
        />
        <IoIosKey size={70}
          className={"world-icon"}
        />
      </div>
      <br />
      <div className={"world-point-row-values"}>
        <div class={"world-point-value"}>50</div>
        <div class={"world-point-value"}>100</div>
        <div class={"world-point-value"}>150</div>
        <div class={"world-point-value"}>200</div>
      </div>
      <br />
      <br />
      <h4>Rewards</h4>
      <br />
      <div className={"reward-row-icons"}>
        <IoIosTrophy size={50}
          className={"reward-icon"}
        />
        <IoIosTrophy size={50}
          className={"reward-icon"}
        />
        <IoIosTrophy size={50}
          className={"reward-icon"}
        />
        <IoIosTrophy size={50}
          className={"reward-icon"}
        />
      </div>
    </div>
  );
}

export default Profile;
