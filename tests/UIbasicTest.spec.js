const {test,expect} = require('@playwright/test');

test('First playwright test',async({page})=>
{
// const context =await browser.newContext();
// const page = await context.newPage();
const username = page.locator("#username");
const password = page.locator("#password");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const title = await page.title();
console.log(title);
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
await username.fill("rahulshettyacadmy");
await password.fill("learning");
await page.locator("#signInBtn").click();
await expect(page).toHaveURL("https://rahulshettyacademy.com/loginpagePractise/");
const errormsg = await page.locator("[style*='block']").textContent();
await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
await console.log(errormsg);
await username.fill("");
await username.fill("rahulshettyacademy");
await page.locator("#signInBtn").click();
console.log(await page.locator(".card-title a").nth(2).textContent());
console.log(await page.locator(".card-title a").allTextContents());
await page.close();


}
);
