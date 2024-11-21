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
import EditIcon from '@mui/icons-material/Edit';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';



import Calendar from'./components/Calendar'
import React, { useEffect } from 'react';
import { useMemo } from "react";

import { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedDateData, setSelectedDateData] = React.useState({TimeStamp : dayjs(), color : "#FF0000", note1 : "", note2 : "", note3 : ""})
  const [selectedDate, setSelectedDate] = React.useState(dayjs())
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [formNote1, setFormNote1] = React.useState("");
  const [formNote2, setFormNote2] = React.useState("");
  const [formNote3, setFormNote3] = React.useState("");
  const [formColor, setFormColor] = React.useState("#FFFFFF");
  const [dateArray, setDateArray] = React.useState([])



  const calendarCollectionRef = useMemo(() => collection(db, "calendarData"), []);

  const getCalendarList = async() =>{
    try {
      const data = await getDocs(calendarCollectionRef) 
      const filteredData = data.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          TimeStamp: dayjs(docData.TimeStamp.toDate()), // Convert Firestore Timestamp to dayjs
          id: doc.id,
        };
      });

      console.log(filteredData)
      setDateArray(filteredData)
    } catch (error) {
      console.log(error)
    }
  }
  const updateCalendarData = async() =>{
    try {

    } catch (error) {
      console.log(error)
    }
  }
  const addCalendarData = async(data) =>{
    try {
      console.log("testo")
      await addDoc(calendarCollectionRef, {
        TimeStamp: dayjs(data.TimeStamp).toDate(),
        color: data.color,
        note1: data.note1,
        note2: data.note2,
        note3: data.note3,
      });
      await getCalendarList();
    } catch (error) {
      console.log(error)
    }
  }

  const checkAndUpdateCalendarData = async (data) => {
    try {
      const querySnapshot = await getDocs(calendarCollectionRef);
  
      let existingDocId = null;
  
      // Check if any document matches the same day
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const docDay = dayjs(docData.TimeStamp.toDate()).startOf("day");
        const dataDay = dayjs(data.TimeStamp).startOf("day");
  
        if (docDay.isSame(dataDay)) {
          existingDocId = doc.id; // Save the document ID for updating
        }
      });
  
      if (existingDocId) {
        // Update the existing document
        const docRef = doc(calendarCollectionRef, existingDocId);
        await updateDoc(docRef, {
          color: data.color,
          note1: data.note1,
          note2: data.note2,
          note3: data.note3,
        });
        console.log("Existing entry updated!");
      } else {
        // Add a new document if no match is found
        await addCalendarData(data);
      }
  
      // Refresh the calendar data
      await getCalendarList();
    } catch (error) {
      console.error("Error checking and updating calendar data: ", error);
    }
  };

  useEffect(() => {
    getCalendarList()
  }, [])

  useEffect(()=>{
    console.log(selectedDateData)
  },[selectedDateData]) 

  useEffect(()=>{
    setSelectedIndex(dateArray.findIndex(e => CompareDay(dayjs(e.TimeStamp),selectedDate)))
    console.log(dateArray);
  },[dateArray, selectedDate]) 
  
  useEffect(()=>{
    if( selectedIndex !== -1 ){
      let temp = dateArray[selectedIndex]
      setSelectedDateData({...temp})
    }
    else{
      setSelectedDateData({TimeStamp : selectedDate, color : "#FFFFFF",note1 : "",note2 : "",note3 : ""})
    }
  },[dateArray, formColor, selectedDate, selectedIndex]) 

  useEffect(()=>{
    let tempDateData = selectedDateData
    tempDateData.note1 = formNote1
    setSelectedDateData(tempDateData)
  },[formNote1]) 

  useEffect(()=>{
    let tempDateData = selectedDateData
    tempDateData.note2 = formNote2
    setSelectedDateData(tempDateData)
  },[formNote2]) 

  useEffect(()=>{
    let tempDateData = selectedDateData
    tempDateData.note3 = formNote3
    setSelectedDateData(tempDateData)
  },[formNote3]) 

  useEffect(()=>{
    let tempDateData = selectedDateData
    tempDateData.color = formColor
    setSelectedDateData(tempDateData)
  },[formColor]) 

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
      setSelectedDateData({TimeStamp : selectedDate, color : "#FFFFFF",note1 : "",note2 : "",note3 : ""})
    }

    console.log("Dialog cancelled")
  }

  const closeHandler = () => {
    setDialogOpen(false)
    console.log("Dialog closed (saved)")


    //TODO: gem hvad end der er blevet skrevet
    if( selectedIndex !== -1 ){

        dateArray[selectedIndex] = selectedDateData
        console.log(selectedDateData)
    }
    else{
        setDateArray([...dateArray,selectedDateData])
        console.log("negativ værdi")
    }
    checkAndUpdateCalendarData(selectedDateData);
  }

  const openHandler = () => {
    setDialogOpen(true)
    setFormColor(selectedDateData.color)
    console.log("Dialog opened")
  }


  const colorChangeHandler = (e) => {
    setFormColor(e.target.value)
    console.log("Color changed")
  }

  const note1ChangeHandler = (e) => {
    setFormNote1(e.target.value)
    console.log("Note1 changed")
  }
  const note2ChangeHandler = (e) => {
    setFormNote2(e.target.value)
    console.log("Note2 changed")
  }
  const note3ChangeHandler = (e) => {
    setFormNote3(e.target.value)
    console.log("Note3 changed")
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
        startIcon={<EditIcon />}
        sx={{ marginBottom: 3 }}
        >Rediger</Button>
      </div>
      <Dialog
        fullScreen
        open = {dialogOpen}
        TransitionComponent={Transition}
      >
      
      <AppBar sx={{ bgcolor : formColor !=="#FFFFFF" ? formColor : "#28382c", position: 'relative' }}>
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
      <FormLabel id="demo-row-radio-buttons-group-label"
      sx={{mt:3, mx:3}}
      >Årstid</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={colorChangeHandler}
        value={formColor}
        sx={{mx:3}}
        
      >
        <FormControlLabel value="#6AA84F" control={<Radio />} label="Forår" />
        <FormControlLabel value="#F1C232" control={<Radio />} label="Sommer" />
        <FormControlLabel value="#FF6D01" control={<Radio />} label="Efterår" />
        <FormControlLabel value="#3D85C6" control={<Radio />} label="Vinter" />
        
      </RadioGroup>
      <TextField
          id="outlined-textarea"
          label="Søvnkvalitet"
          sx={{mx:3, mt:2}}
          //placeholder="Note"
          multiline
          defaultValue = {selectedDateData.note1}
          onChange={note1ChangeHandler}
        />
         <TextField
          id="outlined-textarea"
          label="Sult"
          sx={{mx:3, mt:2}}
          //placeholder="Note"
          multiline
          defaultValue = {selectedDateData.note2}
          onChange={note2ChangeHandler}
        />
         <TextField
          id="outlined-textarea"
          label="Generelt Humør"
          sx={{mx:3, mt:2}}
          //placeholder="Note"
          multiline
          defaultValue = {selectedDateData.note3}
          onChange={note3ChangeHandler}
        />
    </FormControl>
      </Dialog>
    </div>
  );
}

export default App;
