import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FaceBookSignup from "./signup-fb"
import FaceBookCustomBtnSignup from "./signup-custombtn-fb"
import GoogleSignup from "./signup-google"
import MobileNoVerification from "./signup-fb-mobile"

export default class Login extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      googleUserLoggedIn: false
    }

  }
  componentDidMount() {
    this.setupGoogleSignin();
  }

  googleAuth() {
    if (this.state.googleUserLoggedIn) {
      GoogleSignin.signOut()
        .then(() => {
          this.setState({ googleUserLoggedIn: false })
          console.log('out');
        })
        .catch((err) => {
        });
    } else {
      GoogleSignin.signIn()
        .then((user) => {
          this.setState({ googleUserLoggedIn: true })
          alert("signIn", user);
          console.log(user);
        })
        .catch((err) => {
          alert("WRONG SIGNIN", err);

          console.log('WRONG SIGNIN', err);
        })
        .done();
    }
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '468673413267-tqu0r624lvm82tmuvaogjflfu2n55ant.apps.googleusercontent.com',
        //webClientId: settings.webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      //alert("currentUserAsync", user);

      console.log(user);
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }


  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          alert('Login was successful with permissions: '
            + result.grantedPermissions.toString());
        }
      },
      function (error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FaceBookSignup />
        <FaceBookCustomBtnSignup />
        <GoogleSignup />
        <MobileNoVerification />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});