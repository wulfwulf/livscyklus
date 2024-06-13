import { Dialog } from '@mui/material';
import './App.css';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs'
import CompareDay from './Compare';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';



import Calendar from'./components/Calendar'
import React, { useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedDateData, setSelectedDateData] = React.useState({TimeStamp : dayjs(), color : "#FF0000", note : "Testopesto"})
  const [selectedDate, setSelectedDate] = React.useState(dayjs())
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [formNote, setFormNote] = React.useState("");
  const [formColor, setFormColor] = React.useState("#FFFFFF");



  const [dateArray, setDateArray] = React.useState([{TimeStamp : dayjs(), color : "#FF0000", note : "Kæft en god dag"},{TimeStamp : dayjs().day(1), color : "#009999", note : "Det var dårlig dag"}]);


  useEffect(()=>{
    //console.log(selectedDateData)
  },[selectedDateData]) 

  useEffect(()=>{
    setSelectedIndex(dateArray.findIndex(e => CompareDay(dayjs(e.TimeStamp),selectedDate)))
  },[dateArray, selectedDate]) 
  
  useEffect(()=>{
    if( selectedIndex !== -1 ){
      let temp = dateArray[selectedIndex]
      setSelectedDateData({...temp})
    }
    else{
      setSelectedDateData({TimeStamp : selectedDate, color : "#FFFFFF",note : ""})
    }
  },[dateArray, selectedDate, selectedIndex]) 

  useEffect(()=>{
    let tempDateData = selectedDateData
    tempDateData.color = formColor
    tempDateData.note = formNote
    setSelectedDateData(tempDateData)
  },[formNote, formColor]) 

  const selectHandler = (day) => {
      setSelectedDate(day)
      
      console.log("Date selected")
  }

  const cancelHandler = () => {
    setDialogOpen(false)

    if( selectedIndex !== -1 ){
      let temp = dateArray[selectedIndex]
      setSelectedDateData({...temp})
    }
    else{
      setSelectedDateData({TimeStamp : selectedDate, color : "#FFFFFF",note : ""})
    }

    console.log("Dialog cancelled")
  }

  const closeHandler = () => {
    setDialogOpen(false)
    console.log("Dialog closed (saved)")


    //TODO: gem hvad end der er blevet skrevet
    if( selectedIndex !== -1 ){

        dateArray[selectedIndex] = selectedDateData
        setDateArray(dateArray)
    }
    else{
        setDateArray([...dateArray,selectedDateData])
        
    }
    
  }

  const openHandler = () => {
    setDialogOpen(true)
    console.log("Dialog opened")
  }


  const colorChangeHandler = (e) => {
    setFormColor(e.target.value)
    console.log("Color changed")
  }

  const noteChangeHandler = (e) => {
    setFormNote(e.target.value)
    console.log("Note changed")
  }
  
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Velkommen til Livs-cyklus</h1>
        <p>
          Dette er en app til at følge sin cyklus.
        </p>
      </header>
      <div className="CalendarBox">
        <Calendar selectHandler = {selectHandler} dateArray ={dateArray} selecteddatedata = {selectedDateData} />
        <Button variant="outlined"
        onClick={openHandler}
        >Rediger</Button>
      </div>
      <Dialog
        fullScreen
        open = {dialogOpen}
        TransitionComponent={Transition}
      >
      
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={cancelHandler}
              aria-label="close"
              
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedDateData.TimeStamp.format("DD/MM/YYYY")}
            </Typography>
            <Button autoFocus color="inherit" onClick={closeHandler}>
              Gem
            </Button>
          </Toolbar>
        </AppBar>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Årstid</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={colorChangeHandler}
        value={formColor}
        
      >
        <FormControlLabel value="#008000" control={<Radio />} label="Forår" />
        <FormControlLabel value="#FFFF00" control={<Radio />} label="Sommer" />
        <FormControlLabel value="#FFA500" control={<Radio />} label="Efterår" />
        <FormControlLabel value="#0000FF" control={<Radio />} label="Vinter" />
        
      </RadioGroup>
      <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          defaultValue = {selectedDateData.note}
          onChange={noteChangeHandler}
        />
    </FormControl>
      </Dialog>
    </div>
  );
}

export default App;
