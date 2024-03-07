const adv_container = document.querySelector('#page-results .grid')
const storage_key_name = 'job_checker'

if(adv_container){


// Create a new MutationObserver 
const observer = new MutationObserver((mutations) => { 
    mutations.forEach((mutation) => { 
      //console.log(mutation.type);  // mutation.type will be "attributes", "childList", or "characterData" 
      if(mutation.type == "childList"){


        show_all_el(adv_container.querySelectorAll('article'))
      }
    }); 
  }); 
   
  // Configure the observer to watch for changes 
  const config = { attributes: true, childList: true, subtree: true }; 
  observer.observe(adv_container, config); 
   
  // Later, you can disconnect the observer when you no longer need it 
  // observer.disconnect(); 

  function show_all_el(ellist){
    ellist.forEach((el)=>{
        //console.log( el.querySelector('.link').id);
        if( el.querySelector('.link').id == 339044269){
            el.classList.add('FFF') 
        }
       
    })
  }
}



  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `new value is "${newValue}".`
      );

      if(!newValue){
        console.log('should remove all');
        adv_container.querySelectorAll('article').forEach((el)=>{
            el.classList.remove('applied_vacansion') 
        })
      }else if(key == storage_key_name ){
        adv_container.querySelectorAll('article').forEach((el)=>{
            if(newValue.includes(el.querySelector('.link').id)){
                el.classList.add('applied_vacansion') 
            }
        })
      }
    }
  });

  chrome.storage.local.get(/* String or Array */['job_checker'], function(items){
    //  items = [ { "yourBody": "myBody" } ]
    console.log('items after upload page', typeof items.job_checker);
    adv_container.querySelectorAll('article').forEach((el)=>{
        if(items.job_checker.includes(el.querySelector('.link').id)){
            el.classList.add('applied_vacansion') 
        }
    })
});