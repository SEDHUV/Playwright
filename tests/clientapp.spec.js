const {test,expect} = require('@playwright/test');


test.only('clientAppTest',async({page})=>
{
// const context =await browser.newContext();
// const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("sedhuhaema@gmail.com")
await page.locator("#userPassword").fill("nine")
await page.locator("#login").click()
//await page.waitForLoadState('networkidle') // alltextcontents method don't have wait mechanism so need to tell
await page.locator(".card-body b").first().waitFor()//method 2 for wait mechanism wait for mechnaism work only with one element so mentioned first no other reason
const alltext =await page.locator(".card-body b").allTextContents()
console.log(alltext)



}
);
