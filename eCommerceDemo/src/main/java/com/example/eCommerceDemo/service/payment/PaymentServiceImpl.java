package com.example.eCommerceDemo.service.payment;

import com.example.eCommerceDemo.dto.request.PaymentRequestDTO;
import com.example.eCommerceDemo.dto.response.PaymentResponseDTO;
import com.example.eCommerceDemo.exceptions.NotFoundException;
import com.example.eCommerceDemo.mapper.payment.PaymentMapper;
import com.example.eCommerceDemo.model.Order;
import com.example.eCommerceDemo.model.Payment;
import com.example.eCommerceDemo.model.PaymentStatus;
import com.example.eCommerceDemo.repository.OrderRepository;
import com.example.eCommerceDemo.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final OrderRepository orderRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequestDTO, Long userId) {

        Order order = orderRepository.findById(paymentRequestDTO.getOrderId())
                .orElseThrow(NotFoundException::new);

        Payment payment = paymentMapper.toEntity(paymentRequestDTO);
        payment.setOrder(order);
        payment.setUser(order.getUser());
        payment.setStatus(PaymentStatus.APPROVED);

        orderRepository.save(order);
        paymentRepository.save(payment);
        return paymentMapper.toDTO(payment);
    }

    @Override
    public PaymentResponseDTO getPaymentByOrderId(Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(NotFoundException::new);

        return paymentMapper.toDTO(payment);
    }
}
