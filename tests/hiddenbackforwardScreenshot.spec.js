const{test,expect}= require('@playwright/test')

test('morevalidations',async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
await page.goto("https://www.youtube.com/watch?v=UkYbuiKEWak")
await page.goBack()

await expect(page.locator("#displayed-text")).toBeVisible()
await page.locator("#hide-textbox").click()
await expect(page.locator("#displayed-text")).toBeHidden()
page.on('dialog',dialog=>dialog.accept())
await page.locator("#confirmbtn").click()

await page.locator("#mousehover").hover()
const frame = page.frameLocator("#courses-iframe")
await frame.locator("li a[href*='lifetime-access']:visible").click()
console.log(await frame.locator("//p[contains(text(),'Get')]").textContent())


})

test('morevalidations1',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#displayed-text").screenshot({path:'screenshot.png'})
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    
    
    
    })

    test.only('Screenshot check',async({page})=>{
        await page.goto("https://www.google.com/")
        await expect(await page.screenshot()).toMatchSnapshot('landing.win-32.png')
         })
    