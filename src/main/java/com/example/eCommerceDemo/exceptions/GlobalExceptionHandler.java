package com.example.eCommerceDemo.exceptions;

import com.example.eCommerceDemo.dto.response.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFoundException(NotFoundException ex){
        // Usamos ex.getMessage() para que el parámetro tenga uso y el cliente vea el error real
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseDTO("Not Found", ex.getMessage()));
    }

    @ExceptionHandler(NullObjectException.class)
    public ResponseEntity<ErrorResponseDTO> handleNullObjectException(NullObjectException ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseDTO("Not Valid Object", ex.getMessage()));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserAlreadyExistsException(UserAlreadyExistsException ex){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseDTO("User Already Exists", ex.getMessage()));
    }

    @ExceptionHandler(UserNameNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserNameNotFoundException(UserNameNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseDTO("User name Not Found", ex.getMessage()));
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponseDTO> handleNullPointerException(NullPointerException ex) {
        // En NPEs a veces el mensaje es null, así que ponemos un texto genérico si es necesario
        String detail = (ex.getMessage() != null) ? ex.getMessage() : "Null pointer encountered";
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseDTO("Internal Server Error", detail));
    }
}

