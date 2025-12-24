import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 君のスクリーンショットから取得した設定値だよ
const firebaseConfig = {
    apiKey: "AIzaSyDXTs6VmippHW0P8YjJCAayUFketNunAKM",
    authDomain: "login-f8ff6.firebaseapp.com",
    projectId: "login-f8ff6",
    storageBucket: "login-f8ff6.firebasestorage.app",
    messagingSenderId: "821195620346",
    appId: "1:821195620346:web:466f4263b044a368b1ae43",
    measurementId: "G-1GB8LTHXET"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

// ログインボタンを押した時の処理
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch((error) => {
        console.error("エラーが発生したよ:", error);
        alert("ログインに失敗しちゃった。設定を確認してみてね。");
    });
});

// ログアウトボタンを押した時の処理
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// ログイン状態をチェックする（ログインしてたら名前を出す）
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        userInfo.innerHTML = `
            <p>ようこそ、<strong>${user.displayName}</strong>さん！</p>
            <img src="${user.photoURL}" alt="プロフィール画像" style="border-radius: 50%; width: 50px;">
        `;
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        userInfo.innerHTML = '<p>ログインしていません</p>';
    }
});
