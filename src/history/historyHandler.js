// Create your own history instance.
import { createBrowserHistory } from 'history';
export let history = createBrowserHistory();

history.listen((location, action) => {
  console.log("new location:", location);
});

// Use push to push a new entry onto the history stack.
export function handleHistoryRedirect(newRoute) {
  // console.log(history)
  history.push(newRoute);
}