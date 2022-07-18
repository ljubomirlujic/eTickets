package com.ftn.eTickets.service;


import org.springframework.stereotype.Service;
import seatsio.Region;
import seatsio.SeatsioClient;
import seatsio.charts.Chart;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChartService {

    private final SeatsioClient client = new SeatsioClient(Region.EU, "1b9652d8-26aa-414b-b0d3-eb5176de8bbe");

    public List<Chart> getAll(){
        return client.charts.listAll().collect(Collectors.toList());
    }

    public void archiveChart(String chartKey){
        client.charts.moveToArchive(chartKey);
    }
}
