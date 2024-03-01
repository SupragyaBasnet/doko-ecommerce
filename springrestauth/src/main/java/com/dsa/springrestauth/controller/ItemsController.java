package com.dsa.springrestauth.controller;

import com.dsa.springrestauth.entity.ItemEntity;
import com.dsa.springrestauth.filter.ItemSpecification;
import com.dsa.springrestauth.filter.ItemsFilter;
import com.dsa.springrestauth.model.DokoResponse;
import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import com.dsa.springrestauth.repository.ItemRepository;
import com.dsa.springrestauth.service.interfaces.StorageService;
import jakarta.activation.FileTypeMap;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class ItemsController {

    private final StorageService storageService;

    private DokoResponse dokoResponse;

    @Autowired
    public ItemsController(StorageService storageService){
        this.storageService = storageService;
        this.dokoResponse = new DokoResponse();
    }

    @Autowired
    private ItemRepository itemRepository;


    @GetMapping("/items")
    public ResponseEntity<DokoResponse> items(
            @RequestParam(required = false, value = "type") Integer type,
            @RequestParam(required = false, value="date") Date date,
            @RequestParam(required = false, value="page", defaultValue = "0") Integer page,
            @RequestParam(required = false, value="limit", defaultValue = "10") Integer limit) {

        List<ResponseObjectsInterface> itemList = new ArrayList<>();
        Pageable pageable = PageRequest.of(page,limit);
        ItemsFilter itemsFilter = new ItemsFilter(type);

        Iterable<ItemEntity> queryResultPage = itemRepository.findAll(
                ItemSpecification.filterBy(itemsFilter),
                pageable);

        for (ItemEntity item: queryResultPage){
            itemList.add(item);
        }
        dokoResponse.setResponse(
                HttpStatus.OK,
                itemList.isEmpty()?"No items found.":"Found List of items.",
                null,
                itemList,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<DokoResponse> itemDetails(@PathVariable(value = "id") Integer id){
        Optional<ItemEntity> itemOptional = itemRepository.findById(id);

        if (itemOptional.isPresent()) {
            ItemEntity item = itemOptional.get();
            dokoResponse.setResponse(
                    HttpStatus.OK,
                    "Item found.",
                    item,
                    null,
                    null
            );
            return ResponseEntity.ok(dokoResponse);
        }

        dokoResponse.setResponse(
                HttpStatus.NOT_FOUND,
                "Item not found.",
                null,
                null,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    //    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/items/{id}/image")
    public ResponseEntity<byte[]> itemImage(@PathVariable(value = "id") Integer id){
        Optional<ItemEntity> itemOptional = itemRepository.findById(id);

        if (itemOptional.isPresent()) {
            ItemEntity item = itemOptional.get();
            Resource file = storageService.loadAsResource(item.getImageName());
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

        return ResponseEntity.notFound().build();
    }

    //    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/admin/items")
    public ResponseEntity<DokoResponse> addNewItem(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "price") float price,
            @RequestParam(value = "discounted_price") float discounted_price,
            @RequestParam(value = "sizes") String sizes,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "tags") String tags,
            @RequestParam(value = "type") Integer type,
            @RequestParam(value = "description") String description,
            @RequestParam("file") MultipartFile file
    ){
        System.out.println("=====================================Received post request");
        try {
            storageService.store(file);
        } catch (Exception e) {
            System.out.println(e.getMessage());

            dokoResponse.setResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    null,
                    null,
                    null
            );
            return ResponseEntity.ok(dokoResponse);
        }

        ItemEntity item = new ItemEntity();
        item.setName(name);
        item.setPrice(price);
        item.setDiscounted_price(discounted_price);
        item.setSizes(sizes);
        item.setCategory(category);
        item.setTags(tags);
        item.setType(type);
        item.setDescription(description);
        item.setImageName(file.getOriginalFilename());
        item.setCreateddate(new Date());
        itemRepository.save(item);

        dokoResponse.setResponse(
                HttpStatus.OK,
                "Item saved successfully.",
                item,
                null,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/admin/items/{id}")
    public ResponseEntity<DokoResponse> updateItem(
            @PathVariable(value = "id") Integer id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "price") float price,
            @RequestParam(value = "discounted_price") float discounted_price,
            @RequestParam(value = "sizes") String sizes,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "tags") String tags,
            @RequestParam(value = "type") Integer type,
            @RequestParam(value = "description") String description,
            @RequestParam("file") MultipartFile file
    ){
        Optional<ItemEntity> itemOptional = itemRepository.findById(id);

        if (itemOptional.isPresent()) {
            try {
                storageService.store(file);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                dokoResponse.setResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        e.getMessage(),
                        null,
                        null,
                        null
                );
                return ResponseEntity.ok(dokoResponse);
            }

            ItemEntity item = itemOptional.get();
            item.setName(name);
            item.setPrice(price);
            item.setDiscounted_price(discounted_price);
            item.setSizes(sizes);
            item.setCategory(category);
            item.setTags(tags);
            item.setType(type);
            item.setDescription(description);
            item.setCreateddate(new Date());
            item.setImageName(file.getOriginalFilename());
            itemRepository.save(item);

            dokoResponse.setResponse(
                    HttpStatus.OK,
                    "Item Updated Successfully.",
                    item,
                    null,
                    null
            );

            return ResponseEntity.ok(dokoResponse);
        }

        dokoResponse.setResponse(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "Update Item Failed.",
                null, null, null);

        return ResponseEntity.ok(dokoResponse);
    }

    @CrossOrigin(origins = "http://localhost:3000",
            methods = {
                    RequestMethod.GET,
                    RequestMethod.POST,
                    RequestMethod.PUT,
                    RequestMethod.DELETE,
                    RequestMethod.OPTIONS
            })
    @DeleteMapping(path="/admin/items/{id}")
    public ResponseEntity<DokoResponse> deleteItem(
            @PathVariable(value = "id") Integer id
    ) {
        Optional<ItemEntity> oItem = itemRepository.findById(id);
        if (oItem.isPresent()){
            ItemEntity item = oItem.get();
            storageService.delete(item.getImageName());
            itemRepository.delete(item);

            dokoResponse.setResponse(
                    HttpStatus.OK,
                    "Item Deleted Successfully.",
                    null,
                    null,
                    null
            );

            return ResponseEntity.ok(dokoResponse);
        }

        dokoResponse.setResponse(
                HttpStatus.NOT_FOUND,
                "Could not find Item ID",
                null,
                null,
                null
        );
        return ResponseEntity.ok(dokoResponse);
    }
}
