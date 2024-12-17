const {test,expect,request} = require('@playwright/test');
const{APIUtils} = require('./utils/APIUtils');
const payload = {userEmail: "sedhuhaema@gmail.com", userPassword: "nine"}
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}
const fakepayload = {data:[],message:"No Orders"};

let requestAPI;
let response;
test.beforeAll(async()=>{
 requestAPI = await request.newContext()
 const aPIUtils = new APIUtils(requestAPI,payload)///to view api logs using debug just add test in script in package.json and do npm debug script
 response = await aPIUtils.orderId(orderpayload)

})

test('clientAppTest',async({page})=>
{
page.addInitScript(value=>{
    window.localStorage.setItem('token',value);},response.token
)
await page.setViewportSize({ width: 1280, height: 800
 });

await page.goto("https://rahulshettyacademy.com/client");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{
     const response = await page.request.fetch(route.request());
     let body= JSON.stringify(fakepayload);
     route.fulfill(
        {
             response,
             body,
        }
     )
    }
)


await page.locator("[routerlink*='/dashboard/myorders']").last().click()
//below method waits until the original response comes from api call, without this sometimes you get error
//sometimes when the moment playwright sees request which mentioned above playwright try to give fake response to browser and then comes original response so conflict happens
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent())
 
})

//network intercept flow= request call->api response->playwright gets response and edit and gives fake response to browser