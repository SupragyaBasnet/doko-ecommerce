package com.dsa.springrestauth.entity;

import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
//@Table(name = "item")
public class ItemEntity implements ResponseObjectsInterface {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    private float price;

    private float discounted_price;

    private String sizes;

    private String category;

    private String tags;

    private Integer type;

    private String description;

    private Date createddate;

    private String imageName;
}
