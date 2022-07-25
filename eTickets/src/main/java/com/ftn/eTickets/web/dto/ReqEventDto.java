package com.ftn.eTickets.web.dto;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.model.Category;
import com.ftn.eTickets.model.EEventType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
public class ReqEventDto {

    @NotBlank
    @Size(min = 3)
    private String name;
    @Future
    private LocalDateTime date;
    @NotBlank
    private String location;
    private EEventType type;
    private List<Category> categories;
    private byte[] image;

}
