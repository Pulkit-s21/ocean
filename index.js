const trashContainer = document.querySelector(".trash-container");
const moneyElem = document.querySelector(".money");
const currencyFormatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

const trashFormatter = new Intl.NumberFormat("en-us", {
    minimumIntegerDigits: 8,
    maximumFractionDigits: 0,
    useGrouping: false
});

const MAX_AMOUNT_RAISED = 50000000;

setupTrash();
async function setupTrash() {
    // getting the donation money value from the Team Seas site
    const amountRaised = await fetch("https://tscache.com/donation_total.json").then(res => res.json()).then(data => data.count);
    
    moneyElem.innerText = currencyFormatter.format(amountRaised);

    // using Math.max() cz we dont want the site to show negative trash once the amount raised crossed max value so we set that to 0
    const amountLeftToBeRaised = Math.max(MAX_AMOUNT_RAISED - amountRaised, 0);

    const stringifiedAmount = trashFormatter.format(amountLeftToBeRaised);
    const trashAmount = {
        xxl: {
            amount: parseInt(`${stringifiedAmount[0]}${stringifiedAmount[1]}`),
            icon: "bag",
        },
        // we dont use the `` from here on because we only use 1 digit at each place
        xl: {
            amount: parseInt(stringifiedAmount[2]),
            icon: "takeout",
        },
        lg: {
            amount: parseInt(stringifiedAmount[3]),
            icon: "headphones",
        },
        md: {
            amount: parseInt(stringifiedAmount[4]),
            icon: "phone",
        },
        sm: {
            amount: parseInt(stringifiedAmount[5]),
            icon: "toy-car",
        },
        xs: {
            amount: parseInt(stringifiedAmount[6]),
            icon: "bottle",
        },
    }
    // I need to understand this in depth
    Object.values(trashAmount).forEach(({ amount, icon }) => {
        for (let i = 0; i < amount; i++) {
            createTrash(icon);
        }
    });
}

function createTrash(icon) {
    const img = document.createElement("img");
    const top = randomNumberBetween(0, 50); // range is from 0 to 50 cz the ocean is till 50vh of the screen
    const size = top / 5 + 1;
    img.classList.add("trash");
    img.src = `/imgs/${icon}.svg`;
    img.style.width = `${size}vmin`;
    img.style.height = `${size}vmin`;
    img.style.top = `${top}vh`;
    img.style.left = `${randomNumberBetween(0,100)}vw`; // randomly select the position horizontally
    img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`)
    trashContainer.appendChild(img);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}