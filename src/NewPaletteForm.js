import { Component } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, colors } from "@mui/material";
import { ChromePicker } from "react-color";
import DragableColorList from "./DragableColorList";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import { isPlainObject } from "@mui/utils/deepmerge";


const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calChromePickerc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

class NewPaletteForm extends Component {
    static defaultProps = {
      maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            currColor: '',
            colors: this.props.palettes[0].colors,
            newColorName: '',
            newPaletteName: ''
        }

        this.changeColor = this.changeColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removColor = this.removColor.bind(this)
        this.clearPalette = this.clearPalette.bind(this)
        this.randomColor = this.randomColor.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', (value) => 
            this.state.colors.every( 
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        ValidatorForm.addValidationRule("isColorUnique", (value) => 
            this.state.colors.every(
                ({color}) => color !== this.state.currColor
            )
        )

        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        )
    }

    handleDrawerOpen = () => {
        this.setState({open: true})
    };
    
    handleDrawerClose = () => {
        this.setState({open: false})
    };

    changeColor(newColor) {
        console.log(newColor)
        this.setState({currColor: newColor.hex})
    }

    addNewColor() {
        const newColor = {
            color: this.state.currColor,
            name: this.state.newColorName
        }
        this.setState({colors: [...this.state.colors, newColor]})
    }

    handleChange(evt) {
        this.setState(
          {[evt.target.name]: evt.target.value}
        )
    }

    handleSubmit() {
      let newPaletteName = this.state.newPaletteName
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, '-'),
        colors: this.state.colors
      }

      this.props.savePalette(newPalette)
      this.props.history.push("/")
    }

    removColor(colorName) {
      console.log("uhooooooo", colorName)
      this.setState({
        colors: this.state.colors.filter((clr) => clr.name !== colorName)
      })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };


    clearPalette() {
      this.setState({colors: []})
    }

    randomColor() {
      const allColors = this.props.palettes.map((p) => p.colors).flat()
      let randomColor = Math.floor(Math.random() * allColors.length)
      this.setState({colors: [...this.state.colors, allColors[randomColor]]})
    }

  render() {
    const { open } = this.state
    const IsPaletteFull = this.state.colors.length >= this.props.maxColors

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar 
            color="default" 
            position="fixed" 
            open={open}>

            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Persistent drawer
              </Typography>
              <ValidatorForm 
                onSubmit={this.handleSubmit}
                style={{display: "flex"}}
                >
                <TextValidator
                  value={this.state.newPaletteName}
                  onChange={this.handleChange}
                  name="newPaletteName"
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['name is required', 'palette name already taken!']}
                />
                <Button 
                  variant="contained"
                  type="submit"
                  color="primary"
                >Save Palette</Button>
              </ValidatorForm>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Typography variant="h5">Design Your Palette</Typography>
            <div>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={this.clearPalette}
                  >Clear Palette
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.randomColor}
                  disabled={IsPaletteFull}
                  >Random Palette
                </Button>
            </div>
            <ChromePicker 
                color={this.state.currColor}
                onChangeComplete={this.changeColor}
            />
            <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator 
                    value={this.state.newColorName}
                    onChange={this.handleChange}
                    name="newColorName"
                    validators={
                        [
                            'required', 
                            'isNameUnique', 
                            'isColorUnique'
                        ]
                    }
                    errorMessages={
                        [
                            'this field is required', 
                            'name should be unique', 
                            'color should be unique'
                        ]
                    }
                />

                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{backgroundColor: IsPaletteFull? "grey": this.state.currColor}}
                    type="submit"
                    disabled={IsPaletteFull}
                    >
                        Add Color
                 </Button>
            </ValidatorForm>
          </Drawer>
          <Main cla open={open}>
            <DrawerHeader />
            <DragableColorList
              colors={this.state.colors}
              removColor={this.removColor}
              axis="xy"
              onSortEnd={this.onSortEnd}
            />
          </Main>
        </Box>
      );
  }
}

export default NewPaletteForm