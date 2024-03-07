


//Form functionality
const form = document.getElementById('job_checker_add_to_list')
const conter_block = document.querySelector('.applied_ccounter')
const param_name = 'finnkode'

if(form){
    let saved_jobs_data = []
    const data = await chrome.storage.local.get("job_checker")
    if(data.job_checker){
        saved_jobs_data = JSON.parse(data.job_checker)
    }

    conter_block.innerHTML = saved_jobs_data.length


    



    form.addEventListener('submit',  (e)=>{
        console.log('submit form');
        const formData = new FormData(form);
        const job_link = formData.get('add_job');
        const url = new URL(job_link);
        const job_id = url.searchParams.get(param_name);


        if(typeof parseInt(job_id) == "number"){
            
            if(!saved_jobs_data.includes(job_id)){
                saved_jobs_data.push(job_id)
            }
            
             

            chrome.storage.local.set({ "job_checker": JSON.stringify(saved_jobs_data) }, function(){
                //  A data saved callback omg so fancy
                console.log('your body saved');
            });
        }
        e.preventDefault()
    })
}


// Clear list
let clear_list_btn = document.querySelector('.clear_stored_list')
console.log(clear_list_btn);
if(clear_list_btn){
    console.log('delete');
    clear_list_btn.addEventListener('click', (e)=>{
        chrome.storage.local.set({ "job_checker": null }, function(){
            //  A data saved callback omg so fancy
        });
        e.preventDefault()
    })
}

