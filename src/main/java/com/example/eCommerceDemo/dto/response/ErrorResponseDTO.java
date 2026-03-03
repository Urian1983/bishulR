package com.example.eCommerceDemo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Standard structure for error responses")
public class ErrorResponseDTO {

    @Schema(description = "Error message description", example = "Not Found")
    private String message;

    @Schema(description = "Specific error details (if applicable)", example = "Data is null")
    private String error;
}