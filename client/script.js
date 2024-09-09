async function postdata(event){
    window.location.href = `viewproduct.html`
    event.preventDefault();

    let name = document.getElementById('name').value ; 
    console.log("name : ",name)
    let image = document.getElementById('image').value ;
    let price = document.getElementById('price').value ; 
    let category = document.getElementById('category').value ; 
    let use = document.getElementById('use').value ; 
    let description = document.getElementById('description').value ;
    
    let datas = {
        name,
        image,
        price,
        category,
        use,
        description,
    }

    let json_data = JSON.stringify(datas)
    console.log("json_data : ", json_data);

    let response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_data,
    });
    console.log("response : ", response);

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response)

    if (parsed_response) {
        alert(parsed_response);
        return;
    } else {
        alert("something went wrong");
    }

}

async function fetchdata(){
    
    try {
        let response = await fetch('/submit');
        console.log("response : ", response);

        let display = await response.json();
        console.log("display : ", display);

        let viewdiv = document.getElementById('viewdiv');

        let rows = ''

        for (i = 0; i < display.length; i++) {
            let id = display[i]._id;
            // let ids = display[i]._id;

            rows = rows + `
         <div class="container  d-flex-row lh-lg border border-danger pb-3 pt-3 ">
           <div id = "imageid" class ="pe-3" ><img  src ="${display[i].image} "class = "datacontainerimg"></div>
            <div id = "titleid" class ="pe-3 fs-5 fw-bold namediv">${display[i].category}</div>
             
           </div>
        `
        }

        viewdiv.innerHTML = rows;
    } catch (error) {
        console.log("error : ", error)
    }
}