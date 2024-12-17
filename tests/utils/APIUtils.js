class APIUtils{

    constructor(requestAPI,payload){
        this.requestAPI = requestAPI;
        this.payload = payload;
    }

async GetToken(){

    const loginResponse = await this.requestAPI.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:this.payload})
        const loginresponseJson = await loginResponse.json();
         const token =loginresponseJson.token
        console.log(token)
        return token;
}

async orderId(orderpayload){

    let response= {};
    response.token = await this.GetToken();

    const responseOrder =  await this.requestAPI.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {data:orderpayload,
            headers:{'authorization':response.token,
                'content-type':'application/json'

            },
        }
    )
    const orderJson = await responseOrder.json()
    console.log(orderJson)
    const orderIdJson = orderJson.orders[0];
    response.orderIdJson = orderIdJson;
    return response;
}



}
module.exports={APIUtils};