const {test,expect} = require('@playwright/test');

let webcontext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sedhuhaema@gmail.com")
    await page.locator("#userPassword").fill("nine")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
 webcontext = await browser.newContext({storageState:'state.json'});
})

test('webAPI1',async()=>
{
// const context =await browser.newContext();
// const page = await context.newPage();
const desiredProduct = "IPHONE 13 PRO";
const page = await webcontext.newPage();
await page.goto("https://rahulshettyacademy.com/client");
const Products = page.locator(".card-body ")
 const TotalProductCount = await Products.count()
 for(let i=0;i<TotalProductCount;++i){
if(await Products.nth(i).locator("b").textContent() === desiredProduct){
    await Products.nth(i).locator("text= Add To Cart").click();//finding elements based on text
    break
}}
await page.locator("[routerlink*='cart']").click()
await page.locator("div li").first().waitFor()
const boolean = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()//finding elements based on text and tag
expect(boolean).toBeTruthy()
await page.locator("text='Checkout'").click()
await page.locator("input[placeholder*='Country']").pressSequentially("ind")
const dropdown = await page.locator(".ta-results")
await dropdown.waitFor()
const totalCount = await page.locator(".list-group-item").count()
console.log(totalCount)
const country =" India"
for(let i =0;i<totalCount;++i){
    const text = await page.locator(".list-group-item").nth(i).textContent()
    console.log(text)
    if(text===country){
await page.locator(".list-group-item").nth(i).click()
break

    }
}
await page.locator(".text-validated[value*='92']").clear()
await page.locator(".text-validated[value*='92']").fill("23456789")
await page.locator(".ddl").first().selectOption("04")
await page.locator(".ddl").last().selectOption("15")
await expect(page.locator(".user__name label")).toHaveText("sedhuhaema@gmail.com")
await page.locator(".action__submit").click()
console.log(await page.locator("#toast-container").textContent())
 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
 const orderId = await page.locator("label.ng-star-inserted").textContent()
 const trimmed = await orderId.split(" ")[2]
 console.log(trimmed)
 await page.locator("[routerlink*='/dashboard/myorders']").last().click()
 await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (trimmed===rowOrderId) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(trimmed===orderIdDetails).toBeTruthy();
 
})