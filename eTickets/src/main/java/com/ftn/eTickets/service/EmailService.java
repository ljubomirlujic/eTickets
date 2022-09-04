package com.ftn.eTickets.service;



import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.web.dto.PaymentRequest;
import com.ftn.eTickets.web.dto.SendMailTicketsReq;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.tomcat.jni.File;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.internet.InternetHeaders;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private PDFTicketGenerator pdfTicketGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;


    public void sendEmail(Authentication authentication, SendMailTicketsReq sendMailTicketsReq, String eventId) throws Exception {

        User user = userService.findOneByEmail(authentication.getName());

        Event event = eventService.getOne(eventId);

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("etickets@ftn.com");
        helper.setTo(user.getEmail());
        helper.setSubject("eTicket");
        helper.setText("Your tickets for event: " + event.getName());

        for(String seat : sendMailTicketsReq.getBookedSeats()){
            ByteArrayDataSource attachment = new ByteArrayDataSource(
                    pdfTicketGenerator.InputStreamResource(event, seat), "application/pdf");

            helper.addAttachment("eTicket.pdf", attachment);
        }

        emailSender.send(message);
    }
}
