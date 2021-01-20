const PizzasE = require('../entities/PizzasE')


const baseURL = "/clientApi"

async function getPizzaInfos() {
    const response = await fetch(baseURL + "/getPizzaInfos")
    const pizzasJson = await response.json()
    if (response.ok) {
        // return pizzasJson.map((p)=> new PizzasE( p.pid, p.size, p.price, p.numbers, p.maxnum, p.available))
        return pizzasJson
    } else {
        throw('response err, at function getPizzaInfo in clientApi file')
    }
}

const ClientApi ={
    getPizzaInfos

}

export default ClientApi