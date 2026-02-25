package com.example.eCommerceDemo.mapper.order;

import com.example.eCommerceDemo.dto.request.OrderRequestDTO;
import com.example.eCommerceDemo.dto.response.OrderResponseDTO;
import com.example.eCommerceDemo.dto.response.UserSummaryDTO;
import com.example.eCommerceDemo.exceptions.NullObjectException;
import com.example.eCommerceDemo.mapper.orderitem.OrderItemMapper;
import com.example.eCommerceDemo.model.Order;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class OrderMapperImpl implements OrderMapper{

    private final OrderItemMapper orderItemMapper;

    public OrderMapperImpl(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    @Override
    public OrderResponseDTO toDto(Order order) {
        if(order==null){
            throw new NullObjectException();
        }
        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        dto.setAddress(order.getAddress());
        dto.setPostalCode(order.getPostalCode());
        dto.setCountry(order.getCountry());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setTotalPrice(order.getTotalPrice());

        if (order.getUser() != null) {
            UserSummaryDTO userSummaryDTO = new UserSummaryDTO();
            userSummaryDTO.setId(order.getUser().getId());
            userSummaryDTO.setEmail(order.getUser().getEmail());
            userSummaryDTO.setName(order.getUser().getName());
            dto.setUserSummaryDTO(userSummaryDTO);
        }

        dto.setOrderItems(
                order.getOrderItems().stream()
                        .map(orderItemMapper::toDTO)
                        .collect(Collectors.toList())
        );

        return dto;
    }

    @Override
    public Order toEntity(OrderRequestDTO orderRequestDTO) {
        if(orderRequestDTO==null){
            throw new NullObjectException();
        }
        Order order = new Order();

        order.setOrderNumber(orderRequestDTO.getOrderNumber());
        order.setAddress(orderRequestDTO.getAddress());
        order.setPostalCode(orderRequestDTO.getPostalCode());
        order.setCountry(orderRequestDTO.getCountry());

       return order;
    }
}
