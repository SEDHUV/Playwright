const {test,expect} =require('@playwright/test')

test('locators',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love Ice").click()
    await page.getByPlaceholder("Password").fill("haemavanitha")//if u want to write something by using label
    //then make sure edit field wrapped within label in html
    await page.getByRole('button',{name:"submit"}).click()
    console.log(await page.getByText("The Form has been submitte").textContent())
    await page.getByRole('link',{name:"Shop"}).click()
    await page.locator("app-card").filter({hasText:'iphon'}).getByRole('button').click()





})