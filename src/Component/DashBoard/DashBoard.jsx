import React, { useState, useEffect } from "react";
import { Button, Layout, Header } from "antd";
import { Link } from "react-router-dom";
import { app } from "../../firebase";
import firebase from "firebase";
import "./DashBoard.css";

function DashBoard() {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [current, setCurrent] = useState([]);

	const clickShow = () => {
		setShow(!show);
	};

	const faceBookAuthProvider = new firebase.auth.FacebookAuthProvider();
	const signedWthFacebook = () => {
		firebase.auth().signInWithPopup(faceBookAuthProvider);
	};

	const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
	const signedWithGoogle = () => {
		firebase.auth().signInWithPopup(googleAuthProvider);
	};

	const githubAuthProvider = new firebase.auth.GithubAuthProvider();
	const signedWithGithub = () => {
		firebase.auth().signInWithPopup(githubAuthProvider);
	};

	const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
	const signedWithTwitter = () => {
		firebase.auth().signInWithPopup(twitterAuthProvider);
	};

	const Register = () => {
		app.auth().createUserWithEmailAndPassword(email, password);
		app.auth().currentUser?.updateProfile({
			displayName: userName
		});
	};
	const SignInNow = () => {
		app.auth().signInWithEmailAndPassword(email, password);
	};

	useEffect(() => {
		app.auth().onAuthStateChanged(user => {
			setCurrent(user);
		});
	}, []);
	return (
		<div className="dashboard">
			<div className="Header">
				<p>Logo</p>
				<button>Log Out</button>
			</div>

			{clickShow ? (
				<center>
					<p> SignUP here</p>
					<form className="Form">
						<input
							type="text"
							placeholder="userName"
							value="userName"
							onChange={e => {
								setUserName(e.target.value);
							}}
						/>
						<input
							type="text"
							placeholder="email"
							value="email"
							onChange={e => {
								setEmail(e.target.value);
							}}
						/>
						<input
							type="password"
							placeholder="passsword"
							value="password"
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
						<button onClick={Register}>Register</button>
						<button className="Google" onClick={signedWithGoogle}>
							Register With Google
						</button>
						<button className="github" onClick={signedWithGithub}>
							Register With Github
						</button>
						<button className="Facebook" onClick={signedWthFacebook}>
							Register With Facebook
						</button>
						<button className="Twitter" onClick={signedWithTwitter}>
							Register With Twitter
						</button>
						<p>
							already have an account{" "}
							<Link
								onClick={() => {
									clickShow();
								}}>
								signin
							</Link>
						</p>
					</form>
				</center>
			) : (
				<form>
					<p>Signn in here</p>
					<input
						type="text"
						placeholder="userName"
						value="userName"
						onChange={e => {
							setUserName(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="email"
						value="email"
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>

					<input
						type="password"
						placeholder="passsword"
						value="password"
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<button onChange={SignInNow}>Login</button>

					<button className="Google">Signin With Google</button>
					<button classNameln="github">Signin With Github</button>
					<button className="Facebook">Signin With Facebook</button>
					<button className="Twitter">Signin With Twitter</button>
					<Link
						onClick={() => {
							clickShow();
						}}>
						Sign up
					</Link>
				</form>
			)}
		</div>
	);
}

export default DashBoard;
