package com.dsa.springrestauth.repository;

import com.dsa.springrestauth.entity.ItemEntity;
import com.dsa.springrestauth.entity.OrderEntity;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer>, JpaSpecificationExecutor<OrderEntity> {
    Page<OrderEntity> findAll(@Nullable Specification<OrderEntity> spec, @Nonnull Pageable pageable);
}
