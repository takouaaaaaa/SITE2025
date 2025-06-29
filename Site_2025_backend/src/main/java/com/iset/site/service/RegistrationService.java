package com.iset.site.service;

import com.iset.site.entity.Registration;
import com.iset.site.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final FeeCalculatorService feeCalculatorService;

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository, FeeCalculatorService feeCalculatorService) {
        this.registrationRepository = registrationRepository;
        this.feeCalculatorService = feeCalculatorService;
    }

    public Registration saveRegistration(Registration registration) {
        FeeCalculatorService.FeeResult feeResult = feeCalculatorService.calculate(
                registration.getParticipantCategory(),
                registration.isFromTunisia(),
                registration.isWithAccommodation(),
                registration.isSingleRoom(),
                registration.isAirportTransfer(),
                registration.isSocialEvent(),
                registration.getAccompanyingPersons()
        );

        registration.setPaymentAmount(feeResult.getTotal());
        registration.setCurrency(feeResult.getCurrency());

        return registrationRepository.save(registration);
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Registration getRegistrationById(Long id) {
        return registrationRepository.findById(id).orElse(null);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }

    public Registration updateRegistration(Long id, Registration registrationDetails) {
        Registration registration = registrationRepository.findById(id).orElse(null);
        if (registration != null) {
            registration.setFullName(registrationDetails.getFullName());
            registration.setInstitution(registrationDetails.getInstitution());
            registration.setPosition(registrationDetails.getPosition());
            registration.setEmail(registrationDetails.getEmail());
            registration.setPhone(registrationDetails.getPhone());
            registration.setParticipantCategory(registrationDetails.getParticipantCategory());
            registration.setFromTunisia(registrationDetails.isFromTunisia());
            registration.setWithAccommodation(registrationDetails.isWithAccommodation());
            registration.setSingleRoom(registrationDetails.isSingleRoom());
            registration.setWithArticle(registrationDetails.isWithArticle());
            registration.setAirportTransfer(registrationDetails.isAirportTransfer());
            registration.setSocialEvent(registrationDetails.isSocialEvent());
            registration.setWithAccompanying(registrationDetails.isWithAccompanying());
            registration.setAccompanyingPersons(registrationDetails.getAccompanyingPersons());
            registration.setPaymentMethod(registrationDetails.getPaymentMethod());

            FeeCalculatorService.FeeResult feeResult = feeCalculatorService.calculate(
                    registration.getParticipantCategory(),
                    registration.isFromTunisia(),
                    registration.isWithAccommodation(),
                    registration.isSingleRoom(),
                    registration.isAirportTransfer(),
                    registration.isSocialEvent(),
                    registration.getAccompanyingPersons()
            );

            registration.setPaymentAmount(feeResult.getTotal());
            registration.setCurrency(feeResult.getCurrency());
            registration.setPaymentProofPath(registrationDetails.getPaymentProofPath());

            return registrationRepository.save(registration);
        }
        return null;
    }
}
