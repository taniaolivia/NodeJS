const axios = require("axios");

const baseUrl = "https://loripsum.net/api";

exports.getRandomText = () => {
    return Promise((resolve, reject) => {
        axios.get(baseUrl + "/plaintext", {responseType: "text"})
        .then((response) => {
            resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(false);
        })
    })
}
