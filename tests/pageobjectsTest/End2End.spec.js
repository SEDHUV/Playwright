const {test,expect} = require('@playwright/test');
const{POManager} =require('../PageObjects/POManager')
const{customTest} = require('../utils/testdata')
const dataset = JSON.parse(JSON.stringify(require('../utils/TestdataPlaceorder.json')))

for(const data of dataset){
test(`clientAppTest for ${data.productname}`,async({page})=>
{
// const context =await browser.newContext();
// const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800
 });
const POmanager =new POManager(page)
const Loginpage = POmanager.getLoginpage()
const DashBoard = POmanager.getDashboardPage()
const cartPage = POmanager.getCartPage()
await Loginpage.GoTo();
await Loginpage.validlogin(data.username,data.password)
await DashBoard.AddProductToCart(data.productname)
await DashBoard.GoToCartSection()
const boolean = await cartPage.AddedItemVisibilityCheck(data.productname)
expect(boolean).toBeTruthy()
await cartPage.GoToCheckout()
const country =" India"
const Checkout = POmanager.getCheckoutPage()
await Checkout.addCountry('ind',country)
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
}

customTest.only(`clientAppTest`,async({page,testdata})=>
    {
    // const context =await browser.newContext();
    // const page = await context.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(testdata.username)
    await page.locator("#userPassword").fill(testdata.password)
    await page.locator("#login").click()
    //await page.waitForLoadState('networkidle') // alltextcontents method don't have wait mechanism so need to tell
    await page.locator(".card-body b").first().waitFor()//method 2 for wait mechanism wait for mechnaism work only with one element so mentioned first no other reason
    const alltext =await page.locator(".card-body b").allTextContents()
    console.log(alltext)
    
    
    
    }
    )




