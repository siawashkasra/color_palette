import React from "react"
import { withStyles } from '@mui/styles';
import { Delete } from '@mui/icons-material'
import { SortableElement } from "react-sortable-hoc";


const styles = {
    root: {
        height: '25%',
        width: '20%',
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    BoxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out",
    }
}

const DragableColorBox = SortableElement((props) => {
    const { classes, name, color, handleClick } = props
    return(
        <div 
            className={classes.root}
            style={{backgroundColor: color}}>

                <div className={classes.BoxContent}>
                    <span>{name}</span>
                    <Delete 
                        className={classes.deleteIcon}
                        onClick={handleClick}
                     />
                </div>
        </div>
    )
})


export default withStyles(styles)(DragableColorBox);