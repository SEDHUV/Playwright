class CheckoutPage{

constructor(page){
    this.page = page
    this.chooseCountry = page.locator("input[placeholder*='Country']")
    this.countrySuggestion = page.locator(".ta-results")
    this.countrycount = page.locator(".list-group-item")
}


async addCountry(letterTotype, country){
    await this.chooseCountry.pressSequentially("ind")
    const dropdown = await this.countrySuggestion
    await dropdown.waitFor()
    const totalCount = await this.countrycount.count()
    console.log(totalCount)
    for(let i =0;i<totalCount;++i){
        const text = await this.countrycount.nth(i).textContent()
        console.log(text)
        if(text===country){
    await this.countrycount.nth(i).click()
    break
    
        }
    }

}





}

module.exports={CheckoutPage}