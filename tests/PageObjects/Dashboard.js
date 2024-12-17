class Dashboard{
constructor(page){
     this.Products = page.locator(".card-body ")
      this.cartBtn = page.locator("[routerlink*='cart']")
      this.Productstext = page.locator(".card-body b")
      

}


async AddProductToCart(productName){
    // const productTitles = await this.Productstext.allTextContents()
    // console.log(productTitles)
    await this.Products.first().waitFor()
 const TotalProductCount = await this.Products.count()
 for(let i=0;i<TotalProductCount;++i){
if(await this.Products.nth(i).locator("b").textContent() === productName){
    await this.Products.nth(i).locator("text= Add To Cart").click();//finding elements based on text
    break
}}
}

async GoToCartSection(){
    await this.cartBtn.click();
}

}
module.exports={Dashboard};