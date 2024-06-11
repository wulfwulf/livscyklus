import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveComment = () => {
    const newEvent = {
      start: selectedDate,
      end: selectedDate,
      title: comment,
    };
    setEvents([...events, newEvent]);
    setComment('');
    setOpenDialog(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSelectSlot} // Use onSelectSlot instead of onSelectEvent
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Skriver kommentar for {moment(selectedDate).format('MMMM Do YYYY')}</DialogTitle>
        <DialogContent>
          <TextField
            label="Kommentar"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSaveComment} style={{ marginTop: 10 }}>
            Gem kommentar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;