/* global document */
import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import connectComponent from '../../../helpers/connect-component';
import getLocale from '../../../helpers/get-locale';

import { changeRoute } from '../../../state/root/router/actions';
import { updateLanguageListSearch } from '../../../state/pages/language-list/actions';
import { ROUTE_HOME, ROUTE_LANGUAGE_LIST } from '../../../constants/routes';

import LanguageListList from './list';

const styles = (theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  inputContainer: {
    display: 'flex',
    padding: theme.spacing(1.5, 2, 0, 2),
  },
  input: {
    width: '100%',
    fontSize: 16,
    margin: 0,
    '&::before': {
      background: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  appBarColorDefault: {
    background: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.primary.main,
    color: theme.palette.type === 'dark' ? theme.palette.getContrastText(theme.palette.grey[900]) : theme.palette.primary.contrastText,
    WebkitAppRegion: 'drag',
    WebkitUserSelect: 'none',
  },
  toolbar: {
    minHeight: 40,
  },
  toolbarIconButton: {
    padding: theme.spacing(1),
  },
});


class LanguageList extends React.Component {
  constructor(props) {
    super(props);

    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey(evt) {
    const { route, onChangeRoute } = this.props;
    if (route !== ROUTE_LANGUAGE_LIST) {
      return;
    }
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      onChangeRoute(ROUTE_HOME);
    }
  }

  render() {
    const {
      classes,
      mode,
      onChangeRoute,
      onUpdateLanguageListSearch,
      search,
    } = this.props;

    return (
      <div className={classes.container}>
        <AppBar position="static" color="default" elevation={1} classes={{ colorDefault: classes.appBarColorDefault }}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="subtitle1" color="inherit" className={classes.title}>
              {mode === 'inputLang' ? getLocale('chooseAnInputLanguage') : getLocale('chooseAnOutputLanguage')}
            </Typography>
            <IconButton
              color="inherit"
              className={classes.toolbarIconButton}
              onClick={() => onChangeRoute(ROUTE_HOME)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.inputContainer}>
          <TextField
            margin="dense"
            variant="standard"
            value={search}
            placeholder={getLocale('searchLanguages')}
            className={classes.input}
            InputProps={{
              'aria-label': getLocale('searchLanguages'),
              endAdornment: search && search.length > 0 && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onUpdateLanguageListSearch('')}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => onUpdateLanguageListSearch(event.target.value)}
          />
        </div>
        <LanguageListList />
      </div>
    );
  }
}

LanguageList.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onChangeRoute: PropTypes.func.isRequired,
  onUpdateLanguageListSearch: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  search: PropTypes.string,
};

const actionCreators = {
  changeRoute,
  updateLanguageListSearch,
};

const mapStateToProps = (state) => ({
  mode: state.pages.languageList.mode,
  recentLanguages: state.preferences.recentLanguages,
  route: state.router.route,
  search: state.pages.languageList.search,
});

export default connectComponent(
  LanguageList,
  mapStateToProps,
  actionCreators,
  styles,
);
