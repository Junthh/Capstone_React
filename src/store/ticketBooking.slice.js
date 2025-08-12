import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  ticketRoomInfo: null,
  totalPrice: 0, 
};

const ticketBookingSlice = createSlice({
  name: "ticketBooking",
  initialState,
  reducers: {
    setTicketRoomInfo: (state, action) => {
      state.ticketRoomInfo = action.payload;
    },
    
    addSeat: (state, action) => {
      const seat = action.payload;
      const isAlreadySelected = state.selectedSeats.find(s => s.maGhe === seat.maGhe);
      
      if (!isAlreadySelected && state.selectedSeats.length < 8) {
        state.selectedSeats.push(seat);
        state.totalPrice += seat.giaVe;
      }
    },
    
    removeSeat: (state, action) => {
      const seatId = action.payload;
      const seatIndex = state.selectedSeats.findIndex(s => s.maGhe === seatId);
      
      if (seatIndex !== -1) {
        const seat = state.selectedSeats[seatIndex];
        state.totalPrice -= seat.giaVe;
        state.selectedSeats.splice(seatIndex, 1);
      }
    },
    
    toggleSeat: (state, action) => {
      const seat = action.payload;
      const existingIndex = state.selectedSeats.findIndex(s => s.maGhe === seat.maGhe);
      
      if (existingIndex !== -1) {
        const existingSeat = state.selectedSeats[existingIndex];
        state.totalPrice -= existingSeat.giaVe;
        state.selectedSeats.splice(existingIndex, 1);
      } else {
        if (state.selectedSeats.length < 8) {
          state.selectedSeats.push(seat);
          state.totalPrice += seat.giaVe;
        }
      }
    },
    
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    },
    
    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown -= 1;
      }
    },
    
    resetBooking: (state) => {
      state.selectedSeats = [];
      state.ticketRoomInfo = null;
      state.totalPrice = 0;
      state.countdown = 300;
    },
  },
});

export default ticketBookingSlice.reducer;
export const { 
  setTicketRoomInfo,
  addSeat,
  removeSeat,
  toggleSeat,
  clearSelectedSeats,
  decrementCountdown,
  resetBooking
} = ticketBookingSlice.actions;