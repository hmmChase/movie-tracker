import { addMovies, toggleLogin, storeUserData, loadFavorites } from "../index";

describe("Actions", () => {
  describe("addMovies", () => {
    it("have a type of ADD_MOVIES", () => {
      let movies = [];

      let actual = addMovies(movies);
      let expected = {
        type: "ADD_MOVIES",
        movies
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("toggleLogin", () => {
    it("have a type of TOGGLE_LOGIN", () => {
      let actual = toggleLogin();
      let expected = {
        type: "TOGGLE_LOGIN"
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("storeUserData", () => {
    it("have a type of STORE_USER_DATA", () => {
      let id = 1;
      let name = 'gizmo';
      let actual = storeUserData({id, name});
      let expected = {
        type: "STORE_USER_DATA",
        id,
        name
      };

      expect(actual).toEqual(expected);
    });
  });
  describe("loadFavorites", () => {
    it("have a type of LOAD_FAVORITES", () => {
      let favorites = [];
      let actual = loadFavorites(favorites);
      let expected = {
        type: "LOAD_FAVORITES",
        favorites
      };

      expect(actual).toEqual(expected);
    });
  });
});
