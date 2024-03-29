const timesTamp = '1711729406491'
const apiPublicKey = '38740177b8850c68684a85f12ddcb6d3';
const apiPrivateKey = 'f1c135302742bd67ef28fb17bec918d82ba62822';
const mdmHash = 'e976eb78466d9568aee6a20e98a1fde1';

const searchInput = document.querySelector('#searchInput');
const submitBtn = document.querySelector('#submit');
const target = document.querySelector('#app');



submitBtn.addEventListener('click', async () => {
  const inputValue = searchInput.value.trim();
  if (inputValue !== "") {
    // Clear the previous user information
    target.innerHTML = "";

    await fetchData(inputValue);
} else {
    alert("Please enter a hero name.")
  }
})

const fetchData = async (inputValue) => {
  try{
    const apiURL = `https://gateway.marvel.com:443/v1/public/characters?ts=${timesTamp}&apikey=${apiPublicKey}&hash=${mdmHash}&name=${inputValue}`;

    const res = await fetch(apiURL);
    const data = await res.json()
    const hero = data.data.results
    console.log(hero)
    
    hero.forEach(element => {
       let template = document.createElement("div");
       target.innerHTML = `
       <img src="${element.thumbnail["path"] +"."+ element.thumbnail["extension"]}" alt="" class="heroImage">
       <h2 class="heroName">${element.name}</h2>
       <p class="heroContent">${element.description}</p>
      `
    });
  }
  catch(error){
    console.log("Error Fetching Data : ", error)
  }
}


