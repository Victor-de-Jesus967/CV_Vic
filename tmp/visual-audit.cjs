const { chromium } = require('playwright');
const fs = require('fs');
const { spawn } = require('child_process');
const { setTimeout: delay } = require('timers/promises');
(async () => {
 const server = spawn('python3',['-m','http.server','8765','--bind','127.0.0.1'],{stdio:'ignore'});
 await delay(1500);
 let browser, failures=[];
 try {
  browser = await chromium.launch({headless:true,args:['--no-sandbox']});
  for (const viewport of [{width:390,height:844},{width:768,height:1024},{width:1440,height:900}]) {
   const page=await browser.newPage({viewport,deviceScaleFactor:1});
   const pages=['index.html','proyectos.html','sobre-mi.html','contacto.html','proyectos/aforos-pro.html'];
   for(const path of pages){
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto('http://127.0.0.1:8765/'+path,{waitUntil:'networkidle'});
    const data=await page.evaluate(()=>({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,imgs:[...document.images].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src),title:document.title}));
    if(response.status()!==200) failures.push(path+': HTTP '+response.status());
    if(data.width>data.client+2) failures.push(path+': horizontal overflow '+data.width+'/'+data.client+' at '+viewport.width);
    if(data.imgs.length) failures.push(path+': broken images '+data.imgs.join(','));
    if(errors.length) failures.push(path+': errors '+errors.join(';'));
    fs.mkdirSync('audit/screenshots',{recursive:true});
    await page.screenshot({path:'audit/screenshots/'+path.replaceAll('/','_')+'-'+viewport.width+'.png',fullPage:true});
    console.log('CHECK '+path+' '+viewport.width+'px status='+response.status()+' overflow='+(data.width-data.client)+' brokenImages='+data.imgs.length);
   }
   await page.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto('http://127.0.0.1:8765/index.html');
  const toggle=page.locator('[data-menu-toggle]');
  await toggle.click();
  if(await toggle.getAttribute('aria-expanded')!=='true') failures.push('mobile menu did not open');
  await page.keyboard.press('Escape');
  if(await toggle.getAttribute('aria-expanded')!=='false') failures.push('mobile menu did not close via Escape');
  const playLinks=await page.locator('a[href="https://play.google.com/store/apps/details?id=dev.victordejesus.aforo"]').count();
  if(!playLinks) failures.push('Google Play link missing');
  await page.close();
  if(!fs.existsSync('assets/documents/CV-Victor-Jimenez.pdf')) failures.push('CV missing');
  console.log('Visual audit failures:',failures.length,failures);
  if(failures.length) process.exitCode=1;
 }finally{if(browser) await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});