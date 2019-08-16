//Sign up and login javascript


function showPassword() {
    
        var password = document.getElementById("passwordInput");

        if (password.type === "password") 
        {
          password.type = "text";
          document.getElementById("showPSWBox").innerHTML="✓";
        }

        else 
        {
          password.type = "password";
          document.getElementById("showPSWBox").innerHTML="";
        }
}
