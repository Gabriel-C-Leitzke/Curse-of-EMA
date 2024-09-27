function login(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Verifica se o usuário e a senha estão corretos (no exemplo, são "admin" e "admin")
    if (email && password === "admin") {
      window.location = "../index.html"; // Redireciona para a página inicial
    } else {
      alert("Saia daqui seu colocador de Usuário e senha errado!");
    }
  }
  
  function criarconta() {
    window.location = "./criarconta.html"
}