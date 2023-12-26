var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var submitBtn = document.querySelector("#submitBtn");
var clicktBtn = document.querySelector("#clicktBtn");
var dialogoverlay = document.querySelector("#dialogoverlay");
var dialogbox = document.querySelector("#dialogbox");
var closebtn = document.querySelector("#closebtn");
var arrayLinks = [];


// to work on all browsers
if (localStorage.getItem("arrOfLinks") != null) {
  arrayLinks = JSON.parse(localStorage.getItem("arrOfLinks"));
  showData(arrayLinks);
}

// to add new row
function addToArray() {
  if(nameValidation() && urlValidation()){
    var website = {
      name: siteName.value,
      url: siteUrl.value,
    };
    arrayLinks.push(website);
    localStorage.setItem("arrOfLinks", JSON.stringify(arrayLinks));
    showData();
    clearData();
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');
  }
  else{
    dialogoverlay.classList.replace('d-none','d-block');
    dialogbox.classList.replace('d-none','d-block');

  };
}
// fire addToArray
submitBtn.addEventListener("click", addToArray);

// to hide alert message
dialogoverlay.addEventListener('click',function(){
  dialogoverlay.classList.replace('d-block','d-none');
  dialogbox.classList.replace('d-block','d-none');
})

// to hide alert message
closebtn.addEventListener('click',function(){
  dialogoverlay.classList.replace('d-block','d-none');
  dialogbox.classList.replace('d-block','d-none');
})


// show data from array to html
function showData() {
  var tBody = document.querySelector("#tBody");
  var container = "";
  for (var i = 0; i < arrayLinks.length; i++) {
    // container += `
    //     <tr id="${i}">
    //         <td scope="row">${i + 1}</td>
    //         <td>${arrayLinks[i].name}</td>
    //         <td><a href="${
    //           arrayLinks[i].url
    //         }" target="_blank" class="btn btn-outline-success"><i class="icon-eye"></i> Visit</a></td>
    //         <td><button onclick="deleteRow(${i})" class="deleteBtn btn btn-outline-danger"><i class="icon-trash-o"></i> Delete</button></td>
    //      </tr>
    //     `;

        container += `
        <tr>
            <td scope="row">${i + 1}</td>
            <td>${arrayLinks[i].name}</td>
            <td><a href="${
              arrayLinks[i].url
            }" target="_blank" class="btn btn-outline-success"><i class="icon-eye"></i> Visit</a></td>
            <td><button id="${i}" class="deleteBtn btn btn-outline-danger"><i class="icon-trash-o"></i> Delete</button></td>
         </tr>
        `;
  }
  tBody.innerHTML = container;

  var deleteBtn = document.querySelectorAll(".deleteBtn");
  for (var i = 0; i < arrayLinks.length; i++) {
    deleteBtn[i].addEventListener("click", function (eventInfo) {
      var btnTarget = eventInfo.target;
      var index = btnTarget.getAttribute("id");
      deleteFromTable(index);
      showData();
    });
  };
};

// clear form after addtion
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
};

//to delete from table
// function deleteRow(x){
//     arrayLinks.splice(x,1);
//     localStorage.setItem('arrOfLinks',JSON.stringify(arrayLinks))
//     showData();
// }

function deleteFromTable(index) {
  arrayLinks.splice(index, 1);
  localStorage.setItem("arrOfLinks", JSON.stringify(arrayLinks));
  showData();
};

// validate website name
function nameValidation(){
  var regex = /[A-Z a-z]{3}$/ ;
  var flagName = regex.test(siteName.value);

  if(flagName){
    siteName.classList.replace('is-invalid','is-valid');
  }
  else{
    siteName.classList.add('is-invalid');
  }
  return flagName;
};
//fire nameValidation
siteName.addEventListener("keyup",nameValidation);

// validate website url
function urlValidation(){
  var regexp =/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\//;
  var flagUrl = regexp.test(siteUrl.value);


  if(flagUrl){
    siteUrl.classList.replace('is-invalid','is-valid');
  }
  else{
    siteUrl.classList.add('is-invalid');
  };
  return flagUrl;
};
// fire urlValidation
siteUrl.addEventListener("keyup",urlValidation);