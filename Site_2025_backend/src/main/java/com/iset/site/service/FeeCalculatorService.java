package com.iset.site.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeeCalculatorService {

    public static class FeeResult {
        private final double total;
        private final String currency;

        public FeeResult(double total, String currency) {
            this.total = total;
            this.currency = currency;
        }

        public double getTotal() {
            return total;
        }

        public String getCurrency() {
            return currency;
        }
    }

    public FeeResult calculate(
            String participantCategory,
            boolean fromTunisia,
            boolean withAccommodation,
            boolean singleRoom,
            boolean airportTransfer,
            boolean socialEvent,
            List<String> accompanyingPersons
    ) {
        double total = 0.0;
        String currency = fromTunisia || !withAccommodation ? "TND" : "EUR";

        // Base registration fees
        if (withAccommodation) {
            switch (participantCategory) {
                case "academic":
                    total += fromTunisia ? 700 : 450;
                    break;
                case "student":
                    total += fromTunisia ? 650 : 400;
                    break;
                case "professional":
                    total += fromTunisia ? 750 : 500;
                    break;
            }
        } else {
            total += 450; // without accommodation fee (always TND)
        }

        // Accompanying Persons (2 nights)
        if (accompanyingPersons != null) {
            long adultCount = accompanyingPersons.stream()
                    .map(p -> extractAge(p))
                    .filter(age -> age >= 18)
                    .count();

            for (String person : accompanyingPersons) {
                int age = extractAge(person);
                if (age < 2) continue; // Free

                double personFee = fromTunisia ? 120 : 80;

                if (age < 12) {
                    if (adultCount >= 2) {
                        personFee *= 0.5; // 50% discount
                    } else {
                        personFee *= 0.7; // 30% discount
                    }
                }

                total += personFee * 2; // 2 nights
            }
        }

        // Single room (2 nights)
        if (withAccommodation && singleRoom) {
            double supplement = 25;
            total += supplement * 2; // 2 nights
        }

        // Airport Transfer (EUR only)
        if (airportTransfer) {
            total += 50; // EUR only
        }

        // Social Event
        if (socialEvent) {
            total += fromTunisia ? 50 : 100;
        }

        // Currency logic
        if (!withAccommodation || fromTunisia) {
            currency = "TND";
        } else {
            currency = airportTransfer ? "EUR" : "EUR";
        }

        return new FeeResult(Math.round(total * 100.0) / 100.0, currency);
    }

    private int extractAge(String person) {
        try {
            int start = person.indexOf("(");
            int end = person.indexOf(" years old") != -1 ? person.indexOf(" years old") : person.indexOf(")");
            if (start != -1 && end != -1 && end > start) {
                return Integer.parseInt(person.substring(start + 1, end).replaceAll("\\D", ""));
            }
        } catch (Exception e) {
            return 0;
        }
        return 0;
    }
}
