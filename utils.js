function showPasswd() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function empty()
{
  var x;
  x = document.getElementById("username").value;
  var y = document.getElementById("password").value;
  if (x == "" || y == "") {
    alert("Data missing");
    return false;
  };
}