import {
  BASE_URL_API_COCKTAIL,
  PARAM_GET_RANDOM_COCKTAIL,
  PARAM_GET_COKTAILS_BY_INGREDIENT,
  PARAM_GET_ONE_COCKTAIL
} from "./endpoint";

export const responseBOT = async question => {
  // initialise Reponse of The Bot
  let objResponse = {};
  question = question.toLowerCase();

  // if the Question its for help
  if (question.includes("help") || question.includes("aide")) {
    objResponse.result =
      "Plusieurs commande son dispo :\n ∙ /help ( pour voir les commandes) \n ∙ /intro ( pour avoir un resumer) \n ∙ /catégorie ( pour trouver un cocktail par ingrédient)  \n ∙ /random ( avoir un coktail Random) \n ∙ /ingrédient ( pour trouver un cocktail par ingrédient)";
    return objResponse;
  }

  // if the Question its for Intro
  else if (question.includes("intro")) {
    objResponse.result =
      "ce bot aide à trouver un nom de cocktail en fonction de tes préférences";
    return objResponse;
  }

  // if the Question its for Get Random Cocktail
  else if (question.includes("random") || question.includes("aleatoire")) {
    const response = await fetch(
      BASE_URL_API_COCKTAIL + PARAM_GET_RANDOM_COCKTAIL
    );
    const value = await response.json();
    let drink = value.drinks[0];

    // transform strIngredient1 to array Ingredient
    let ingredients = [];
    for (let index = 1; index < 16; index++) {
      if (drink["strIngredient" + index].length > 2) {
        ingredients.push(drink["strIngredient" + index]);
      }
    }

    drink.ingredients = ingredients;

    objResponse.result = `je te conseil.... ${drink.strDrink}  `;
    objResponse.drink = drink;

    return objResponse;
  }

  // if the Question its for Get Cocktail By Category
  else if (
    question.includes("categor") ||
    question.includes("catégor") ||
    question.includes("ingredien") ||
    question.includes("ingrédien")
  ) {
    // split and recup juste the ingrdient Value
    let [, param] = question.split(" ");

    if (param === undefined) {
      objResponse.result = `marque bien  : 'ingrédient vodka' `;
      return objResponse;
    }
    const response = await fetch(
      BASE_URL_API_COCKTAIL + PARAM_GET_COKTAILS_BY_INGREDIENT + param
    );
    if (response.ok) {
      try {
        const value = await response.json();

        // get Random Data for List of Cocktail
        let { idDrink: id } = value;
        let drinkInfo =
          value.drinks[Math.floor(Math.random() * value.drinks.length)];

        const responseCocktailId = await fetch(
          BASE_URL_API_COCKTAIL + PARAM_GET_ONE_COCKTAIL + drinkInfo.idDrink
        );

        const val = await responseCocktailId.json();

        let drink = val.drinks[0];

        // transform strIngredient1 to array Ingredient
        let ingredients = [];
        for (let index = 1; index < 16; index++) {
          if (drink["strIngredient" + index].length > 2) {
            ingredients.push(drink["strIngredient" + index]);
          }
        }

        drink.ingredients = ingredients;
        objResponse.result = `je te conseil.... ${drink.strDrink}  `;
        objResponse.drink = drink;
        return objResponse;
      } catch (e) {
        objResponse.result = "cette ingrédient n'existe pas";
        return objResponse;
      }
    } else {
      objResponse.result = `marque bien 'ingrédient Gin' `;
      return objResponse;
    }
  }

  //  Don't understand the Question
  else {
    objResponse.result =
      "aucune réponse trouver tape :\n /help ou /aide \n pour en savoir plus";
    return objResponse;
  }
};
