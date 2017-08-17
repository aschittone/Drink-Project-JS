function drinkByIndgredient(ingredient) {
  fetch(`http://addb.absolutdrinks.com/drinks/?pageSize=4000&apiKey=fddc7b8e73204e4ea3539d960ce7cb0f`
//   headers: {
//     Authorization: `token fddc7b8e73204e4ea3539d960ce7cb0f`
//   }
).
    then(res => res.json()).
    then(json => saveDrinks(json))
}

function saveDrinks(drinkList) {
  drinkList.result.map(drink => {
      new Drink( drink.name, drink.videos[0].video, drink.descriptionPlain, setIngredients(drink.ingredients))
    })
  Drink.setImage()
  Drink.showDrink()
}

function setIngredients(ingredients) {
  return ingredients.map(ingredient => ingredient.textPlain)
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
      return `<div class="drink-container">
      <div class="drink-frame" style="float:left;">
      <h3 class="center-text">${this.name}</h3>
      <div style="width:239px;margin:auto">
      <div style="width:96px;margin:auto">
      <img style="width:96px" id="${this.id}" src="${this.image}">
      </div>
      </div>
      </div>
      </div>`
    }

    static setImage() {
      Drink.all().map(drink => {
        let drinkName = drink.name.replace(" ", "-").replace(".", "-").replace("'", "-")
        drink.image = `http://assets.absolutdrinks.com/drinks/${drinkName}.png`
      })
    }


    static showDrink() {
      const drinkHTML = Drink.all().map(drink => drink.render()).join("")
      $('#drink-container')[0].innerHTML = drinkHTML
    }

  }
})()
