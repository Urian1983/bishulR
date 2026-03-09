package com.example.eCommerceDemo.mapper.orderitem;

import com.example.eCommerceDemo.dto.request.OrderItemRequestDTO;
import com.example.eCommerceDemo.dto.response.OrderItemResponseDTO;
import com.example.eCommerceDemo.exceptions.NullObjectException;
import com.example.eCommerceDemo.model.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemMapperImpl implements OrderItemMapper {
    @Override
    public OrderItemResponseDTO toDTO(OrderItem orderItem) {
        if(orderItem==null){
            throw new NullObjectException();
        }
        OrderItemResponseDTO dto = new OrderItemResponseDTO();
        dto.setId(orderItem.getId());
        dto.setProductId(orderItem.getProduct().getId());
        dto.setQuantity(orderItem.getQuantity());
        dto.setPrice(orderItem.getPrice());
        dto.setProductName(orderItem.getProductName());

        return dto;
    }

    @Override
    public OrderItem toEntity(OrderItemRequestDTO dto) {
        if(dto==null){
            throw new NullObjectException();
        }
        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(dto.getQuantity());

        return orderItem;
    }
}
