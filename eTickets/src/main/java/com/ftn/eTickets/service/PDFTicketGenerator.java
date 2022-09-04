package com.ftn.eTickets.service;

import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.web.dto.PaymentRequest;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.BarcodeImageHandler;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

import java.io.*;

@Component
public class PDFTicketGenerator {

    public static BufferedImage generateEAN13BarcodeImage(String barcodeText) throws Exception {
        Barcode barcode = BarcodeFactory.createCode128(barcodeText);


        return BarcodeImageHandler.getImage(barcode);
    }

    public ByteArrayInputStream InputStreamResource
            (Event event, String seat)
            throws Exception {

        ByteArrayOutputStream out = new ByteArrayOutputStream();



        Document document = new Document();
        PdfWriter.getInstance(document, out);
        document.open();

        Font font = FontFactory
                .getFont(FontFactory.COURIER,
                        14, BaseColor.BLACK);

        Paragraph paraEvent = new Paragraph("Event: " + event.getName(), font);
        paraEvent.setAlignment(Element.ALIGN_LEFT);
        document.add(paraEvent);
        document.add(Chunk.NEWLINE);
        Paragraph paraDate = new Paragraph("Date: " + event.getDate(), font);
        paraDate.setAlignment(Element.ALIGN_LEFT);
        document.add(paraDate);
        document.add(Chunk.NEWLINE);
        Paragraph paraSeat = new Paragraph("Seat number: " + seat, font);
        paraSeat.setAlignment(Element.ALIGN_LEFT);
        document.add(paraSeat);
        document.add(Chunk.NEWLINE);

        Paragraph para = new Paragraph("Barcode for scanning", font);
        para.setAlignment(Element.ALIGN_CENTER);
        document.add(para);
        document.add(Chunk.NEWLINE);

        BufferedImage bufferedImage = generateEAN13BarcodeImage("eTickets");

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        byte[] bytes = baos.toByteArray();

        Image image = Image.getInstance(bytes);
        image.scaleAbsolute(200f, 50f);
        image.setAlignment(Element.ALIGN_CENTER);

        document.add(image);

        document.close();
        ByteArrayInputStream bis = new ByteArrayInputStream
                (out.toByteArray());

        return bis;
    }



}
