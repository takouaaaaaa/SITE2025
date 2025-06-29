package com.iset.site.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "registrations")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    private String fullName;
    private String institution;
    private String position;
    private String email;
    private String phone;

    // Registration Details
    private String participantCategory;
    private boolean fromTunisia;
    private boolean withAccommodation;
    private boolean singleRoom;
    private boolean withArticle;
    private boolean airportTransfer;
    private boolean socialEvent;

    // Accompanying Persons
    private boolean withAccompanying;

    @ElementCollection
    private List<String> accompanyingPersons;

    // Fee Calculation
    private String currency;

    // Payment Information
    private String paymentMethod;
    private double paymentAmount;
    private String paymentProofPath;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getParticipantCategory() {
        return participantCategory;
    }

    public void setParticipantCategory(String participantCategory) {
        this.participantCategory = participantCategory;
    }

    public boolean isFromTunisia() {
        return fromTunisia;
    }

    public void setFromTunisia(boolean fromTunisia) {
        this.fromTunisia = fromTunisia;
    }

    public boolean isWithAccommodation() {
        return withAccommodation;
    }

    public void setWithAccommodation(boolean withAccommodation) {
        this.withAccommodation = withAccommodation;
    }

    public boolean isSingleRoom() {
        return singleRoom;
    }

    public void setSingleRoom(boolean singleRoom) {
        this.singleRoom = singleRoom;
    }

    public boolean isWithArticle() {
        return withArticle;
    }

    public void setWithArticle(boolean withArticle) {
        this.withArticle = withArticle;
    }

    public boolean isAirportTransfer() {
        return airportTransfer;
    }

    public void setAirportTransfer(boolean airportTransfer) {
        this.airportTransfer = airportTransfer;
    }

    public boolean isSocialEvent() {
        return socialEvent;
    }

    public void setSocialEvent(boolean socialEvent) {
        this.socialEvent = socialEvent;
    }

    public boolean isWithAccompanying() {
        return withAccompanying;
    }

    public void setWithAccompanying(boolean withAccompanying) {
        this.withAccompanying = withAccompanying;
    }

    public List<String> getAccompanyingPersons() {
        return accompanyingPersons;
    }

    public void setAccompanyingPersons(List<String> accompanyingPersons) {
        this.accompanyingPersons = accompanyingPersons;
    }


    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getPaymentProofPath() {
        return paymentProofPath;
    }

    public void setPaymentProofPath(String paymentProofPath) {
        this.paymentProofPath = paymentProofPath;
    }
}
