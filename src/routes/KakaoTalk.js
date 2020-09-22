import React, { useEffect } from "react";
import { authService, functionService } from "fbase";

const KakaoTalk = (props) => {
    const loginKakao = async () => {
        const _this = this;

    const kakaoAuthCode = props.location.search.replace('?code=', '');
    if(kakaoAuthCode) {
      console.log(kakaoAuthCode);

      // 카카오 로그인 토큰을 파이어베이스 함수에 전달합니다.
      var kakaoAuth = functionService.httpsCallable('KakaoAuth');
      kakaoAuth({code: kakaoAuthCode}).then(function(result) {
        console.log(result);

        // Read result of the Cloud Function.
        var kakaoToken = result.data.kakao_token;
        var fireToken = result.data.firebase_token;
        console.log(kakaoToken, fireToken);

        // 토근이 정상적으로 처리될 경우 로그인 처리합니다.
        authService.signInWithCustomToken(fireToken)
        .then(function(result) {

          _this.token = kakaoToken;
          window.Kakao.Auth.setAccessToken(kakaoToken);

          const user = result.user;
          console.log("User : ", user);
          if(result.additionalUserInfo.isNewUser) {
            console.log("신규 사용자...");
            //_this.$router.push("/welcome");   // welcome
          } else {
            //_this.$router.push("/profile");
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);

          // console.log(error);
          alert("토큰이 정상적이지 않습니다. 만료된 토큰이거나 이미 사용된 토큰입니다.");
          window.location = `/login`;
          return;
        });
      }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;

        // console.log(error);
        // console.log(code, message, details);
        // console.log(error.body);
        
        alert("정상적이지 않은 접근입니다. 만료된 데이터이거나 이미 사용된 데이터입니다.");
        // alert(message + ' ' + details);
        window.location = `/login`;
        return;
      });
    } else {
      alert("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
      window.location = `/login`;
      return;
    }
      };
      useEffect(() => {
        loginKakao();
      }, []);
  return (
    <></>
  );
};
export default KakaoTalk;