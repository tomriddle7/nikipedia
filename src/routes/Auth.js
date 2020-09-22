import React from "react";
import { authService, firebaseInstance } from "fbase";
import { xeicon } from "xeicon"
import AuthForm from "components/AuthForm";

const Auth = (props) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    props.history.goBack();
    // console.log(data);
  };
  const onSocialClick2 = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === "kakao") {
      const protocol = window.location.protocol;
      const hostName = window.location.hostname;
      const port = window.location.port;

      let url = protocol + '//' + hostName + (port ? ':' + port : '');
      url += '/callback/kakaotalk';

      window.Kakao.Auth.authorize({
        redirectUri: url,
        throughTalk: true
      });
    }
    // console.log(data);
  };
  return (
    <div className="authContainer">
      <AuthForm {...props}/>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <xeicon className="xi-google"/>
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <xeicon className="xi-github"/>
        </button>
      </div>
      <div className="authBtns">
        <button onClick={onSocialClick2} name="naver" className="authBtn">
          Continue with Naver <xeicon className="xi-naver-square"/>
        </button>
        <button onClick={onSocialClick2} name="kakao" className="authBtn">
          Continue with Kakao <xeicon className="xi-kakaotalk"/>
        </button>
      </div>
    </div>
  );
};
export default Auth;