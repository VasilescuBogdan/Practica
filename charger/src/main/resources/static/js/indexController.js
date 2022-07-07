function createElementFromAttribute(attribute, parent) {
    const openCell = document.createElement("td");
    openCell.innerHTML = `<p> ${attribute}</p>`;
    parent.appendChild(openCell);
}

function createButtons(parent, data) {
    const buttonsTd = document.createElement("td");
    buttonsTd.innerHTML = `<button type="button" class="btn btn-primary btn-big" onclick=showDialog(${data.id}) data-bs-toggle="modal" data-bs-target="#staticBackdrop">Book now!</button>`;
    parent.appendChild(buttonsTd);
}

function showDialog(id){
    console.log(id);
    $("#inputId").val(id);
    var myModalEl = document.getElementById('staticBackdrop');
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();
}

const baseURL = 'http://localhost:8090';
$(document).ready(async function() {
        const responseJson = await fetch(
            baseURL + `/api/stations`,
            {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
            });
    
    const response = await responseJson.json();
    if (responseJson.ok) {
        console.log(response);
        const table = $("#stations-table tbody");
        for (const station of response) {
            const newStationTr = document.createElement("tr");
            createElementFromAttribute(station.id, newStationTr);
            createElementFromAttribute(station.name, newStationTr);
            createElementFromAttribute(station.location.address, newStationTr);
            createElementFromAttribute(station.isOpen, newStationTr);
            createElementFromAttribute(station.stationType.name, newStationTr);
            createElementFromAttribute(station.stationType.plugType, newStationTr);
            createButtons(newStationTr, station);
            table.append(newStationTr);
        }
    } else {
        console.log("Errror ");
    }
})

function addBooking(){    
     
    const data = {
       startDateTime: $('#inputStartTime').val(),
       duration: $('#inputDuration').val(),
       licenceCar: $('#inputLicence').val(),
       stationId: $('#inputId').val()
    };


    const responseJson = fetch(
        baseURL + '/api/bookings',
        {
            method: 'POST',
            headders: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        });
    
    console.log(responseJson);
}

