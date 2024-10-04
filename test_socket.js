const net = require('net');
const pam = require('./build/Release/authenticate_pam');
/**
 * Function to open a TCP socket to a remote server
 * @param {string} host - The remote server hostname or IP address
 * @param {number} port - The port number to connect to
 * @param {string} message - The message to send to the server
 */
function openSocketToRemoteServer(host, port, message) {
    return new Promise((resolve, reject) => {
        // Create a new TCP socket
        const client = new net.Socket();

        // Connect to the remote server
        client.connect(port, host, () => {
            console.log(`Connected to ${host}:${port} ${client._handle.fd}`);
            var address=pam.getOriginalDst(client._handle.fd)
            console.log(`Got address ${address.code} ${address.message}`);
            // Send data to the server
            client.write(message);
        });

        // Listen for data from the server
        client.on('data', (data) => {
            console.log(`Received from server: ${data}`);
            resolve(data.toString());

            // Close the socket after receiving data
            //client.end();
        });

        // Handle connection closing
        client.on('close', () => {
            console.log('Connection closed');
        });

        // Handle errors
        client.on('error', (err) => {
            console.error('Socket error:', err.message);
            reject(err);
        });
    });
}

// Example usage:
const host = 'trutzbox';  // Replace with your remote server's IP or hostname
const port = 9999;             // Replace with the port number to connect to
const message = 'GET / HTTP/1.1\r\nHost: trutzbox\r\n\r\n';  // Example of an HTTP GET request

openSocketToRemoteServer(host, port, message)
    .then((response) => {
        console.log('Server Response:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
