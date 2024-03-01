package com.dsa.springrestauth.entity;

import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "customer_order")
public class OrderEntity implements ResponseObjectsInterface {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Float shipping;

    private Date deliveryDate;

    private String address;

    private boolean complete;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "customer_order")
    private List<OrderItemsEntity> orderItems;
}
