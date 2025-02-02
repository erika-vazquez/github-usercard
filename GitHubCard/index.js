/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector('.cards')
const user = 'erika-vazquez'
axios.get(`https://api.github.com/users/${user}`)
.then(res => {
  // 1. (see above)
  // Handles Success: here's where we get the results from server
  const card = createGithubCard(res.data)
  cards.append(card)
  console.log(res.data)
})
.catch(error => {
  // Handles failure:
  console.log('The API is currently down, try again later', error)
})


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
//
axios.get(`https://api.github.com/users/${user}/followers`)
.then(res => res.data)
.then(followers => {
  // Handles Success: here's where we get the results from server
  followers.forEach(follower =>{
    axios.get(`https://api.github.com/users/${follower.login}`)
    .then(res => {
      const card = createGithubCard(res.data)
      cards.append(card)
    })
  })
})
.catch(error => {
  // Handles failure:
  console.log('The API is currently down, try again later', error)
})

//const followersArray = []; 

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
//function that accepts a single object as its only argument
function createGithubCard(obj) {
  // create the elements
  const card = document.createElement('div')
  const img = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const userName = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const anchor = document.createElement('p')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  // set the styles
card.classList.add('card')
cardInfo.classList.add('card-info')
name.classList.add('name')
userName.classList.add('username')
  
  // set the content
  img.src = obj.avatar_url
  name.textContent = obj.name
  userName.textContent = obj.login
  location.textContent = `Location: ${obj.location}`
  profile.textContent = `Profile: `
  anchor.href = obj.html_url
  anchor.textContent = obj.html_url
  followers.textContent = `Followers: ${obj.followers}`
  following.textContent = `Following: ${obj.following}`
  bio.textContent = `Bio: ${obj.bio}`
  
  // put together -html structure
  card.appendChild(img)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  profile.appendChild(anchor)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  
  return card
}







/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
