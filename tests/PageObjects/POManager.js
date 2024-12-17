const{Login} = require('../PageObjects/Login')
const {Dashboard} =require('../PageObjects/Dashboard')
const {CartPage} =require('../PageObjects/CartPage')
const {CheckoutPage} =require('../PageObjects/CheckoutPage')


class POManager{
constructor(page){
this.page = page
this.LoginPage = new Login(this.page)
this.DashboardPage = new Dashboard(this.page)
this.CartPage = new CartPage(this.page)
this.checkout = new CheckoutPage(this.page)
}

 getLoginpage(){
return this.LoginPage;

}

 getDashboardPage(){
    return this.DashboardPage
}

 getCartPage(){
    return this.CartPage
}

getCheckoutPage(){
    return this.checkout
}

}

module.exports={POManager}