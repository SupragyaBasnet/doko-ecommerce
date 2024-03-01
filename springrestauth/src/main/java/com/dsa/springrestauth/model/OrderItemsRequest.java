package com.dsa.springrestauth.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemsRequest {
    private Integer id;
    private String name;
    private float price;
    private String imageName;
    private Integer quantity;
}
