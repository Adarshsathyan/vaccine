//display the search by pin section
function searchByPinDisplay(){
    home.style.display="none";
    s_pin.style.display="block";
    s_district.style.display="none"
}
// function to display search by district section; it also calls a fetch states function
function searchByDistrictDisplay(){
    home.style.display="none";
    s_pin.style.display="none";
    s_district.style.display="block";
    fetchStates();

}

//function for find by pin
function findByPin(){
    let pin = pincode.value;
    let unformat_date=v_date.value;
    let input_date = new Date(unformat_date);
    let day = input_date.getDate();
    let month = input_date.getMonth()+1;
    let year  = input_date.getFullYear();
    let date  = `${day}-${month}-${year}`; 
    if(String(pin).length<=6){
      fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
    .then((res)=>res.json())
    .then((data)=>displayPinSessions(data))
    .catch((err)=>swal("Something went wrong","splease check entered pin is correct","error"))
    }else{
      swal("Invalid pincode format","Please check pincode","error")
    }
    
}

//calls display pin sessions from above function to display data 
function displayPinSessions(data){
    let html_data  =``;
    if(data.sessions[0]){
      for(let session of data.sessions){
        let h_name = session.name;
        let b_name = session.block_name;
        let vaccine_name = session.vaccine;
        let V_date = session.date;
        let f_type = session.fee_type;
        let fees = session.fee;
        let to_slots = session.to.substring(0,5);
        let f_slots = session.from.substring(0,5);
        let dose1 = session.available_capacity_dose1;
        let dose2 = session.available_capacity_dose2;
        let doses = session.available_capacity;
        html_data+=`
        <div class="col-md-4 p-5  mb-3  ">
          <div class="mb-5">
            <p class="fw-bold fs-5 text-center">${h_name}</p>
            <p class="text-muted text-center">${b_name} </p>        
          </div>
            <div class="row  p-3" >
              <div class="col-md-4 col-6 text-start">
                <p class="fw-bold ">${vaccine_name}</p>
                <p class="fw-bold">${V_date}</p>
                <p class="text-success fw-bold">${f_type}</p>
                <p class="fw-bold">₹${fees}/-</p>
              </div>
              <div class="col-md-8 col-6  text-end ">
                  <p class="fw_bold">${f_slots}-${to_slots}</p>
                  <p class="text-muted">Dose-1 <span class="fw-bold"> ${dose1}</span> </p>
                  <p class="text-muted">Dose-2 <span class="fw-bold"> ${dose2}</span> </p>
                  <p class="text-muted">Doses<span class="fw-bold"> ${doses}</span> </p>
              </div>
            </div>
            <div class="col-md-11">
              <button class="btn btn-grad text-white col-md-12 col-12" style="border-radius: 30px;">Book</button>
            </div>
        </div>
        `
        main_pin_sessions.style.display="block"
        pin_sessions.innerHTML=html_data;
        vac_pin_details.style.display="block";
       document.querySelector("#s_image").style.display="none";
    }
  }else{
    swal("No session available","try different date","info")
  }
    
}


//called by searchby districts function
function fetchStates(){
  fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
  .then((res)=>res.json())
  .then((data)=>displayStates(data))
  .catch((err)=>swal("Something went wrong","Try again","error"));
}

//diaplay the data from above function.
function displayStates(data){
  let options = `<option selected value="">--select state--</option>`;
  for(let state of data.states){
    options+=`
    <option value=${state.state_id}>${state.state_name}</option>
    `
  }
  s_states.innerHTML=options;
  
}

//called from onchange function of slect state tag
function fetchDistricts(){
  s_districts_div.style.display="block";
  let state_id = s_states.value;
  fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`)
  .then((res)=>res.json())
  .then((data)=>displayDistricts(data))
  .catch((err)=>swal("Something went wrong","Try again","error"));
}

//displays the ddata from above function
function displayDistricts(data){
  let options = `<option selected value="">--select districts--</option>`;
  for(let district of data.districts){
    options+=`
    <option value=${district.district_id}>${district.district_name}</option>
    `
  }
  s_districts.innerHTML=options;

}

//function to display hidden date feild and button
function showDateSearch(){
  s_date_div.style.display="block";
  s_button.style.display="block";
}

//function to fetch session by district
function displayDistrictSessions(){
  let district_id = s_districts.value;
  let unformat_date=s_date.value;
    let input_date = new Date(unformat_date);
    let day = input_date.getDate();
    let month = input_date.getMonth()+1;
    let year  = input_date.getFullYear();
    let date  = `${day}-${month}-${year}`; 

    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`)
    .then((res)=>res.json())
    .then((data)=>displayDistrictSearch(data))
    .catch((err)=>alert(err))
}

//display data to districts search
function displayDistrictSearch(data){
  let html_data  =``;
    if(data.sessions[0]){
      for(let session of data.sessions){
        let h_name = session.name;
        let b_name = session.block_name;
        let vaccine_name = session.vaccine;
        let V_date = session.date;
        let f_type = session.fee_type;
        let fees = session.fee;
        let to_slots = session.to.substring(0,5);
        let f_slots = session.from.substring(0,5);
        let dose1 = session.available_capacity_dose1;
        let dose2 = session.available_capacity_dose2;
        let doses = session.available_capacity;
        html_data+=`
        <div class="col-md-4 p-5   mb-3  ">
          <div class="mb-5">
            <p class="fw-bold fs-5 text-center">${h_name}</p>
            <p class="text-muted text-center">${b_name} </p>        
          </div>
            <div class="row  p-3" >
              <div class="col-md-4 col-6 text-start">
                <p class="fw-bold ">${vaccine_name}</p>
                <p class="fw-bold">${V_date}</p>
                <p class="text-success fw-bold">${f_type}</p>
                <p class="fw-bold">₹${fees}/-</p>
              </div>
              <div class="col-md-8 col-6  text-end ">
                  <p class="fw_bold">${f_slots}-${to_slots}</p>
                  <p class="text-muted">Dose-1 <span class="fw-bold"> ${dose1}</span> </p>
                  <p class="text-muted">Dose-2 <span class="fw-bold"> ${dose2}</span> </p>
                  <p class="text-muted">Doses<span class="fw-bold"> ${doses}</span> </p>
              </div>
            </div>
            <div class="col-md-11">
              <button class="btn btn-grad text-white col-md-12 col-12" style="border-radius: 30px;">Book</button>
            </div>
        </div>
        `
        main_dis_sessions.style.display="block"
        dis_sessions.innerHTML=html_data;
        vac_dis_details.style.display="block";
       document.querySelector("#d_image").style.display="none";
    }
  }else{
    swal("No session available","try different date","info")
  }
}


//header scroll
let header=document.querySelector('#header')
window.addEventListener('scroll',()=>{
    if(window.pageYOffset>100){
        header.classList.add('shadow');
        header.style.backgroundColor="#FFF";
    }else{
        header.classList.remove('shadow')
        header.style.backgroundColor="";
    }
})