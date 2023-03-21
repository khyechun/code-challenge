import XMLHttpRequest from 'xhr2'

class Datasource {
  constructor(url) {
    this.url = url
    this.request = new XMLHttpRequest()
  }

  getPrices() {
    return new Promise((resolve) => {
      this.request.open('GET', this.url)
      this.request.onreadystatechange = () => {
        if (this.request.readyState == 4 && this.request.status == 200) {
          const responseObj = JSON.parse(this.request.response)
          resolve(responseObj.data.prices.map((item) =>
            ({ ...item, mid: () => (item.buy + item.sell) / 2 / 100, quote: () => item.pair.slice(-3) })
          ))
        }
      }

      this.request.send()
    })
  }
}

const ds = new Datasource('https://interview.switcheo.com/test.json')
ds.getPrices().then(prices => {
  prices.forEach(price => {
    console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
  });
}).catch(error => {
  console.log(error);
});