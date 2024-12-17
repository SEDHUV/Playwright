const {test,expect,request} = require('@playwright/test');
const{APIUtils} = require('./utils/APIUtils');
const payload = {userEmail: "sedhuhaema@gmail.com", userPassword: "nine"}
const orderpayload = {orders: [{country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}

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
await page.locator("[routerlink*='/dashboard/myorders']").last().click()
 await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderIdJson.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderIdJson.includes(orderIdDetails)).toBeTruthy();
 
})