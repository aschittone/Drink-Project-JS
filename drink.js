function drinkByIndgredient(ingredient) {
  if (Drink.all().length < 1) {
    fetch(`http://addb.absolutdrinks.com/drinks/?pageSize=4000&apiKey=fddc7b8e73204e4ea3539d960ce7cb0f`)
    .then(res => res.json()).then(json => saveDrinks(json, ingredient))
  } else {
    filterByIngredient(ingredient)
  }
}

function filterByIngredient(ingredient){
  let filterList = Drink.all().filter(drink => ingredientFilter(drink, ingredient))
  Drink.showDrink(filterList)
}

function ingredientFilter(drink, ingredient){
  return (drink.ingredients.filter(eachIngredient => eachIngredient.toLowerCase().includes(ingredient.toLowerCase()))).length > 0
}

function saveDrinks(drinkList, ingredient) {
  drinkList.result.map(drink => {
      new Drink( drink.name, drink.videos[0].video, drink.descriptionPlain, setIngredients(drink.ingredients))
    })
  Drink.setImage()
  filterByIngredient(ingredient)
}

function setIngredients(ingredients) {
  return ingredients.map(ingredient => ingredient.textPlain)
}

function renderIngredient(ingredient) {
  return `
  <li>${ingredient}</li>
  `
}

function renderAll(ingredients) {
  let ingredientsHTML = ingredients.map(ingredient => renderIngredient(ingredient)).join('')
  return `
  <ul>
  ${ingredientsHTML}
  </ul>
  `
}

function setVideo(id){
  let drink = Drink.all().find(drink => drink.id == id)
  debugger
  $('#video-container')[0].innerHTML = `
    <iframe width="100%" height="1000%" src="https://www.youtube.com/embed/${drink.video}" frameborder="0" allowfullscreen></iframe>
    <div>
      <h3>Description: </h3>
      <p>${drink.description}</p>
    </div>
    <div>
      <h3>Ingredients: </h3>
      ${renderAll(drink.ingredients)}
    </div>
  `
}

const Drink = (function create() {

  const all = []
  let id = 0

  return class Drink {
    constructor(name, video, description, ingredients) {
      this.id = id++
      this.name = name
      this.video = video
      this.description = description
      this.ingredients = ingredients
      all.push(this)
    }

    static all() {
      return all.slice()
    }

     render() {
      return `
      <div class="drink-container">
        <div class="drink-frame" style="float:left;">
          <h3 class="center-text">${this.name}</h3>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img style="width:96px" id="myBtn" data-id="${this.id}" src="${this.image}">
            </div>
          </div>
        </div>
      </div>`
    }

// str.replace(/a/g, 'x')

    static setImage() {
      Drink.all().map(drink => {
        let drinkName = drink.name.replace(/ /   '/g, "-")
        drink.image = `http://assets.absolutdrinks.com/drinks/${drinkName}.png`
      })
    }


    static showDrink(filterList) {
      const drinkHTML = filterList.map(drink => drink.render()).join("")
      $('#drink-container')[0].innerHTML = drinkHTML
    }

  }
})()
