const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  // append received message from the server to the DOM element 
  const chat = document.querySelector("#chat");
  chat.innerHTML += event.data + "<br>";
};

button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<p>${message.value}</p>`;
  let pubKey = forge.pki.publicKeyFromPem("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxXSpkCmmHG+S4vBIkslINJJyVvekc+kmHO8qNI3fScmYLVWrs1ZxXF0qR1id/ZCPyvd88MZWxomRyHNNEbz4dcbOZ0m6Q52FeU/Xny0ljAx0VxfVdIX2VxL4WwcNbANxrHa+xK+D2MyV8QdxTykuC1SwXan8FvEmpzvtPKP44vyf3NA2zHCfEQ7/93tEelKmt+yK8vhWIiKbKhufKJDuC3sw0KWBeFNBkfweKxZR+NKj8e2ZB/WABahUuED1k3DAOtkjNwMe6xVQVaDjPT9Y78w8Gm3tZtENS+WGCHnTl3tgSWZvgLzObZzy1/VXWyTHcGdOTUyrtI07HbRYcAn3CQIDAQAB-----END PUBLIC KEY-----");
  let encryptText = pubKey.encrypt(forge.util.encodeUtf8(data));
  console.log(encryptText); 
  // Send composed message to the server
  connection.send(encryptText);

  // clear input fields
  name.value = "";
  message.value = "";
})
