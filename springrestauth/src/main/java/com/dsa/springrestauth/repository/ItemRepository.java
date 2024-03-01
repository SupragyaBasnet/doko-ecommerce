package com.dsa.springrestauth.repository;

import com.dsa.springrestauth.entity.ItemEntity;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemRepository extends JpaRepository<ItemEntity, Integer>, JpaSpecificationExecutor<ItemEntity> {
    Page<ItemEntity> findAll(@Nullable Specification<ItemEntity> spec, @Nonnull Pageable pageable);
}
