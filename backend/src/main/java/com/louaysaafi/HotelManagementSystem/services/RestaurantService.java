package com.louaysaafi.HotelManagementSystem.services;

import com.louaysaafi.HotelManagementSystem.models.Restaurant;
import com.louaysaafi.HotelManagementSystem.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    // CRUD operations

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Integer id, Restaurant updatedRestaurant) {
        // Check if the restaurant with the given id exists
        if (restaurantRepository.existsById(Long.valueOf(id))) {
            updatedRestaurant.setId(id); // Set the ID of the updated restaurant
            return restaurantRepository.save(updatedRestaurant);
        } else {
            // Handle error: restaurant not found
            return null;
        }
    }

    public void deleteRestaurant(Long id) {
        // Check if the restaurant with the given id exists
        if (restaurantRepository.existsById(id)) {
            restaurantRepository.deleteById(id);
        } else {
            // Handle error: restaurant not found
        }
    }

    // Add any additional methods as needed for specific business logic
}
