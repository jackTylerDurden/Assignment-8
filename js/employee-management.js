/*eslint-env browser*/
var empInfo = [["Jon Doe", "Module Lead", "12345"], ["Brad Pitt", "Software Engineer" , "22345"], ["Steve Carell", "Senior Software Engineer", "42345"], ["Ben Affleck", "Team Lead", "62345"], ["Emma Stone", "Project Manager", "92345"]];

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
var updateEmployeeTable = function () {
    "use strict";
    var i,j;
    var empTable = window.document.querySelector("#employeeListTable tbody");
    empTable.innerHTML="";
    var empCount = empInfo.length;
    var empCountText = window.document.createTextNode("Showing " + empCount + " employees");
    var empInfoDiv = $("empInfo");
    empInfoDiv.innerHTML="";
    empInfoDiv.appendChild(empCountText);
    for (i = 0; i < empInfo.length; i += 1) {
        var row = window.document.createElement("tr");
        var emp = empInfo[i];        
        for (j = 0; j < emp.length; j += 1) {
            var col = window.document.createElement("td");
            var info = window.document.createTextNode(emp[j]);
            col.appendChild(info);
            row.appendChild(col);
        }
        var delButton = window.document.createElement("button");
        var delButtonText = window.document.createTextNode("Delete");
        delButton.appendChild(delButtonText);
        delButton.id = "empToDelete_" + i;
        delButton.className = "deleteButtonClass";
        var delButtonCol = window.document.createElement("td");
        delButtonCol.appendChild(delButton);
        row.appendChild(delButtonCol);
        empTable.appendChild(row);  
        bindDeleteEvents();      
    }
};

var bindDeleteEvents = function(){    
    window.document.querySelectorAll(".deleteButtonClass").forEach(function (button) {
        button.addEventListener("click",deleteButtonActionListner);
    });
}

var deleteButtonActionListner = function(e) {
    "use strict";     
    var empIndexToRemove = (Number)(e.target.id.split("_")[1]);
    empInfo.splice(empIndexToRemove,1);
    e.currentTarget.removeEventListener("click",deleteButtonActionListner);
    updateEmployeeTable();  
};
var bindAddButtonEvent = function () {
    $("employeeManagementForm").addEventListener("submit",function(e){        
        e.preventDefault();
        var empForm = window.document.forms[0];
        var newEmp = [];
        newEmp.push(empForm.name.value);
        newEmp.push(empForm.title.value);
        newEmp.push(empForm.extension.value);
        empInfo.push(newEmp);
        empForm.reset();
        updateEmployeeTable();        
    });
}
window.addEventListener("load", function (){
    "use strict";
    updateEmployeeTable();
    bindAddButtonEvent();

});


