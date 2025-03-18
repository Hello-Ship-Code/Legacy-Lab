const url = "https://api.allorigins.win/get?url=https://zenquotes.io/api/quotes";

const quote = document.querySelector('p') as HTMLParagraphElement | null;
const Name = document.querySelector('h5') as HTMLHeadingElement | null;
const subBtn = document.getElementById('sub-btn') as HTMLButtonElement | null;

type quotes = {
    a: string,
    q: string
}


let dataFetch = false;
let savedData: quotes[][] = [];


async function getData(url: string) {
    if(dataFetch) return
    try {
        const response = await fetch(url);
        const result = await response.json();
        const data: quotes[] = JSON.parse(result.contents); 
        savedData.push(data);
        dataFetch = true;
        console.log("Data is fetched sucessfully");
        display();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function randomIndex(): number{
    return Math.floor(Math.random() * savedData[0].length);
}

function display(): void{
        if(savedData.length > 0){
        const selectQuote = savedData[0][randomIndex()];
            if( quote && Name){
                quote.textContent = selectQuote.q;
                Name.textContent = `- ${selectQuote.a}`
                } 
            }
        else {
            console.log("No data available yet. Please try again later.");
        }
}

window.addEventListener('load',() => getData(url));
subBtn?.addEventListener('click', display);



