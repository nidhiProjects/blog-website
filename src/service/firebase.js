import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { database } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export const signup = async ({ email, password }) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    sessionStorage.setItem("user", user.uid);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createBlog = async (reqBody) => {
  try {
    const docRef = await addDoc(collection(database, "blogs"), reqBody);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const readBlogs = async () => {
  try {
    let blogs = [];
    const querySnapshot = await getDocs(collection(database, "blogs"));
    querySnapshot.forEach((doc) => {
      blogs.push({...doc.data(),uid:doc.id});
    });
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateBlogs = async ({ id, newBlog }) => {
  try {
    const documentRef = doc(database, "blogs", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(documentRef, newBlog);
  } catch (error) {
    throw new Error(error.message);
  }
};
