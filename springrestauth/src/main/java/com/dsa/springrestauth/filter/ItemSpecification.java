package com.dsa.springrestauth.filter;

import com.dsa.springrestauth.entity.ItemEntity;
import org.springframework.data.jpa.domain.Specification;

public class ItemSpecification {
    private ItemSpecification(){}

    public static Specification<ItemEntity> filterBy(ItemsFilter itemFilter){
        return Specification.
                where(hasType(itemFilter.getType()));
    }
    public static Specification<ItemEntity> hasType(Integer type){
        return (root, query, builder) -> type == null ? builder.conjunction() :builder.equal(root.get("type"), type);
    }
}
