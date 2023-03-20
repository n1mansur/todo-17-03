const fs = require('fs')
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())



app.get("/foods", (request, response) =>{
    
    const body = request.body
    let foods = fs.readFileSync('foods.json', "utf8")
    foods = JSON.parse(foods)



    response.send(foods)
})


app.post("/order",(request,response )  =>{
    const req_body = request.body
    let orders = fs.readFileSync('orders.json', 'utf8')
    orders = JSON.parse(orders)
    let new_id = 1
    if(orders.length > 0){
        new_id = orders[orders.length - 1].id + 1
    }

    let new_order = {
        id: new_id,
        foods: req_body.food_array,
        status: "new"
    }
    orders.push(new_order)

    fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2), 'utf8')
    

    response.send(String(new_id))
} )


app.listen(4005, ()=>{console.log("Ishladi...")})