const RecipeController = require("../controllers/RecipeController");

const mockData = [{
  title: "Pasta souce with tomatoes",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit mattis est, ac scelerisque magna rutrum sed. Nulla a condimentum purus. Ut suscipit lorem a aliquet feugiat. Proin sit amet laoreet velit. Nullam nulla elit, iaculis quis luctus vel, venenatis eu nisl. Pellentesque at vestibulum dui, eget placerat mauris. Nullam vestibulum, odio vitae dictum tincidunt, est ipsum dapibus mi, feugiat pretium urna arcu a magna. Curabitur vel tellus eget quam luctus ultrices at vel tellus. Etiam et tellus arcu. Donec et orci blandit, rhoncus lacus sit amet, ultricies magna. Fusce congue hendrerit nibh, non ullamcorper sapien finibus at. Morbi et lectus sit amet velit ultrices egestas non id neque. Donec metus augue, pretium id arcu non, scelerisque euismod odio. Donec blandit, odio sit amet sodales tempor, lacus turpis tristique enim, ut pellentesque diam tortor vel sapien. Integer at justo nec ligula accumsan tincidunt quis nec nisl. Suspendisse fringilla, est sed ullamcorper pretium, quam massa sagittis diam, sit amet interdum mauris lacus eget tortor.",
  picture: "http://localhost:3210/recipe1.jpg",
}, {
  title: "Delicious home-made burger",
  description: "Quisque eu ultricies eros. Proin id consectetur enim, id interdum ligula. Vivamus tincidunt nisi at justo lacinia aliquet. Suspendisse efficitur justo leo, quis tempus augue vulputate eget. Vivamus eleifend, velit quis pharetra lacinia, massa lacus finibus elit, in sollicitudin felis lacus vitae ante. Duis vel egestas dolor, et hendrerit felis. Donec bibendum risus sit amet urna consectetur interdum. Morbi eros sem, venenatis sit amet eleifend suscipit, tempus quis mi. Nulla facilisi. Nam malesuada pulvinar nibh sit amet iaculis.",
  picture: "http://localhost:3210/recipe2.jpg",
}, {
  title: "Falafel salad for those quick lunches",
  description: "Nunc semper ligula mi, eu vulputate elit faucibus a. Nunc in aliquam dui, sed aliquam ex. Sed suscipit placerat leo, quis varius massa accumsan vitae. Nunc tincidunt efficitur odio, eu accumsan nibh. Aenean vel metus consectetur metus dictum cursus egestas sit amet ipsum. Pellentesque ultricies tempor elit, eu viverra neque feugiat et. Nam consectetur ultricies elit, quis congue enim tincidunt quis. Praesent nec nibh quis nibh cursus semper. Vivamus ut hendrerit ipsum, suscipit varius ex.",
  picture: "http://localhost:3210/recipe3.jpg",
}];

module.exports = () => {
  const recipeController = new RecipeController();

  return recipeController.find()
    .then((recipes) => {
      if (!recipes || recipes.length === 0) {
        const promises = [];
        for (let i = 0; i < mockData.length; i++) {
          promises.push(recipeController.create(mockData[i]));
        }
        console.log("Mocking data...");
        return Promise.all(promises);
      }

      return new Promise(resolve => resolve({}));
    })
    .catch(() => {});
};
