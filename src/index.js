let addToy = false;

document.addEventListener("DOMContentLoaded", async () => {
  await fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.querySelector('.add-toy-form').addEventListener('submit', e => {
    e.preventDefault();
    createToy({name: e.target.name.value, image: e.target.image.value, likes: 0})
  });
});

async function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => { 
    json.forEach(toy =>  { 
      createToy(toy)
    });
  });
}


function likeBtnClicked(e) {
  console.log(e.target.querySelector('p').split(' ')[0])
}

function createToy(toy) {
  let toyCol = document.querySelector('#toy-collection');
    let toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyCard.innerHTML += `<h2>${toy.name}`
    toyCard.innerHTML += `<img src="${toy.image}" class="toy-avatar" />`
    toyCard.innerHTML += `<p>${toy.likes} Likes </p>`

    let likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn';
    likeBtn.textContent = 'Like <3';
    likeBtn.addEventListener('click', e => {
      let likesCount = e.target.parentNode.querySelector('p');
      likesCount.textContent = `${parseInt(likesCount.textContent.split(' ')[0]) + 1} Likes`;
    })
    toyCard.appendChild(likeBtn);

    toyCol.appendChild(toyCard);
}