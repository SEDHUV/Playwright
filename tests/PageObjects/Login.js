class Login {

    constructor(page){
        this.page = page;
        this.username = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.signBtn = page.locator("#login")

    }

async GoTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validlogin(username, password){
    await this.username.fill(username)
    await this.password.fill(password)
    await this.signBtn.click()
    await this.page.waitForLoadState('networkidle');
}
}
module.exports={Login};