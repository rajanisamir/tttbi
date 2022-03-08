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

  var reward1 = global.assignmentScore > 25 ? "reward1-show" : "reward1-lock";
  var reward2 = global.assignmentScore > 75 ? "reward2-show" : "reward2-lock";
  var reward3 = global.assignmentScore > 125 ? "reward3-show" : "reward3-lock";
  var reward4 = global.assignmentScore > 175 ? "reward4-show" : "reward4-lock";

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
      <br />
      <h4>Rewards</h4>
      <br />
      <div className={"reward-price-row"}>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy size={70}
            className={"reward-icon"}
          />
          <div className={reward1}>25 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy size={70}
            className={"reward-icon"}
          />
          <div className={reward2}>75 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy size={70}
            className={"reward-icon"}
          />
           <div className={reward3}>125 points</div>
        </div>
        <div className={"reward-price-pairs"}>
          <IoIosTrophy size={70}
            className={"reward-icon"}
          />
          <div className={reward4}>175 points</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
