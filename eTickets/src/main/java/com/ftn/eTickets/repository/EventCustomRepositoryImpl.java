package com.ftn.eTickets.repository;

import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EventCustomRepositoryImpl implements EventCustomRepository{

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Page<Event> findEventbyProperties(EEventType eventType, String searchParam, LocalDate dateFrom, LocalDate dateTo, String city, Pageable page) {
        final Query query = new Query().with(page);

        final List<Criteria> criteria = new ArrayList<>();
        if (eventType != null)
            criteria.add(Criteria.where("type").is(eventType));
        if (searchParam != null && !searchParam.isEmpty())
            criteria.add(Criteria.where("name").regex(searchParam));
        if (dateFrom != null)
            criteria.add(Criteria.where("date").gte(dateFrom));
        if (dateTo != null)
            criteria.add(Criteria.where("date").lte(dateTo));
        if (city != null && !city.isEmpty())
            criteria.add(Criteria.where("location").is(city));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));

        List<Event> events = mongoTemplate.find(query, Event.class);
        long count = mongoTemplate.count(query.skip(0).limit(0), Event.class);

       return PageableExecutionUtils.getPage(events, page, ()-> count);
    }


}
