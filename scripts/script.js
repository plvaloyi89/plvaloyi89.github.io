// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLs69YbqXC6Zi99LBB1Qf2bm0LqqKBSg4",
  authDomain: "myown-73cb5.firebaseapp.com",
  databaseURL: "https://myown-73cb5.firebaseio.com",
  projectId: "myown-73cb5",
  storageBucket: "myown-73cb5.appspot.com",
  messagingSenderId: "369058026093",
  appId: "1:369058026093:web:4fdc32474576b91c49e564"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
  const fire = firebase.firestore();


function projectlist(){

    const projectList=[]
   

    var list = fire.collection("portfolio");
    list.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        projectList.push({projName: doc.data().name,
                          images: doc.data().image,
                          description: doc.data().description})      
       });

       
       projectList.forEach((item,index) =>{
           document.getElementById("proj").innerHTML += 
         `  
         <div class="col" >
            <div class="card" style="width: 14rem;" >
            <img src="${item.images}}" class="card-img-top" id="card_image">
            <div class="card-body">
            <h5 class="card-title" id="card_title">${item.projName}</h5>
            <a href="details.html?key=${item.projName}" class="btn btn-primary">More Details</a>
            </div>
            </div> 
            <br />
        </div>
          `
       })
      
    })

     
      
}

function getProjectID(){

  const urlParams = new URLSearchParams(window.location.search);
  const projId = urlParams.get('key');
  const details = new Map();
  const imageslist=[]

  
  var project = fire.collection("portfolio").doc(projId);
  var projectImage = fire.collection("portfolio").doc(projId).collection("images");
  
  project.get().then((doc) => {
    if (doc.exists) {
        //console.log("Document data:", doc.data());
        details.set('name',doc.data().name)
        details.set('industry',doc.data().industry)
        details.set('link',doc.data().link)
        details.set('description',doc.data().description)
        details.set('overview',doc.data().overview)
        details.set('tech',doc.data().tech)
        details.set('challenge',doc.data().challenge)
        details.set('solution',doc.data().solution)
       
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    
    document.getElementById("project_title").innerHTML = details.get('name')
    document.getElementById("project_industry").innerHTML = details.get('industry')
    document.getElementById("project_link_title").innerHTML = "Link"
    document.getElementById("project_link").innerHTML = details.get('name')
    document.getElementById("project_link").href = details.get('link')
    document.getElementById("project_intro").innerHTML = details.get('description')
    document.getElementById("project_overview").innerHTML = "Overview"
    document.getElementById("project_details_overview").innerHTML = details.get('overview')
    document.getElementById("details_technologies_used").innerHTML = "Technology Used"
    document.getElementById("details_technologies_used_text").innerHTML = details.get('tech')
   
    if(details.get('challenge')!== ""){
      document.getElementById("details_challenges").innerHTML = "Challenges"
      document.getElementById("details_challenges_text").innerHTML = details.get('challenge')
    }
    if(details.get('solution')!== ""){
      document.getElementById("details_challenges").innerHTML = "Solution"
      document.getElementById("details_challenges_text").innerHTML = details.get('solution')
    }

}).catch((error) => {
    console.log("Error getting document:", error);
});




projectImage.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
   imageslist.push(doc.data().image)
});
document.getElementById("caro1").src = imageslist[0]
document.getElementById("caro2").src = imageslist[1]
document.getElementById("caro3").src = imageslist[2]
document.getElementById("caro4").src = imageslist[3]

})
.catch((error) => {
console.log("Error getting documents: ", error);
});




}


function sendEmail(){

var cname= document.getElementById("Cname").value
var cemail= document.getElementById("Cemail").value
var subject = document.querySelector("#Csubject")
var output = subject.value
var body= document.getElementById("Cbody").value

window.open(`mailto:plvaloyi@gmail.com?subject=${output}&body=${cname},%0D%0A%0D%0A${cemail},%0D%0A%0D%0A${body}`);


}




  
