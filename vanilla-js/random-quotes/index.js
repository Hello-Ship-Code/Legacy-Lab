"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://api.allorigins.win/get?url=https://zenquotes.io/api/quotes";
const quote = document.querySelector('p');
const Name = document.querySelector('h5');
const subBtn = document.getElementById('sub-btn');
let dataFetch = false;
let savedData = [];
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (dataFetch)
            return;
        try {
            const response = yield fetch(url);
            const result = yield response.json();
            const data = JSON.parse(result.contents);
            savedData.push(data);
            dataFetch = true;
            console.log("Data is fetched sucessfully");
            display();
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
function randomIndex() {
    return Math.floor(Math.random() * savedData[0].length);
}
function display() {
    if (savedData.length > 0) {
        const selectQuote = savedData[0][randomIndex()];
        if (quote && Name) {
            quote.textContent = selectQuote.q;
            Name.textContent = `- ${selectQuote.a}`;
        }
    }
    else {
        console.log("No data available yet. Please try again later.");
    }
}
window.addEventListener('load', () => getData(url));
subBtn === null || subBtn === void 0 ? void 0 : subBtn.addEventListener('click', display);
