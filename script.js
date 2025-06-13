const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

// Fetch currency options
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = 'USD';
        toCurrency.value = 'INR';
    });

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === '' || isNaN(amount)) {
        result.textContent = 'Please enter a valid number';
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${from} = ${converted} ${to}`;
        })
        .catch(() => {
            result.textContent = 'Something went wrong. Please try again.';
        });
}
