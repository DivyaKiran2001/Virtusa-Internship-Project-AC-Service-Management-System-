const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.click('#signupLink');
      await page.waitForNavigation();
      await page.type('#admin/user', 'user');
      await page.type('#email', 'test@gmail.com');
      await page.type('#username', 'testuser');
      await page.type('#mobileNumber', '9876543210');
      await page.type('#password', 'Test@123');
      await page.type('#confirmPassword', 'Test@123');
      await page.click('#submitButton');
      await page.waitForNavigation();
      await page.waitForSelector('#loginButton',{timeout:3000});
      console.log('TESTCASE:FE_Signup:success');
    }
     catch(e){
      console.log('TESTCASE:FE_Signup:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.type('#email', 'test@gmail.com');
      await page.type('#password', 'Test@123');
      await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#homeButton',{timeout:3000});
      console.log('TESTCASE:FE_Login:success');
    }
     catch(e){
      console.log('TESTCASE:FE_Login:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
    await page.type('#email', 'test@gmail.com');
    await page.type('#password', 'Test@123');
    await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#homeButton',{timeout:3000});
      await page.click('#homeButton');
      await page.waitForSelector('#grid1',{timeout:3000});
      await page.click('#dashBoardButton');
      await page.waitForSelector('#grid1',{timeout:3000});
      console.log('TESTCASE:FE_UserHomeOperation:success');
    }
     catch(e){
      console.log('TESTCASE:FE_UserHomeOperation:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
  await page.type('#email', 'test@gmail.com');
  await page.type('#password', 'Test@123');
  await page.click('#loginButton');
    await page.waitForNavigation();
    await page.click('#myBookingButton');
    await page.waitForSelector('#centerName1',{timeout:3000});
    await page.click('#logoutButton');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_UserBookingOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_UserBookingOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#adminAddCenter',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_AdminAddCenterOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_AdminAddCenterOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-edbedcefdafadfffbabacbdeefceabbedabdfbab.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.click('#adminCenterProfile');
    await page.waitForSelector('#adminProfileView',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_AdminProfileViewOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_AdminProfileViewOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();