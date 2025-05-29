const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL?token=61d51017481d936803cab076cbbfab14372b8778f13d53e2b0e91419c178f839')
        .then(response => response.json())
        .then(data => {
            const dolarToday = Number(data.USDBRL.high)
            const euroToday = Number(data.EURBRL.high)
            const libraToday = Number(data.GBPBRL.high)
            const bitcoinToday = Number(data.BTCBRL.high)

            if (currencySelect.value === "dolar") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(inputCurrencyValue / dolarToday)
            }

            if (currencySelect.value === "euro") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(inputCurrencyValue / euroToday)
            }

            if (currencySelect.value === "libra") {
                currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(inputCurrencyValue / libraToday)
            }

            if (currencySelect.value === "bitcoin") {
                currencyValueConverted.innerHTML = (inputCurrencyValue / bitcoinToday).toLocaleString("en-US", {
                    minimumFractionDigits: 8,
                    maximumFractionDigits: 8
                }) + " BTC"
            }

            currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(inputCurrencyValue)
        })
        .catch(error => console.error('Erro ao buscar cotações:', error))
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")

    if (currencySelect.value === "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"
    }

    if (currencySelect.value === "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

    if (currencySelect.value === "libra") {
        currencyName.innerHTML = "Libra Esterlina"
        currencyImage.src = "./assets/libra.png"
    }

    if (currencySelect.value === "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
