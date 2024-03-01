package com.dsa.springrestauth.repository;

import com.dsa.springrestauth.entity.OrderItemsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemsRepository extends JpaRepository<OrderItemsEntity, Integer> {
}
