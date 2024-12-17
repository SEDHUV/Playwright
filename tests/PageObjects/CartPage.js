class CartPage{
    
constructor(page){
    this.page = page
    this.cartItems = page.locator("div li")
    this.NavigateToCheckout = page.locator("text='Checkout'")
}

async AddedItemVisibilityCheck(productName){
    this.cartItems.first().waitFor()
    const boolean = await this.page.locator("h3:has-text('"+productName+"')").isVisible()//finding elements based on text and tag
    return boolean
}


 async GoToCheckout(){
    await this.NavigateToCheckout.click()
 }

    
}
module.exports={CartPage}