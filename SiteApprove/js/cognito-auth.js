function signInButton() {
    // sign-in to AWS Cognito
    
    var data = { 
              UserPoolId : _config.cognito.userPoolId,
      ClientId : _config.cognito.clientId
      };
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();

      var authenticationData = {
      Username : document.getElementById("emailInputSignin").value,
      Password : document.getElementById("passwordInputSignin").value,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
      UserPoolId : _config.cognito.userPoolId, // Your user pool id here
      ClientId : _config.cognito.clientId, // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
      Username : document.getElementById("emailInputSignin").value,
      Pool : userPool,
    };
    
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
              var accessToken = result.getAccessToken().getJwtToken();
              console.log(result);	
              
              //get user info, to show that you are logged in
                  cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(result);
                        window.location.href = '/SiteApprove/siteapprove.html';
                    });
              
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

