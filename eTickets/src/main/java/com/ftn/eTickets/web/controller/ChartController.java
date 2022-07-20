package com.ftn.eTickets.web.controller;

import com.ftn.eTickets.service.ChartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import seatsio.charts.Chart;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/charts")
public class ChartController {

    private final ChartService chartService;

    public ChartController(ChartService chartService) {
        this.chartService = chartService;
    }

    @GetMapping
    public ResponseEntity getAll(){
        List<Chart> charts =  chartService.getAll();
        return new ResponseEntity(charts, HttpStatus.OK);

    }

    @GetMapping("/categories/{chartKey}")
    public ResponseEntity getChartCategories(@PathVariable String chartKey) {
        Object response = chartService.getChartCategories(chartKey);

        return new ResponseEntity(response, HttpStatus.OK);

    }

    @PutMapping("/archive/{chartKey}")
    public ResponseEntity archiveChart(@PathVariable String chartKey){
        chartService.archiveChart(chartKey);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
