const {test,expect} = require('@playwright/test');

test('First playwright test',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("select.form-control").selectOption("consult");
    //await page.pause();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.pause()
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    await page.pause()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    await expect(page.locator(".blinkingText")).toHaveAttribute("class","blinkingText")
})
    test.only('child window handle',async({browser})=>{
        const context =await browser.newContext();
     const page = await context.newPage();
     await page.goto("https://rahulshettyacadem.com/loginpagePractise/");
    const [newpage] = await Promise.all( //need to do both conditions in similar time
    [
        context.waitForEvent('page'),
        page.locator(".blinkingText").click()
    ] )
  const text = await newpage.locator(".red").textContent()
  console.log(text)
  const domain = text.split("@")[1].split(" ")[0]
  console.log(domain)
  await page.locator("#username").fill(domain)
  await page.pause()
    



})