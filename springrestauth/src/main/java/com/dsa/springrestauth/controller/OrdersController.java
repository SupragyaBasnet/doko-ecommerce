package com.dsa.springrestauth.controller;

import com.dsa.springrestauth.entity.OrderEntity;
import com.dsa.springrestauth.entity.OrderItemsEntity;
import com.dsa.springrestauth.model.DokoResponse;
import com.dsa.springrestauth.model.OrderRequest;
import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import com.dsa.springrestauth.repository.OrderItemsRepository;
import com.dsa.springrestauth.repository.OrderRepository;
import com.dsa.springrestauth.service.UserService;
import com.dsa.springrestauth.service.interfaces.StorageService;
import jakarta.activation.FileTypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class OrdersController {

    private DokoResponse dokoResponse;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StorageService storageService;

    public OrdersController(){
        this.dokoResponse = new DokoResponse();
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<DokoResponse> getAllOrders(){
        List<ResponseObjectsInterface> orderList = new ArrayList<>();
        Iterable<OrderEntity> orders = orderRepository.findAll();

        for (OrderEntity orderEntity:orders) {
            orderList.add(orderEntity);
        }

        dokoResponse.setResponse(
                HttpStatus.OK,
                orderList.isEmpty()?"No orders found.":"Found List of orders.",
                null,
                orderList,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    @PostMapping("/user/orders")
    public ResponseEntity<DokoResponse> addOrder(
            @RequestBody @Validated OrderRequest orderRequest) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setShipping(orderRequest.getShipping());
        orderEntity.setDeliveryDate(orderRequest.getDeliveryDate());
        orderEntity.setAddress(orderRequest.getAddress());
        List<OrderItemsEntity> orderItemsEntities = new ArrayList<>();
        orderEntity.setUser(userService.getCurrentUser().get());
        orderRepository.save(orderEntity);
        orderRequest.getOrderItems().forEach(orderItemsRequest -> {
            OrderItemsEntity orderItemsEntity = new OrderItemsEntity();
            orderItemsEntity.setCustomer_order(orderEntity);
            orderItemsEntity.setName(orderItemsRequest.getName());
            orderItemsEntity.setPrice(orderItemsRequest.getPrice());
            orderItemsEntity.setQuantity(orderItemsRequest.getQuantity());
            orderItemsEntity.setImageName(orderItemsRequest.getImageName());
            orderItemsRepository.save(orderItemsEntity);
            orderItemsEntities.add(orderItemsEntity);
        });
        orderEntity.setOrderItems(orderItemsEntities);
        dokoResponse.setResponse(
                HttpStatus.OK,
                "Item saved successfully.",
                orderEntity,
                null,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    @PutMapping("/admin/orders/{id}")
    public ResponseEntity<DokoResponse> completeOrder(
            @PathVariable Integer id,
            @RequestBody @Validated OrderRequest orderRequest) {
        Optional<OrderEntity> optionalOrderEntity = orderRepository.findById(id);
        if (optionalOrderEntity.isEmpty()) return ResponseEntity.notFound().build();

        OrderEntity orderEntity = optionalOrderEntity.get();
        orderEntity.setShipping(orderRequest.getShipping());
        orderEntity.setDeliveryDate(orderRequest.getDeliveryDate());
        orderEntity.setAddress(orderRequest.getAddress());
        List<OrderItemsEntity> orderItemsEntities = new ArrayList<>();
        orderEntity.setUser(userService.getCurrentUser().get());
        orderEntity.setComplete(orderRequest.isComplete());
        orderRepository.save(orderEntity);
        orderRequest.getOrderItems().forEach(orderItemsRequest -> {
            Optional<OrderItemsEntity> optionalOrderItemsEntity = orderItemsRepository.findById(orderItemsRequest.getId());
            OrderItemsEntity orderItemsEntity;
            orderItemsEntity = optionalOrderItemsEntity.orElseGet(OrderItemsEntity::new);
            orderItemsEntity.setCustomer_order(orderEntity);
            orderItemsEntity.setName(orderItemsRequest.getName());
            orderItemsEntity.setPrice(orderItemsRequest.getPrice());
            orderItemsEntity.setQuantity(orderItemsRequest.getQuantity());
            orderItemsEntity.setImageName(orderItemsRequest.getImageName());
            orderItemsRepository.save(orderItemsEntity);
            orderItemsEntities.add(orderItemsEntity);
        });
        orderEntity.setOrderItems(orderItemsEntities);
        dokoResponse.setResponse(
                HttpStatus.OK,
                "Item saved successfully.",
                orderEntity,
                null,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> itemImage(@RequestParam(value = "imageName") String imageName){
        Resource file = storageService.loadAsResource(imageName);
        if (file == null)
            return ResponseEntity.notFound().build();

        File img = new File("src/main/resources/static/test.jpg");
        try {
            return ResponseEntity.ok()
                    .contentType(
                            MediaType.valueOf(FileTypeMap.getDefaultFileTypeMap().getContentType(img)))
                    .body(file.getContentAsByteArray());
        } catch (IOException e) {
            return ResponseEntity.ok(null);
        }
    }
}
