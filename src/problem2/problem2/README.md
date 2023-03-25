To start using the app install the dependencies first
```
npm install
```

Run the app
```
npm start
```

The ETH Address uses the web3.js isAddress utility method. https://www.npmjs.com/package/ethereum-address
To pass the validation check just enter a valid ethereum address.
eg. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F

Amount to send checks for a valid number and whether the amount exceeds the balance.
The balance is hard coded as **8422.30**

OTP has no validation. Just type any 6 digits in and it will pass.


