function login(){
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorDiv = document.getElementById("error");

    const validUser = "prathap";
    const validPass = "3537";

    if(user == validUser && pass == validPass){
        window.location.href = "attendance.html";
    }
    else{
        errorDiv.textContent="invalid userName or password!"
    }
}