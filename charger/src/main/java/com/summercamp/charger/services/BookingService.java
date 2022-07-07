package com.summercamp.charger.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.summercamp.charger.dtos.BookingDto;
import com.summercamp.charger.models.Booking;
import com.summercamp.charger.models.Station;
import com.summercamp.charger.repositories.BookingRepository;
import com.summercamp.charger.repositories.StationRepository;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private StationRepository stationRepository;
    
    public List<Booking> getBookings(){
        return bookingRepository.findAll();
    }

    public Booking saveBooking(BookingDto bookingDto){
        
        Station station = stationRepository.findById(bookingDto.getStationId())
            .orElseThrow(() -> new RuntimeException("Error while retrieving stationDpo type "));

        Booking booking = new Booking();
        booking.setStation(station);
        booking.setStartDateTime(bookingDto.getStartDateTime());
        booking.setDuration(bookingDto.getDuration());
        booking.setLicenceCar(bookingDto.getLicenceCar()); 
        
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long Id){
        bookingRepository.delete(bookingRepository.getById(Id));
    }

    public void updateBooking(Long Id, Booking newBooking){
        Booking myBooking = bookingRepository.getById(Id); 
        myBooking = newBooking;
        bookingRepository.save(myBooking);
    }
}
