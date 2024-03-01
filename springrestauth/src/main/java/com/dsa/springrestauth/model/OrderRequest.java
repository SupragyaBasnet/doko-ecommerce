package com.dsa.springrestauth.model;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class OrderRequest {
    private float shipping;
    private Date deliveryDate;
    private String address;
    private boolean complete;

    private List<OrderItemsRequest> orderItems;
}
