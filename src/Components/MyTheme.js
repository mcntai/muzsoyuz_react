import { createMuiTheme } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';


export default createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        // boxSizing: 'border-box'
      },
    }
  }
});
