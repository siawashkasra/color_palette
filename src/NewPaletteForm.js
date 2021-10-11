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
import { Button } from "@mui/material";
import { ChromePicker } from "react-color";
import DragableColorBox from "./DragableColorBox";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";



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
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            currColor: '',
            colors: [],
            newName: ''
        }

        this.changeColor = this.changeColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
            name: this.state.newName
        }
        this.setState({colors: [...this.state.colors, newColor]})
    }

    handleChange(evt) {
        this.setState({newName: evt.target.value})
    }

  render() {
    const { open } = this.state
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
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
                <Button variant="contained" color="secondary">Clear Palette</Button>
                <Button variant="contained" color="primary">Random Palette</Button>
            </div>
            <ChromePicker 
                color={this.state.currColor}
                onChangeComplete={this.changeColor}
            />
            <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator 
                    value={this.state.newName}
                    onChange={this.handleChange}
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
                    style={{backgroundColor: this.state.currColor}}
                    type="submit"
                    >
                        Add Color
                 </Button>
            </ValidatorForm>
          </Drawer>
          <Main cla open={open}>
            <DrawerHeader />
            { this.state.colors.map(color => (
                <DragableColorBox color={color.color} name={color.name} />
            )) }
          </Main>
        </Box>
      );
  }
}

export default NewPaletteForm