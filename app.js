import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebaseの設定（教えてくれた内容）
const firebaseConfig = {
  apiKey: "AIzaSyDXTs6VmipPhW0P8YJjCAayUFketNunAKM",
  authDomain: "login-f8ff6.firebaseapp.com",
  projectId: "login-f8ff6",
  storageBucket: "login-f8ff6.firebasestorage.app",
  messagingSenderId: "821195620346",
  appId: "1:821195620346:web:466f4263b044a368b1ae43",
  measurementId: "G-1GB8LTHXET"
};

// 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

// ログインボタンのクリックイベント
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch((error) => {
        console.error("Login Error:", error);
        alert("ログインに失敗しました");
    });
});

// ログアウトボタンのクリックイベント
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// ログイン状態を監視して、画面を書き換える
onAuthStateChanged(auth, (user) => {
    if (user) {
        // ログイン中
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        userInfo.innerHTML = `<p>ようこそ、${user.displayName}さん！</p><img src="${user.photoURL}" width="50" style="border-radius:50%">`;
    } else {
        // ログアウト中
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        userInfo.innerHTML = '<p>ログインしてね</p>';
    }
});
