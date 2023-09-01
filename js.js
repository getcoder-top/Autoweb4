// const value = value for database 
const card = document.getElementById("Jobcard");

function addjob(){
    let li = document.createElement("li")
    li.innerHTML = value.value;
    card.appendChild(li);
}

$document.ready(function(){
    Load_data()
    
    function Load_data(){
        $.ajax({
            url:"https://localhost:3000/index/action",
            method:"POST",
            data:{action:'fetch'},
            dataType:"json",
            success:function(data){
                if(data.data.length>0){
                    for(var count=0; count<data.data.length; count++){
                        html += `
                        <div class="itemcard">
                            <div class="itemimg">
                                img
                            </div>
                            <div class="job">
                            <h1 class="title">
                                `+data.data[count].title+` 
                            </h1>
                            <p class="jobdesc">
                                `+data.data[count].description+`
                            </p>
                            </div>
                            <a href="<%= data.link %>"><button type="submit">Apply</button></a>
                        </div>
                        `;
                    }
                }
                $('#index tbody').html
            }
        })
    }
})