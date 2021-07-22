
const amazon1 = require('./amazonmodule');
(async()=>{
    
    await amazon1.initialize();
    let details = await amazon1.getProductDetails('https://www.amazon.in/Test-Exclusive_2020_1140-Multi-3GB-Storage/dp/B089MT36T8')
    
    debugger;
})();