package com.dsa.springrestauth.filter;

public class ItemsFilter {
    private Integer type;

    public ItemsFilter(Integer type){
        this.type = type;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
