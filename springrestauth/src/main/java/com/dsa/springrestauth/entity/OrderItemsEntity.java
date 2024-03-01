package com.dsa.springrestauth.entity;

import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "customer_order_item")
public class OrderItemsEntity implements ResponseObjectsInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private Float price;

    private Integer quantity;

    private String imageName;

    @ManyToOne
    @JoinColumn(name = "customer_order_id", nullable = false)
    @JsonIgnore
    private OrderEntity customer_order;
}
