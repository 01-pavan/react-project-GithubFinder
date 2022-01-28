import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = "https://api.github.com";

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    console.log(response);

    const { items } = await response.json();
    //if entered name in input box is invaalid it will redirect to notfounf page
    if (items.length === 0) {
      window.location = "/notfound";
    } else {
      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    }
  };

  //getting single user
  const searchUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };
  //get user repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "current",
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    console.log(response);

    const data = await response.json();
    //if entered name in input box is invaalid it will redirect to notfounf page
    console.log(data);
    if (data.length === 0) {
      window.location = "/notfound";
    } else {
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
  };

  //clear users from sate
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        searchUser,
        clearUsers,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
