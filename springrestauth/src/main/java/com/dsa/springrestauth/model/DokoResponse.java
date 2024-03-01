package com.dsa.springrestauth.model;

import com.dsa.springrestauth.model.interfaces.ResponseObjectsInterface;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
@Setter
public class DokoResponse {

    private HttpStatus httpStatus;
    private String message;
    private List<ResponseObjectsInterface> dataArray;
    private ResponseObjectsInterface data;
    private Resource resourceData;

    public void setResponse(
            HttpStatus httpStatus,
            String message,
            ResponseObjectsInterface data,
            List<ResponseObjectsInterface> dataArray,
            Resource resourceData
    ) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
        this.dataArray = dataArray;
        this.resourceData = resourceData;
    }
}
