package com.ftn.eTickets.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookBestAvaliableReq {
    private List<BookCategory> categories;
}
